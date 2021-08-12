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

  const totalPurchasesUser = bids.filter(bid => bid.user.address.toLowerCase() === account?.toLowerCase()).length
  console.log('amount of purchases: ', totalPurchasesUser)
  // totalpurchaseUser does not update after first purchase
  // something wrong with state updates with bids
  // inconsistent state updates

  useEffect(() => {
    if (!account || !library || !chainId) {
      return
    }
    if (saleType != 'FixedPriceSale') {
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

        dispatch(updateBidRequest(true))
        try {
          dispatch(updateBidSuccess(bids))
        } catch (error) {
          console.error(error)
          dispatch(updateBidFailure(error))
        }
      })
    }

    const fixedPriceSaleContract = FixedPriceSale__factory.connect(saleId, library)

    fixedPriceSaleContract.on('NewCommitment', async (buyer, amount, event) => {
      console.log('reading events from chain')
      const bids: GetAllBidsBySaleId_fixedPriceSale_commitments = {
        id: saleId + '/purchases/' + buyer + '/' + totalPurchasesUser,
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
        dispatch(updateBidSuccess(bids))
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
