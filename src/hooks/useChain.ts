// External
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { FixedPriceSale__factory, FairSale__factory } from 'src/contracts'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// interfaces
import { SaleBid, SaleType } from 'src/interfaces/Sale'

// Redux
import { updateBidRequest, updateBidFailure, updateBidSuccess } from 'src/redux/bids'

interface UseChainReturns {
  loading: boolean
  bids: any[]
  error: Error | null
}

export function useChain(contractAddress: string, saleType: SaleType): UseChainReturns {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const [t] = useTranslation()
  const {
    isLoading,
    error,
    bidsBySaleId: { [contractAddress]: { bids } = { bids: [] } },
  } = useSelector(({ bids }) => bids)

  useEffect(() => {
    if (!account || !library || !chainId) {
      return
    }
    if (saleType == 'FairSale') {
      const fairSaleContract = FairSale__factory.connect(contractAddress, library)

      fairSaleContract.on('NewOrder', async (ownerId, orderTokenOut, orderTokenIn, event) => {
        const bids: SaleBid = {
          id: String(await (await library.getBlock(event.blockNumber)).timestamp),
          address: ownerId,
          tokenIn: orderTokenIn,
          tokenOut: orderTokenOut,
          baseSale: {
            id: contractAddress,
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

    const fixedPriceSaleContract = FixedPriceSale__factory.connect(contractAddress, library)

    fixedPriceSaleContract.on('NewCommitment', async (buyer, amount, event) => {
      const bids: any = {
        id: String(await (await library.getBlock(event.blockNumber)).timestamp),
        user: {
          address: buyer,
        },
        amount: amount.toString(),
        baseSale: {
          id: contractAddress,
        },
        createdAt: await (await library.getBlock(event.blockNumber)).timestamp,
        updatedAt: await (await library.getBlock(event.blockNumber)).timestamp,
        deletedAt: null,
        status: 'SUBMITTED',
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
