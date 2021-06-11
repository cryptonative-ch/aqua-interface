// External
import { useDispatch } from 'react-redux'
import react, { useEffect } from 'react'
import { providers } from 'ethers'
import { FixedPriceSale__factory, FairSale__factory } from 'src/contracts'

// interfaces
import { SaleBid, SaleType } from 'src/interfaces/Sale'

// Redux
import { updateBidRequest, updateBidFailure, updateBidSuccess } from 'src/redux/bids'
import { formatDecimal } from 'src/utils/Defaults'

// TODO: REPEAT BIDS
// TODO: AGGREGATING BIDS
// TODO: REFACTOR OF CODE
// TODO: CLAIMTOKENS LOGIC
// TODO: :w
//
export function useChain(
  contractAddress: string,
  saleType: SaleType,
  provider: providers.JsonRpcProvider,
  decimal: number
) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (saleType == 'FairSale') {
      const fairSaleContract = FairSale__factory.connect(contractAddress, provider)

      fairSaleContract.on('NewOrder', async (ownerId, orderTokenOut, orderTokenIn, event) => {
        const bids: SaleBid = {
          id: ownerId + orderTokenIn + orderTokenOut,
          address: ownerId,
          tokenIn: orderTokenIn,
          tokenOut: orderTokenOut,
          baseSale: {
            id: contractAddress,
          },

          createdAt: await (await provider.getBlock(event.blockNumber)).timestamp,
          updatedAt: null,
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
        id: buyer + amount,
        buyer: buyer,
        amount: formatDecimal(amount, decimal),
        baseSale: {
          id: contractAddress,
        },
        createdAt: await (await provider.getBlock(event.blockNumber)).timestamp,
        updatedAt: null,
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
}
