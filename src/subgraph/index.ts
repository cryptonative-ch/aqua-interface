/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import axios from 'axios'

//interface
import { Auction, AuctionBid, auctionType } from '../interfaces/Auction'

// utils
import { formatDecimal } from 'src/utils/Defaults'

export const ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/subgraphs/name/adamazad/mesa'
    : 'https://api.thegraph.com/subgraphs/name/adamazad/mesa'

export const getAuctionsData = async (auctionsRequest: Promise<any>): Promise<Auction[]> => {
  const fairSale: auctionType = 'fairSale'
  const fixedPriceSale: auctionType = 'fixedPriceSale'
  console.log(await auctionsRequest)
  const fairSales: Auction[] = (await auctionsRequest).fairSales
  const addFairSaleType =
    fairSales.length != 0
      ? fairSales.map((item: any) => ({
          ...item,
          tokenAmount: formatDecimal(item.tokenAmount),
          minimumBidAmount: formatDecimal(item.minimumBidAmount),
          type: fairSale,
        }))
      : []

  const fixedPriceSales: Auction[] = (await auctionsRequest).fixedPriceSales
  const addFixedPriceSalesType =
    fixedPriceSales.length != 0
      ? fixedPriceSales.map((item: any) => ({
          ...item,
          allocationMin: formatDecimal(item.allocationMin),
          allocationMax: formatDecimal(item.allocationMax),
          sellAmount: formatDecimal(item.sellAmount),
          tokenPrice: formatDecimal(item.tokenPrice),
          tokensSold: formatDecimal(item.tokensSold),
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
