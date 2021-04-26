/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import axios from 'axios'

//interface
import { Auction, AuctionBid, auctionType } from '../interfaces/Auction'
;``
// utils
import { formatDecimal } from 'src/utils/Defaults'

export const ENDPOINT: string = process.env.REACT_APP_ENDPOINT as string
export const getAuctionsData = async (auctionsRequest: Promise<any>): Promise<Auction[]> => {
  const fairSale: auctionType = 'fairSale'
  const fixedPriceSale: auctionType = 'fixedPriceSale'

  const fairSales: Auction[] = (await auctionsRequest).fairSales

  const addFairSaleType =
    fairSales.length != 0
      ? fairSales.map((item: any) => ({
          ...item,
          tokenAmount: formatDecimal(item.tokenAmount, item.tokenOut.decimal),
          minimumBidAmount: formatDecimal(item.minimumBidAmount, item.tokenOut.decimal),
          type: fairSale,
        }))
      : []

  const fixedPriceSales: Auction[] = (await auctionsRequest).fixedPriceSales
  const addFixedPriceSalesType =
    fixedPriceSales.length != 0
      ? fixedPriceSales.map((item: any) => ({
          ...item,
          allocationMin: formatDecimal(item.allocationMin, item.tokenOut.decimal),
          allocationMax: formatDecimal(item.allocationMax, item.tokenOut.decimal),
          sellAmount: formatDecimal(item.sellAmount, item.tokenOut.decimal),
          tokenPrice: formatDecimal(item.tokenPrice, item.tokenOut.decimal),
          soldAmount: formatDecimal(item.soldAmount, item.tokenOut.decimal),
          type: fixedPriceSale,
        }))
      : []

  const auctionsArray = [...addFairSaleType, ...addFixedPriceSalesType]
  return auctionsArray
}

export const selectAuctiontype = (id: string, auctions: Auction[]): auctionType => {
  const auctionType: Auction = auctions.filter(item => item.id === id)[0]
  return auctionType.type
}

export const generateInitialAuctionData = async (
  auctionBidsRequest: Promise<any>,
  auctiontypes: auctionType
): Promise<AuctionBid[]> => {
  if (auctiontypes == 'fixedPriceSale') {
    const auctionBids: AuctionBid[] = (await auctionBidsRequest)[auctiontypes].purchases.map((item: any) => ({
      ...item,

      amount: formatDecimal(item.amount),
    }))

    return auctionBids
  }

  const auctionBids: AuctionBid[] = (await auctionBidsRequest)[auctiontypes].bids.map((item: any) => ({
    ...item,
    tokenOut: formatDecimal(item.tokenOutAmount),
    tokenIn: formatDecimal(item.tokenInAmount),
  }))

  return auctionBids
}

export async function subgraphCall(endpoint: string, query: string) {
  const apiCall = await axios.post(endpoint, {
    query,
  })
  return apiCall.data.data
}
