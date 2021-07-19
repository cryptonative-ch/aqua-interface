// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'

// Interfaces
import { SaleDate, FairSaleBid, FixedPriceSalePurchase, Sale } from 'src/interfaces/Sale'

// Mesa
import { calculateClearingPrice } from 'src/mesa/price'

/**
 * Determines if the sale is active
 */
export const isSaleOpen = ({ startDate, endDate }: SaleDate) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const endDateLocal = convertUtcTimestampToLocal(endDate)
  const startDateLocal = convertUtcTimestampToLocal(startDate)
  return startDateLocal <= currentTimestamp && currentTimestamp < endDateLocal
}

/**
 * Determines if the sale is upcoming
 */
export const isSaleUpcoming = ({ startDate }: SaleDate) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const startDateLocal = convertUtcTimestampToLocal(startDate)

  return currentTimestamp < startDateLocal
}

/**
 * Determines if the sale is closed
 */
export const isSaleClosed = ({ endDate }: SaleDate) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const endDateLocal = convertUtcTimestampToLocal(endDate)

  return currentTimestamp >= endDateLocal
}

/**
 *
 * @param order1
 * @param order2
 */
export const isBidActive = ({ bids }: Sale, bid: FairSaleBid) => {
  const clearingPriceOrder = calculateClearingPrice(bids)

  return bid.tokenIn < clearingPriceOrder.tokenIn
}

/**
 * Filters the list of bids by passed address
 * @param saleBids
 * @param address
 */
export const filterSaleBidsByAddress = (saleBids: FairSaleBid[] & FixedPriceSalePurchase[], address: string) =>
  saleBids.filter(saleBid => saleBid.address === address)
