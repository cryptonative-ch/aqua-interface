// External
import { useCallback, useState, useMemo, useRef } from 'react'
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

// comp re-renders
//

export function useReadBidEventFromBlockchain(saleId: string, saleType: string): UseReadBidEventFromBlockchainReturns {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const [t] = useTranslation()
  const {
    isLoading,
    error,
    bidsBySaleId: { [saleId]: { bids } = { bids: [] } },
  } = useSelector(({ bids }) => bids)
  const [totalCommitmentsByUserAddress, setTotalCommimentsByUserAddress] = useState<number>(bids.length)

  const fixedPriceSaleContract = useMemo(() => FixedPriceSale__factory.connect(saleId, library), [])

  const fairSaleContract = FairSale__factory.connect(saleId, library)
  const MFA = useCallback(() => {
    return fixedPriceSaleContract.on('NewCommitment', async (buyer, amount) => {
      console.log('re-rendering')
      // @TODO: fix Later
      setTotalCommimentsByUserAddress(bids => bids + 1)

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
      console.log(commitment)
      dispatch(updateBidRequest(true))
      try {
        dispatch(updateBidSuccess(commitment))
      } catch (error) {
        console.error(error)
        toast.error(t('error.updatePurchase'))
        dispatch(updateBidFailure(error))
      }
    })
  }, [])

  useEffect(() => {
    if (!account || !library || !chainId) {
      return
    }
    if (saleType != 'FixedPriceSale') {
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
    }

    MFA()
    console.log('re-rendering useEffect')

    return () => {
      fixedPriceSaleContract.removeAllListeners()
      fairSaleContract.removeAllListeners()
    }
  }, [account, library, chainId])

  return {
    bids,
    loading: isLoading,
    error,
  }
}
