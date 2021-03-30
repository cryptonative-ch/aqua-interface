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
    totalSellVolume = totalSellVolume.add(order.tokenInAmount)

    if (totalSellVolume.mul(order.tokenOutAmount).div(order.tokenInAmount).gte(initialAuctionOrder.tokenInAmount)) {
      const coveredtokenOutAmount = initialAuctionOrder.tokenInAmount.sub(
        totalSellVolume.sub(order.tokenInAmount).mul(order.tokenOutAmount).div(order.tokenInAmount)
      )
      const tokenInAmountClearingOrder = coveredtokenOutAmount.mul(order.tokenInAmount).div(order.tokenOutAmount)
      if (tokenInAmountClearingOrder.gt(BigNumber.from(0))) {
        return order
      } else {
        return {
          address: initialAuctionOrder.address,
          tokenOutAmount: initialAuctionOrder.tokenInAmount,
          tokenInAmount: totalSellVolume.sub(order.tokenInAmount),
        }
      }
    }
  }
  // otherwise, clearing price is initialAuctionOrder
  if (totalSellVolume.gt(initialAuctionOrder.tokenOutAmount)) {
    return {
      address: initialAuctionOrder.address,
      tokenOutAmount: initialAuctionOrder.tokenInAmount,
      tokenInAmount: totalSellVolume,
    }
  } else {
    return {
      address: initialAuctionOrder.address,
      tokenOutAmount: initialAuctionOrder.tokenInAmount,
      tokenInAmount: initialAuctionOrder.tokenOutAmount,
    }
  }
}

/**
 *
 * @param auctionBids
 */
export function hasLowerClearingPrice(order1: AuctionBid, order2: AuctionBid): number {
  if (order1.tokenOutAmount.mul(order2.tokenInAmount).lt(order2.tokenOutAmount.mul(order1.tokenInAmount))) return -1
  if (order1.tokenOutAmount.mul(order2.tokenInAmount).eq(order2.tokenOutAmount.mul(order1.tokenInAmount))) {
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
      tokenOutAmount: BigNumber.from(0),
      tokenInAmount: BigNumber.from(0),
    }
  }

  const sortedSellOrders = easyAuctionBids.sort(hasLowerClearingPrice)
  const initialOrder = easyAuctionBids[0]

  const clearingPriceOrder = findClearingPrice(sortedSellOrders, initialOrder)
  return clearingPriceOrder
}
