// Externals
import { BigNumber } from 'ethers'
import { request } from 'graphql-request'

//interface
import { Auction, AuctionBid, auctionType } from '../interfaces/Auction'

//subgraph

import { auctionsRequest } from 'src/subgraph/Auctions'
import { auctionBidsQuery } from 'src/subgraph/AuctionBids'

// variables
/**
 * @todo create seperate deployment and production variables
 */

export const ENDPOINT = 'http://localhost:8000/subgraphs/name/adamazad/mesa'

export const getAuctionsData = async (): Promise<Auction[]> => {
  const easyAuction: auctionType = 'easyAuction'
  const fixedPriceAuction: auctionType = 'fixedPriceAuction'
  const easyAuctions: Auction[] = (await auctionsRequest).easyAuctions
  const addEasyAuctionType = easyAuctions.map(item => ({ ...item, type: easyAuction }))
  const fixedPriceAuctions: Auction[] = (await auctionsRequest).fixedPriceAuctions
  const addFixedPriceAuctionsType = fixedPriceAuctions.map(item => ({ ...item, type: fixedPriceAuction }))
  const auctionsArray = [...addEasyAuctionType, ...addFixedPriceAuctionsType]
  return auctionsArray
}

export const selectAuctiontype = (id: string, auctions: Auction[]): auctionType => {
  const auctionType: Auction = auctions.filter(item => item.id === id)[0]
  return auctionType.type
}

export const generateInitialAuctionData = async (
  id: string,
  auctionType: 'fixedPriceAuction' | 'easyAuction'
): Promise<AuctionBid[]> => {
  const auctionBidsRequest = request(ENDPOINT, auctionBidsQuery(id, auctionType))

  // converts buy/sell numbers from type number to type bignumbers
  const auctionBids: AuctionBid[] = (await auctionBidsRequest).easyauctionbids.map((item: AuctionBid) => ({
    ...item,
    tokenOutAmount: BigNumber.from(item.tokenOutAmount),
    tokenInAmount: BigNumber.from(item.tokenInAmount),
  }))

  return auctionBids
}
