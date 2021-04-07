// Externals
import { BigNumber } from 'ethers'

//interface
import { Auction, AuctionBid, auctionType } from '../interfaces/Auction'

// variables
/**
 * @todo create seperate deployment and production variables
 */

export const ENDPOINT = 'http://localhost:8000/subgraphs/name/adamazad/mesa'

export const FAKER = 'http://localhost:9002/graphql'

export const getAuctionsData = async (auctionsRequest: Promise<any>): Promise<Auction[]> => {
  // refactor array to make sure that it only makes a single request to server
  const easyAuction: auctionType = 'easyAuction'
  const fixedPriceAuction: auctionType = 'fixedPriceAuction'
  const easyAuctions: Auction[] = (await auctionsRequest).data.easyAuctions
  const addEasyAuctionType = easyAuctions.map(item => ({ ...item, type: easyAuction }))
  const fixedPriceAuctions: Auction[] = (await auctionsRequest).data.fixedPriceAuctions
  const addFixedPriceAuctionsType = fixedPriceAuctions.map(item => ({ ...item, type: fixedPriceAuction }))
  const auctionsArray = [...addEasyAuctionType, ...addFixedPriceAuctionsType]

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
  // use mock tests to test functions
  // converts buy/sell numbers from type number to type bignumbers
  const auctionBids: AuctionBid[] = (await auctionBidsRequest).data[auctiontypes].bids.map((item: AuctionBid) => ({
    ...item,
    tokenOutAmount: BigNumber.from(item.tokenOutAmount),
    tokenInAmount: BigNumber.from(item.tokenInAmount),
  }))

  return auctionBids
}
