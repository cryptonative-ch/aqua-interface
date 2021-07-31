// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'

// Interfaces
import { SaleDate, FairSaleBid, FixedPriceSalePurchase, Sale } from 'src/interfaces/Sale'

// Aqua
import { calculateClearingPrice } from 'src/aqua/price'
import { salesQuery } from 'src/hooks/useSale'
import { formatBigInt } from 'src/utils/Defaults'

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

export const isMinRaiseReached = (sale: Sale) => {
  return formatBigInt(sale.sellAmount) - formatBigInt(sale.soldAmount) == 0
}

export const isSaleDatePast = ({ endDate }: SaleDate) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const endDateLocal = convertUtcTimestampToLocal(endDate)

  return currentTimestamp >= endDateLocal
}

/**
 * Determines if the sale is closed
 */
export const isSaleClosed = (sale: Sale) => {
  console.log({ sale })
  if (sale.status === 'ENDED') {
    return true
  } else {
    return isSaleDatePast(sale)
  }
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
