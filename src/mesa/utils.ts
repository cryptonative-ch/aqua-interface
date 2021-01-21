// External
import { BigNumber } from 'ethers'

// Interfaces
import { Auction, AuctionBid } from 'src/interfaces/Auction'

/**
 * Determines if the auction is active
 */
export const isAuctionOpen = ({ startBlock, endBlock }: Auction, currentBlockNumber: number) => {
  return startBlock <= currentBlockNumber && currentBlockNumber < endBlock
}

/**
 * Determines if the auction is upcoming
 */
export const isAuctionUpcoming = ({ startBlock, endBlock }: Auction, currentBlockNumber: number) =>
  currentBlockNumber < startBlock && currentBlockNumber < endBlock

/**
 * Determines if the auction is upcoming
 */
export const isAuctionClosed = ({ startBlock, endBlock }: Auction, currentBlockNumber: number) =>
  currentBlockNumber > startBlock && currentBlockNumber >= endBlock

export enum AuctionStatus {
  CLOSED = 'closed',
  OPEN = 'open',
  UPCOMING = 'upcoming',
}

// export const getAuctionStatus = (auction: Auction): One AuctionStatus. =>

/**
 * Retrieves an auction
 */
export const getAuction = (auctionId: string) => {}

// /**
//  *
//  * @param auctionBids sort
//  */
// export const sortBidsByPriceDesc = (auctionBids: AuctionBid[]) => {
//   return auctionBids.sort((a, b) => b.tokenPrice - a.tokenPrice)
// }

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
export function calculateClearingPrice(easyAuction: Auction) {
  const sellOrders = easyAuction.bids
  const sortedSellOrders = sellOrders.sort(hasLowerClearingPrice)
  const initialOrder = sortedSellOrders[0]

  const clearingPriceOrder = findClearingPrice(sellOrders, initialOrder)
  return clearingPriceOrder
}

export function findClearingPrice(sellOrders: AuctionBid[], initialAuctionOrder: AuctionBid): AuctionBid {
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
 * Filters the list of bids by passed address
 * @param auctionBids
 * @param address
 */
export const filterAuctionBidsByAddress = (auctionBids: AuctionBid[], address: string) =>
  auctionBids.filter(auctionBid => auctionBid.address === address)
