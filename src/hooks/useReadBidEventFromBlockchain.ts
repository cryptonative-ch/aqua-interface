// External
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { FixedPriceSale__factory, FairSale__factory } from 'src/contracts'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// interfaces
import { GetAllBidsBySaleId_fixedPriceSale_commitments } from 'src/subgraph/__generated__/GetAllBidsBySaleId'
// Redux
import { updateCommitmentRequest, updateCommitmentFailure, updateCommitmentSuccess } from 'src/redux/commitments'
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
  } = useSelector(({ commitments }) => commitments)

  useEffect(() => {
    if (!account || !library || !chainId) {
      return
    }
    if (saleType == 'FairSale') {
      const fairSaleContract = FairSale__factory.connect(saleId, library)

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

        dispatch(updateCommitmentRequest(true))
        try {
          dispatch(updateCommitmentSuccess(bids))
        } catch (error) {
          console.error(error)
          dispatch(updateCommitmentFailure(error))
        }
      })
    }

    const fixedPriceSaleContract = FixedPriceSale__factory.connect(saleId, library)

    fixedPriceSaleContract.on('NewCommitment', async (buyer, amount) => {
      const totalCommitmentsByUserAddress =
        bids.filter(bid => bid.user.address.toLowerCase() === buyer.toLowerCase()).length + 1

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
      dispatch(updateCommitmentRequest(true))
      try {
        dispatch(updateCommitmentSuccess(commitment))
      } catch (error) {
        console.error(error)
        toast.error(t('error.updatePurchase'))
        dispatch(updateCommitmentFailure(error))
      }
    })
  }, [account, library, chainId])
  return {
    bids,
    loading: isLoading,
    error,
  }
}
