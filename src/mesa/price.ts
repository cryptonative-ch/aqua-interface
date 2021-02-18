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
    totalSellVolume = totalSellVolume.add(order.sellAmount)

    if (totalSellVolume.mul(order.buyAmount).div(order.sellAmount).gte(initialAuctionOrder.sellAmount)) {
      const coveredBuyAmount = initialAuctionOrder.sellAmount.sub(
        totalSellVolume.sub(order.sellAmount).mul(order.buyAmount).div(order.sellAmount)
      )
      const sellAmountClearingOrder = coveredBuyAmount.mul(order.sellAmount).div(order.buyAmount)
      if (sellAmountClearingOrder.gt(BigNumber.from(0))) {
        return order
      } else {
        return {
          address: initialAuctionOrder.address,
          buyAmount: initialAuctionOrder.sellAmount,
          sellAmount: totalSellVolume.sub(order.sellAmount),
        }
      }
    }
  }
  // otherwise, clearing price is initialAuctionOrder
  if (totalSellVolume.gt(initialAuctionOrder.buyAmount)) {
    return {
      address: initialAuctionOrder.address,
      buyAmount: initialAuctionOrder.sellAmount,
      sellAmount: totalSellVolume,
    }
  } else {
    return {
      address: initialAuctionOrder.address,
      buyAmount: initialAuctionOrder.sellAmount,
      sellAmount: initialAuctionOrder.buyAmount,
    }
  }
}

/**
 *
 * @param auctionBids
 */
export function hasLowerClearingPrice(order1: AuctionBid, order2: AuctionBid): number {
  if (order1.buyAmount.mul(order2.sellAmount).lt(order2.buyAmount.mul(order1.sellAmount))) return -1
  if (order1.buyAmount.mul(order2.sellAmount).eq(order2.buyAmount.mul(order1.sellAmount))) {
    if (order1.address < order2.address) return -1
  }
  return 1
}

/**
 * Calculates the clearing price using the auction bids
 * @param auctionBids
 */
export function calculateClearingPrice(easyAuctionBids: AuctionBid[]): AuctionBid {
  if (!easyAuctionBids.length) {
    return {
      address: '0x',
      buyAmount: BigNumber.from(0),
      sellAmount: BigNumber.from(0),
    }
  }

  const sortedSellOrders = easyAuctionBids.sort(hasLowerClearingPrice)
  const initialOrder = easyAuctionBids[0]

  const clearingPriceOrder = findClearingPrice(sortedSellOrders, initialOrder)
  return clearingPriceOrder
}
