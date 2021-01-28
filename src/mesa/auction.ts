// Utils
import { convetUtcTimestampToLocal } from 'src/utils/date'

// Interfaces
import { Auction, AuctionBid } from 'src/interfaces/Auction'

// Mesa
import { calculateClearingPrice } from './price'

/**
 * Determines if the auction is active
 */
export const isAuctionOpen = ({ startBlock, endBlock }: Auction) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const endBlockLocal = convetUtcTimestampToLocal(endBlock)
  const startBlockLocal = convetUtcTimestampToLocal(startBlock)

  return startBlockLocal <= currentTimestamp && currentTimestamp < endBlockLocal
}

/**
 * Determines if the auction is upcoming
 */
export const isAuctionUpcoming = ({ startBlock }: Auction) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const startBlockLocal = convetUtcTimestampToLocal(startBlock)

  return currentTimestamp < startBlockLocal
}

/**
 * Determines if the auction is upcoming
 */
export const isAuctionClosed = ({ endBlock }: Auction) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const endBlockLocal = convetUtcTimestampToLocal(endBlock)

  return currentTimestamp >= endBlockLocal
}

/**
 *
 * @param order1
 * @param order2
 */
export const isBidActive = ({ bids }: Auction, bid: AuctionBid) => {
  const clearingPriceOrder = calculateClearingPrice(bids)

  return bid.sellAmount < clearingPriceOrder.sellAmount
}

/**
 * Filters the list of bids by passed address
 * @param auctionBids
 * @param address
 */
export const filterAuctionBidsByAddress = (auctionBids: AuctionBid[], address: string) =>
  auctionBids.filter(auctionBid => auctionBid.address === address)
