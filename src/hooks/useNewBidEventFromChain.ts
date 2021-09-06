// External
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { FixedPriceSale__factory, FairSale__factory } from 'src/contracts'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// interfaces
import {
  GetAllBidsBySaleId_fixedPriceSale_commitments,
  GetAllBidsBySaleId_fairSale_bids,
} from 'src/subgraph/__generated__/GetAllBidsBySaleId'
// Redux
import { updateCommitmentRequest, updateCommitmentFailure, updateCommitmentSuccess } from 'src/redux/commitments'
import { updateBidRequest, updateBidFailure, updateBidSuccess } from 'src/redux/bids'
import { FixedPriceSaleCommitmentStatus } from 'src/subgraph/__generated__/globalTypes'

interface useEventFromChainReturnsBase {
  loading: boolean
  error: Error | null
}

interface UseBidEventFromChainReturns extends useEventFromChainReturnsBase {
  bids: GetAllBidsBySaleId_fairSale_bids[]
}

export function useNewBidEventFromChain(saleId: string): UseBidEventFromChainReturns {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const [t] = useTranslation()
  const {
    isLoading,
    error,
    bidsBySaleId: { [saleId]: { bids } = { bids: [] } },
  } = useSelector(({ bids }) => bids)

  useEffect(() => {
    if (!account || !library || !chainId) {
      return
    }
    const fairSaleContract = FairSale__factory.connect(saleId, library)

    fairSaleContract.on('NewSellOrder', async (ownerId, orderTokenOut, orderTokenIn, event) => {
      const newBid: GetAllBidsBySaleId_fairSale_bids = {
        __typename: 'FairSaleBid',
        id: String(await (await library.getBlock(event.blockNumber)).timestamp),
        owner: { __typename: 'FairSaleUser', id: ownerId, address: ownerId },
        tokenInAmount: orderTokenIn,
        tokenOutAmount: orderTokenOut,
        sale: {
          __typename: 'FairSale',
          id: saleId,
        },
      }

      dispatch(updateBidRequest(true))
      try {
        dispatch(updateBidSuccess(newBid))
      } catch (error) {
        console.error(error)
        toast.error(t('error.updatePurchase'))
        dispatch(updateBidFailure(error))
      }
    })
  }, [account, library, chainId])
  return {
    bids,
    loading: isLoading,
    error,
  }
}

export function useNewCommitmentEventFromChain(saleId: string) {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const [t] = useTranslation()

  useEffect(() => {
    if (!account || !library || !chainId) {
      return
    }
    const fixedPriceSaleContract = FixedPriceSale__factory.connect(saleId, library)
    fixedPriceSaleContract.removeAllListeners('NewCommitment')
    fixedPriceSaleContract.on('NewCommitment', async (buyer, amount, event) => {
      const commitment: GetAllBidsBySaleId_fixedPriceSale_commitments = {
        id:
          saleId + '/commitments/' + buyer + '/' + String(await (await library.getBlock(event.blockNumber)).timestamp),
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
}
