// External
import { providers, Contract } from 'ethers'

// Components
import { FairBidPick, FixedPricePick, saleType } from 'src/interfaces/Sale'

export const getBidDataFromChain = (
  contractAddress: string,
  saleType: saleType,
  provider: providers.JsonRpcProvider
): FairBidPick | FixedPricePick => {
  let bids: any = {}
  const fixedSaleAbi = [
    // event that triggers whenever user places a successful order for a token
    'event NewPurchase(address indexed buyer, uint256 indexed amount)',
  ]

  const fairSaleAbi = [
    // event that triggers whenever user places a successful order for a token
    'event NewOrder(uint64 indexed ownerId, uint96 orderTokenOut, uint96 orderTokenIn)',
  ]

  if (saleType == 'fairSale') {
    const fairSaleContract = new Contract(contractAddress, fairSaleAbi, provider)

    fairSaleContract.on('NewOrder', (ownerId, orderTokenOut, orderTokenIn, event) => {
      console.log(`A new bid of ${orderTokenIn} for ${orderTokenOut} from ${ownerId} has been successful`)
      bids = {
        address: ownerId,
        tokenIn: orderTokenIn,
        tokenOut: orderTokenOut,
      }
    })
  }

  const fixedSaleContract = new Contract(contractAddress, fixedSaleAbi, provider)

  fixedSaleContract.on('NewPurchase', (buyer, amount, event) => {
    console.log(`a new purchase order  of ${amount}from ${buyer} has been successful`)
    bids = {
      buyer: buyer,
      amount: amount,
    }
  })

  return bids
}
