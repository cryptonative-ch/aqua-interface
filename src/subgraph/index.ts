// Externals

import axios from 'axios'
import { BigNumber } from 'ethers'

//interface
import { Auction, AuctionBid, auctionType } from '../interfaces/Auction'

// utils
import { formatDecimal } from 'src/utils/Defaults'

export const ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/graphql'
    : 'https://api.thegraph.com/subgraphs/name/adamazad/mesa'

// eslint-disable-next-line
export const getAuctionsData = async (auctionsRequest: Promise<any>): Promise<Auction[]> => {
  const fairSale: auctionType = 'fairSale'
  const fixedPriceSale: auctionType = 'fixedPriceSale'
  const fairSales: Auction[] = (await auctionsRequest).fairSales

  const addFairSaleType = fairSales.map((item: any) => ({
    ...item,
    tokenAmount: formatDecimal(item.tokenAmount),
    minimumBidAmount: formatDecimal(item.minimumBidAmount),
    type: fairSale,
  }))

  const fixedPriceSales: Auction[] = (await auctionsRequest).fixedPriceSales
  const addFixedPriceSalesType = fixedPriceSales.map((item: any) => ({
    ...item,
    allocationMin: formatDecimal(item.allocationMin),
    allocationMax: formatDecimal(item.allocationMax),
    sellAmount: formatDecimal(item.sellAmount),
    tokenPrice: formatDecimal(item.tokenPrice),
    type: fixedPriceSale,
  }))

  const auctionsArray = [...addFairSaleType, ...addFixedPriceSalesType]
  return auctionsArray
}

export const selectAuctiontype = (id: string, auctions: Auction[]): auctionType => {
  const auctionType: Auction = auctions.filter(item => item.id === id)[0]
  return auctionType.type
}

export const generateInitialAuctionData = async (
  // eslint-disable-next-line
  auctionBidsRequest: Promise<any>,
  auctiontypes: auctionType
): Promise<AuctionBid[]> => {
  if (auctiontypes == 'fixedPriceSale') {
    const auctionBids: AuctionBid[] = (await auctionBidsRequest)[auctiontypes].purchases.map((item: any) => ({
      ...item,

      amount: formatDecimal(item.amount),
    }))
    console.log(auctionBids)

    return auctionBids
  }

  const auctionBids: AuctionBid[] = (await auctionBidsRequest)[auctiontypes].bids.map((item: any) => ({
    ...item,
    tokenOut: formatDecimal(item.tokenOutAmount),
    tokenIn: formatDecimal(item.tokenInAmount),
  }))
  console.log(auctionBids)

  return auctionBids
}

export async function subgraphCall(endpoint: string, query: string) {
  const apiCall = await axios.post(endpoint, {
    query,
  })
  return apiCall.data.data
}
