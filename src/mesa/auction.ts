// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'

// Interfaces
import { Auction, AuctionBid } from 'src/interfaces/Auction'

// Mesa
import { calculateClearingPrice } from './price'

/**
 * Determines if the auction is active
 */
export const isAuctionOpen = ({ startDate, endDate }: Auction) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const endDateLocal = convertUtcTimestampToLocal(endDate)
  const startDateLocal = convertUtcTimestampToLocal(startDate)
  return startDateLocal <= currentTimestamp && currentTimestamp < endDateLocal
}

/**
 * Determines if the auction is upcoming
 */
export const isAuctionUpcoming = ({ startDate }: Auction) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const startDateLocal = convertUtcTimestampToLocal(startDate)

  return currentTimestamp < startDateLocal
}

/**
 * Determines if the auction is closed
 */
export const isAuctionClosed = ({ endDate }: Auction) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const endDateLocal = convertUtcTimestampToLocal(endDate)

  return currentTimestamp >= endDateLocal
}

/**
 *
 * @param order1
 * @param order2
 */
export const isBidActive = ({ bids }: Auction, bid: AuctionBid) => {
  const clearingPriceOrder = calculateClearingPrice(bids)

  return bid.tokenInAmount < clearingPriceOrder.tokenInAmount
}

/**
 * Filters the list of bids by passed address
 * @param auctionBids
 * @param address
 */
export const filterAuctionBidsByAddress = (auctionBids: AuctionBid[], address: string) =>
  auctionBids.filter(auctionBid => auctionBid.address === address)
