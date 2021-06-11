// External
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { providers } from 'ethers'
import { FixedPriceSale__factory, FairSale__factory } from 'src/contracts'

// interfaces
import { FairSaleBid, FixedPriceSalePurchase, SaleBid, SaleType } from 'src/interfaces/Sale'

// Redux
import { fetchBidsFromChain } from 'src/redux/bids'
import { store } from 'src/redux/store'
import { formatDecimal } from 'src/utils/Defaults'

interface UseChainReturns {
  bids: SaleBid
  error: Error | undefined
}
// TODO: REPEAT BIDS
// TODO: CACHING
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
): UseChainReturns {
  const [error, setError] = useState<Error>()
  const [bids, setBids] = useState<SaleBid>()

  useEffect(() => {
    return () => {
      console.log(bids)
    }
  }, [])

  if (saleType == 'FairSale') {
    const fairSaleContract = FairSale__factory.connect(contractAddress, provider)

    fairSaleContract.on('NewOrder', async (ownerId, orderTokenOut, orderTokenIn, event) => {
      const bids: FairSaleBid = {
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

      store.dispatch(fetchBidsFromChain(bids))
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
    store.dispatch(fetchBidsFromChain(bids))
  })

  return {
    bids,
    error,
  }
}
