// External
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { providers } from 'ethers'
import { FixedPriceSale__factory, FairSale__factory } from 'src/contracts'

// interfaces
import { SaleBid, SaleType } from 'src/interfaces/Sale'

// Redux
import { updateBidRequest, updateBidFailure, updateBidSuccess } from 'src/redux/bids'

interface UseChainReturns {
  loading: boolean
  bids: SaleBid[]
  error: Error | null
}

export function useChain(
  contractAddress: string,
  saleType: SaleType,
  provider: providers.JsonRpcProvider
): UseChainReturns {
  const dispatch = useDispatch()
  const {
    isLoading,
    error,
    bidsBySaleId: { [contractAddress]: { bids } = { bids: [] } },
  } = useSelector(({ bids }) => bids)

  useEffect(() => {
    if (saleType == 'FairSale') {
      const fairSaleContract = FairSale__factory.connect(contractAddress, provider)

      fairSaleContract.on('NewOrder', async (ownerId, orderTokenOut, orderTokenIn, event) => {
        const bids: SaleBid = {
          id: String(await (await provider.getBlock(event.blockNumber)).timestamp),
          address: ownerId,
          tokenIn: orderTokenIn,
          tokenOut: orderTokenOut,
          baseSale: {
            id: contractAddress,
          },

          createdAt: await (await provider.getBlock(event.blockNumber)).timestamp,
          updatedAt: await (await provider.getBlock(event.blockNumber)).timestamp,
          deletedAt: null,
        }

        dispatch(updateBidRequest(true))
        try {
          dispatch(updateBidSuccess(bids))
        } catch (error) {
          console.log(error)
          dispatch(updateBidFailure(error))
        }
      })
    }

    const fixedPriceSaleContract = FixedPriceSale__factory.connect(contractAddress, provider)

    fixedPriceSaleContract.on('NewPurchase', async (buyer, amount, event) => {
      const bids: SaleBid = {
        id: String(await (await provider.getBlock(event.blockNumber)).timestamp),
        buyer: buyer,
        amount: amount,
        baseSale: {
          id: contractAddress,
        },
        createdAt: await (await provider.getBlock(event.blockNumber)).timestamp,
        updatedAt: await (await provider.getBlock(event.blockNumber)).timestamp,
        deletedAt: null,
      }
      dispatch(updateBidRequest(true))
      try {
        dispatch(updateBidSuccess(bids))
      } catch (error) {
        console.log(error)
        dispatch(updateBidFailure(error))
      }
    })
  }, [dispatch])
  return {
    bids,
    loading: isLoading,
    error,
  }
}
