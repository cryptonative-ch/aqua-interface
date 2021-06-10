// External
import { providers } from 'ethers'
import { FixedPriceSale__factory, FairSale__factory } from 'src/contracts'

// interfaces
import { FairSaleBid, SaleBid, SaleType } from 'src/interfaces/Sale'

// Redux
import { fetchBidsFromChain } from 'src/redux/bids'
import { store } from 'src/redux/store'
import { formatDecimal } from 'src/utils/Defaults'

export async function getBidDataFromChain(
  contractAddress: string,
  saleType: SaleType,
  provider: providers.JsonRpcProvider,
  decimal: number
) {
  if (saleType == 'FairSale') {
    const fairSaleContract = FairSale__factory.connect(contractAddress, provider)

    fairSaleContract.on('NewOrder', async (ownerId, orderTokenOut, orderTokenIn, event) => {
      const bids: FairSaleBid = {
        id: ownerId + Math.random().toString(16).slice(2),
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
      id: buyer + Math.random().toString(16).slice(2),
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
}
