// External
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { useEffect } from 'react'
import { FixedPriceSale__factory, FairSale__factory } from 'src/contracts'

// interfaces
import { SaleBid, SaleType } from 'src/interfaces/Sale'

// Redux
import { updateBidRequest, updateBidFailure, updateBidSuccess } from 'src/redux/bids'

interface UseChainReturns {
  loading: boolean
  bids: SaleBid[]
  error: Error | null
  counter: number
}

export function useChain(contractAddress: string, saleType: SaleType): UseChainReturns {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const [counter, setCounter] = useState(0)
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
        setCounter(prevCount => prevCount + 1)
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
          console.log(error)
          dispatch(updateBidFailure(error))
        }
      })
    }

    const fixedPriceSaleContract = FixedPriceSale__factory.connect(contractAddress, library)

    fixedPriceSaleContract.on('NewPurchase', async (buyer, amount, event) => {
      const bids: SaleBid = {
        id: String(await (await library.getBlock(event.blockNumber)).timestamp),
        buyer: buyer,
        amount: amount,
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
        console.log(error)
        dispatch(updateBidFailure(error))
      }
    })
  }, [dispatch, account, library, chainId])
  return {
    bids,
    loading: isLoading,
    error,
    counter,
  }
}
