// External

import { providers, Contract } from 'ethers'

// interfaces
import { SalePickBid, saleType } from 'src/interfaces/Sale'

// Redux
import { fetchBidsFromChain } from 'src/redux/BidData'

export const getBidDataFromChain = async (
  contractAddress: string,
  saleType: saleType,
  provider: providers.JsonRpcProvider
) => {
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

    fairSaleContract.on('NewOrder', (ownerId, orderTokenOut, orderTokenIn, event) => {
      console.log(`A new bid of ${orderTokenIn} for ${orderTokenOut} from ${ownerId} has been successful`)
      const bids: SalePickBid = {
        address: ownerId,
        tokenIn: orderTokenIn,
        tokenOut: orderTokenOut,
        BaseSale: {
          id: contractAddress,
        },
      }

      fetchBidsFromChain(bids)
    })
  }

  const fixedSaleContract = new Contract(contractAddress, fixedSaleAbi, provider)

  fixedSaleContract.on('NewPurchase', (buyer, amount, event) => {
    console.log(`a new purchase order  of ${amount}from ${buyer} has been successful`)
    const bids: SalePickBid = {
      buyer: buyer,
      amount: amount,
      BaseSale: {
        id: contractAddress,
      },
    }
    fetchBidsFromChain(bids)
  })
}
