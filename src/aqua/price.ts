// Externals
import { BigNumber } from 'ethers'

// Interfaces
import { FairSaleBid, FairBidPick } from 'src/interfaces/Sale'

/**
 * source: https://github.com/gnosis/ido-contracts/blob/main/src/priceCalculation.ts
 */

function findClearingPrice(sellOrders: FairSaleBid[], initialSaleOrder: FairSaleBid): FairBidPick {
  let totalSellVolume = BigNumber.from(0)

  for (const order of sellOrders) {
    // Increase total volume
    totalSellVolume = totalSellVolume.add(order.tokenIn)

    if (totalSellVolume.mul(order.tokenOut).div(order.tokenIn).gte(initialSaleOrder.tokenIn)) {
      const coveredtokenOut = initialSaleOrder.tokenIn.sub(
        totalSellVolume.sub(order.tokenIn).mul(order.tokenOut).div(order.tokenIn)
      )
      const tokenInClearingOrder = coveredtokenOut.mul(order.tokenIn).div(order.tokenOut)
      if (tokenInClearingOrder.gt(BigNumber.from(0))) {
        return order
      } else {
        return {
          address: initialSaleOrder.address,
          tokenOut: initialSaleOrder.tokenIn,
          tokenIn: totalSellVolume.sub(order.tokenIn),
        }
      }
    }
  }
  // otherwise, clearing price is initialSaleOrder
  if (totalSellVolume.gt(initialSaleOrder.tokenOut)) {
    return {
      address: initialSaleOrder.address,
      tokenOut: initialSaleOrder.tokenIn,
      tokenIn: totalSellVolume,
    }
  } else {
    return {
      address: initialSaleOrder.address,
      tokenOut: initialSaleOrder.tokenIn,
      tokenIn: initialSaleOrder.tokenOut,
    }
  }
}

/**
 *
 * @param FairSaleBids
 */
export function hasLowerClearingPrice(order1: FairSaleBid, order2: FairSaleBid): number {
  if (order1.tokenOut.mul(order2.tokenIn).lt(order2.tokenOut.mul(order1.tokenIn))) return -1
  if (order1.tokenOut.mul(order2.tokenIn).eq(order2.tokenOut.mul(order1.tokenIn))) {
    if (order1.address < order2.address) return -1
  }
  return 1
}

/**
 * Calculates the clearing price using the sale bids
 * @param FairSaleBids
 */
export function calculateClearingPrice(fairSaleBids: FairSaleBid[]): FairBidPick {
  if (!fairSaleBids.length) {
    return {
      address: '0x',
      tokenOut: BigNumber.from(0),
      tokenIn: BigNumber.from(0),
    }
  }

  const sortedSellOrders = fairSaleBids.sort(hasLowerClearingPrice)
  const initialOrder = fairSaleBids[0]

  const clearingPriceOrder = findClearingPrice(sortedSellOrders, initialOrder)
  return clearingPriceOrder
}
