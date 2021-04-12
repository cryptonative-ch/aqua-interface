// Externals
import axios from 'axios'
import { BigNumber } from 'ethers'

//interface
import { Auction, AuctionBid, auctionType } from '../interfaces/Auction'

export const ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/graphql'
    : 'https://api.thegraph.com/subgraphs/name/adamazad/mesa'

export const getAuctionsData = async (auctionsRequest: Promise<any>): Promise<Auction[]> => {
  const easyAuction: auctionType = 'easyAuction'
  const fixedPriceAuction: auctionType = 'fixedPriceAuction'
  const easyAuctions: Auction[] = (await auctionsRequest).easyAuctions
  const addEasyAuctionType = easyAuctions.map(item => ({ ...item, type: easyAuction }))
  const fixedPriceAuctions: Auction[] = (await auctionsRequest).fixedPriceAuctions
  const addFixedPriceAuctionsType = fixedPriceAuctions.map(item => ({ ...item, type: fixedPriceAuction }))
  const auctionsArray = [...addEasyAuctionType, ...addFixedPriceAuctionsType]
  console.log(auctionsArray)
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
  const auctionBids: AuctionBid[] = (await auctionBidsRequest)[auctiontypes].bids.map((item: AuctionBid) => ({
    ...item,
    tokenOut: BigNumber.from(item.tokenOut),
    tokenIn: BigNumber.from(item.tokenIn),
  }))

  return auctionBids
}

export async function subgraphCall(endpoint: string, query: string) {
  const apiCall = await axios.post(endpoint, {
    query,
  })
  return apiCall.data.data
}
