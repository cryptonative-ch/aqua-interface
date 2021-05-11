// External
import { providers, Contract } from 'ethers'

// interfaces
import { SaleBid, saleType } from 'src/interfaces/Sale'

// Redux
import { fetchBidsFromChain } from 'src/redux/BidData'
import { store } from 'src/redux/store'
import { formatDecimal } from 'src/utils/Defaults'

export async function getBidDataFromChain(
  contractAddress: string,
  saleType: saleType,
  provider: providers.JsonRpcProvider,
  decimal: number
) {
  const fixedSaleAbi = [
    // event that triggers whenever user places a successful order for a token
    'event NewPurchase(address indexed buyer, uint256 indexed amount)',
    // event for sale initialization
    'event InitializedSale(IERC20 indexed _tokenIn,IERC20 indexed _tokenOut,uint256 orderCancellationEndDate,uint256 endDate,uint96 _totalTokenOutAmount,uint96 _minBidAmountToReceive,uint256 minimumBiddingAmountPerOrder,uint256 minSellThreshold);',
  ]

  const fairSaleAbi = [
    // event that triggers whenever user places a successful order for a token
    'event NewOrder(uint64 indexed ownerId, uint96 orderTokenOut, uint96 orderTokenIn)',
    // event for sale initialization
    'event SaleInitialized(IERC20 tokenIn,IERC20 tokenOut,uint256 tokenPrice,uint256 tokensForSale,uint256 startDate,uint256 endDate,uint256 allocationMin,uint256 allocationMax,uint256 minimumRaise);',
  ]

  if (saleType == 'fairSale') {
    const fairSaleContract = new Contract(contractAddress, fairSaleAbi, provider)

    fairSaleContract.on('NewOrder', async (ownerId, orderTokenOut, orderTokenIn, event) => {
      const bids: SaleBid = {
        address: ownerId,
        tokenIn: orderTokenIn,
        tokenOut: orderTokenOut,
        BaseSale: {
          id: contractAddress,
        },

        createdAt: await (await provider.getBlock(event.blockNumber)).timestamp,
        updatedAt: null,
        deletedAt: null,
      }
      // repeat bids from the initial subgraph
      // no overlapping

      store.dispatch(fetchBidsFromChain(bids))
    })
  }

  const fixedSaleContract = new Contract(contractAddress, fixedSaleAbi, provider)

  fixedSaleContract.on('NewPurchase', async (buyer, amount, event) => {
    const bids: SaleBid = {
      buyer: buyer,
      amount: formatDecimal(amount, decimal),
      BaseSale: {
        id: contractAddress,
      },
      createdAt: await (await provider.getBlock(event.blockNumber)).timestamp,
      updatedAt: null,
      deletedAt: null,
    }
    store.dispatch(fetchBidsFromChain(bids))
  })
}
