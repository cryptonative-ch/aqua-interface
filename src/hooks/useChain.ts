// External
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { FixedPriceSale__factory, FairSale__factory } from 'src/contracts'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// interfaces
import { SaleType } from 'src/interfaces/Sale'
import {
  GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments,
  GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale,
  GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_user,
} from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

// Redux
import { updateBidRequest, updateBidFailure, updateBidSuccess } from 'src/redux/bids'
import { FixedPriceSaleCommitmentStatus } from 'src/subgraph/__generated__/globalTypes'

interface UseChainReturns {
  loading: boolean
  bids: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments[]
  error: Error | null
}

type NewCommitment = Omit<GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments, 'user'> & {
  user: Pick<GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_user, 'address'>
}

export function useChain(sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale): UseChainReturns {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const [t] = useTranslation()
  const {
    isLoading,
    error,
    bidsBySaleId: { [sale.id]: { bids } = { bids: [] } },
  } = useSelector(({ bids }) => bids)

  const totalPurchasesUser = bids.filter(bid => bid.user.address.toLowerCase() === account?.toLowerCase()).length

  useEffect(() => {
    if (!account || !library || !chainId) {
      return
    }
    if (sale.__typename != 'FixedPriceSale') {
      const fairSaleContract = FairSale__factory.connect(sale.id, library)

      fairSaleContract.on('NewOrder', async (ownerId, orderTokenOut, orderTokenIn, event) => {
        const bids: any = {
          id: String(await (await library.getBlock(event.blockNumber)).timestamp),
          address: ownerId,
          tokenIn: orderTokenIn,
          tokenOut: orderTokenOut,
          baseSale: {
            id: sale.id,
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

    const fixedPriceSaleContract = FixedPriceSale__factory.connect(sale.id, library)

    fixedPriceSaleContract.on('NewCommitment', async (buyer, amount, event) => {
      const bids: NewCommitment = {
        __typename: 'FixedPriceSaleCommitment',
        id: sale.id + '/purchases/' + buyer + '/' + totalPurchasesUser,
        user: {
          address: buyer,
        },
        amount: amount.toString(),
        sale: sale,
        createdAt: await (await library.getBlock(event.blockNumber)).timestamp,
        updatedAt: await (await library.getBlock(event.blockNumber)).timestamp,
        deletedAt: null,
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
