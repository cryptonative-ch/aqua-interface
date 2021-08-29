// External
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { FixedPriceSale__factory, FairSale__factory } from 'src/contracts'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// interfaces
import { GetAllBidsBySaleId_fixedPriceSale_commitments } from 'src/subgraph/__generated__/GetAllBidsBySaleId'
// Redux
import { updateBidRequest, updateBidFailure, updateBidSuccess } from 'src/redux/bids'
import { FixedPriceSaleCommitmentStatus } from 'src/subgraph/__generated__/globalTypes'

interface UseReadBidEventFromBlockchainReturns {
  loading: boolean
  bids: GetAllBidsBySaleId_fixedPriceSale_commitments[]
  error: Error | null
}

export function useReadBidEventFromBlockchain(saleId: string, saleType: string): UseReadBidEventFromBlockchainReturns {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const [t] = useTranslation()
  const {
    isLoading,
    error,
    bidsBySaleId: { [saleId]: { bids } = { bids: [] } },
  } = useSelector(({ bids }) => bids)

  const fixedPriceSaleContract = useMemo(() => {
    return FixedPriceSale__factory.connect(saleId, library)
  }, [FixedPriceSale__factory])

  const fairSaleContract = useMemo(() => {
    return FairSale__factory.connect(saleId, library)
  }, [FairSale__factory])

  const monitorFixedPriceCommitments = useCallback(() => {
    fixedPriceSaleContract.on('NewCommitment', async (buyer, amount) => {
      const totalCommitmentsByUserAddress =
        [...bids].filter(bid => bid.user.address.toLowerCase() === buyer.toLowerCase()).length + 1
      console.log('bids inside function: ', bids.length)
      console.log(totalCommitmentsByUserAddress)

      const commitment: GetAllBidsBySaleId_fixedPriceSale_commitments = {
        id: saleId + '/commitments/' + buyer + '/' + totalCommitmentsByUserAddress,
        __typename: 'FixedPriceSaleCommitment',
        user: {
          address: buyer,
          __typename: 'FixedPriceSaleUser',
        },
        amount: amount.toString(),
        sale: {
          id: saleId,
          tokenPrice: saleId,
          __typename: 'FixedPriceSale',
        },
        status: FixedPriceSaleCommitmentStatus.SUBMITTED,
      }
      dispatch(updateBidRequest(true))
      try {
        dispatch(updateBidSuccess(commitment))
      } catch (error) {
        console.error(error)
        toast.error(t('error.updatePurchase'))
        dispatch(updateBidFailure(error))
      }
    })
  }, [fixedPriceSaleContract])

  const monitorFairSaleBids = useCallback(() => {
    fairSaleContract.on('NewOrder', async (ownerId, orderTokenOut, orderTokenIn, event) => {
      const bids: any = {
        id: String(await (await library.getBlock(event.blockNumber)).timestamp),
        address: ownerId,
        tokenIn: orderTokenIn,
        tokenOut: orderTokenOut,
        baseSale: {
          id: saleId,
        },

        createdAt: await (await library.getBlock(event.blockNumber)).timestamp,
        updatedAt: await (await library.getBlock(event.blockNumber)).timestamp,
        deletedAt: null,
      }

      dispatch(updateBidRequest(true))
      try {
        dispatch(updateBidSuccess(bids))
      } catch (error) {
        console.error(error)
        dispatch(updateBidFailure(error))
      }
    })
  }, [fairSaleContract])

  useEffect(() => {
    if (!account || !library || !chainId) {
      return
    }
    if (saleType != 'FixedPriceSale') {
      monitorFairSaleBids()
    }
    monitorFixedPriceCommitments()
  }, [account, library, chainId])

  return {
    bids,
    loading: isLoading,
    error,
  }
}
