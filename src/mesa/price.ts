// Externals
import { BigNumber } from 'ethers'

// Interfaces
import { AuctionBid } from 'src/interfaces/Auction'

/**
 * source: https://github.com/gnosis/ido-contracts/blob/main/src/priceCalculation.ts
 */

function findClearingPrice(sellOrders: AuctionBid[], initialAuctionOrder: AuctionBid): AuctionBid {
  let totalSellVolume = BigNumber.from(0)

  for (const order of sellOrders) {
    // Increase total volume
    totalSellVolume = totalSellVolume.add(order.tokenIn)

    if (totalSellVolume.mul(order.tokenOut).div(order.tokenIn).gte(initialAuctionOrder.tokenIn)) {
      const coveredtokenOut = initialAuctionOrder.tokenIn.sub(
        totalSellVolume.sub(order.tokenIn).mul(order.tokenOut).div(order.tokenIn)
      )
      const tokenInClearingOrder = coveredtokenOut.mul(order.tokenIn).div(order.tokenOut)
      if (tokenInClearingOrder.gt(BigNumber.from(0))) {
        return order
      } else {
        return {
          address: initialAuctionOrder.address,
          tokenOut: initialAuctionOrder.tokenIn,
          tokenIn: totalSellVolume.sub(order.tokenIn),
        }
      }
    }
  }
  // otherwise, clearing price is initialAuctionOrder
  if (totalSellVolume.gt(initialAuctionOrder.tokenOut)) {
    return {
      address: initialAuctionOrder.address,
      tokenOut: initialAuctionOrder.tokenIn,
      tokenIn: totalSellVolume,
    }
  } else {
    return {
      address: initialAuctionOrder.address,
      tokenOut: initialAuctionOrder.tokenIn,
      tokenIn: initialAuctionOrder.tokenOut,
    }
  }
}

/**
 *
 * @param auctionBids
 */
export function hasLowerClearingPrice(order1: AuctionBid, order2: AuctionBid): number {
  if (order1.tokenOut.mul(order2.tokenIn).lt(order2.tokenOut.mul(order1.tokenIn))) return -1
  if (order1.tokenOut.mul(order2.tokenIn).eq(order2.tokenOut.mul(order1.tokenIn))) {
    if (order1.address < order2.address) return -1
  }
  return 1
}

/**
 * Calculates the clearing price using the auction bids
 * @param auctionBids
 */
export function calculateClearingPrice(fairSaleBids: AuctionBid[]): AuctionBid {
  // if (!fairSaleBids.length) {
  //   return {
  //     address: '0x',
  //     tokenOut: BigNumber.from(0),
  //     tokenIn: BigNumber.from(0),
  //   }
  // }

  const sortedSellOrders = fairSaleBids.sort(hasLowerClearingPrice)
  const initialOrder = fairSaleBids[0]

  const clearingPriceOrder = findClearingPrice(sortedSellOrders, initialOrder)
  return clearingPriceOrder
}
