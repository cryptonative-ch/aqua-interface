// Externals

import axios from 'axios'
import { utils } from 'ethers'

//interface
import { Auction, AuctionBid, auctionType } from '../interfaces/Auction'

export const ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/graphql'
    : 'https://api.thegraph.com/subgraphs/name/adamazad/mesa'

// eslint-disable-next-line
export const getAuctionsData = async (auctionsRequest: Promise<any>): Promise<Auction[]> => {
  const fairSale: auctionType = 'fairSale'
  const fixedPriceAuction: auctionType = 'fixedPriceAuction'
  const fairSales: Auction[] = (await auctionsRequest).fairSales
  const addFairSaleType = fairSales.map(item => ({ ...item, type: fairSale }))
  const fixedPriceAuctions: Auction[] = (await auctionsRequest).fixedPriceAuctions
  const addFixedPriceAuctionsType = fixedPriceAuctions.map(item => ({ ...item, type: fixedPriceAuction }))
  const auctionsArray = [...addFairSaleType, ...addFixedPriceAuctionsType]
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
  const auctionBids: AuctionBid[] = (await auctionBidsRequest)[auctiontypes].bids.map((item: AuctionBid) => ({
    ...item,
    tokenOut: utils.parseUnits(item.tokenOut.toString(), 18),
    tokenIn: utils.parseUnits(item.tokenIn.toString(), 18),
  }))

  return auctionBids
}

export async function subgraphCall(endpoint: string, query: string) {
  const apiCall = await axios.post(endpoint, {
    query,
  })
  return apiCall.data.data
}
