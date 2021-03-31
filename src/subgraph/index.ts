// Externals
import { BigNumber } from 'ethers'
import { request } from 'graphql-request'


//interface
import { Auction, AuctionBid, auctionType } from "../interfaces/Auction";




//subgraph

import { auctionsRequest } from 'src/subgraph/Auctions'
import { auctionBidsQuery } from 'src/subgraph/AuctionBids'




// variables
/**
 * @todo create seperate deployment and production variables
 */

export const ENDPOINT = 'http://localhost:8000/subgraphs/name/adamazad/mesa' 


export const getAuctionsData = async (): Promise<Auction[]> => {
  // save to redux system
  // doesn't need multiple fetchs
  // can update on the fly 
  // have updates push to redux rather than re-fetching

  const easyAuction: auctionType = 'easyAuction'

  const fixedPriceAuction: auctionType = 'fixedPriceAuction'

  const easyAuctions: Auction[] = (await auctionsRequest).easyAuctions

  const addEasyAuctionType = easyAuctions.map((item) => ({...item,  type: easyAuction}))

  const fixedPriceAuctions: Auction[] = (await auctionsRequest).fixedPriceAuctions

  const addFixedPriceAuctionsType = fixedPriceAuctions.map((item) => ({...item, type: fixedPriceAuction}))

  const auctionsArray = [...addEasyAuctionType, ...addFixedPriceAuctionsType]
  console.log(auctionsArray)
  

  return auctionsArray
}


export const selectAuctiontype = async(id: string): Promise<auctionType>  => {
  // rewrite to not create a new fetch from node
  // fetch from redux 

  const auctionType: Auction = (await getAuctionsData()).filter((item) => item.id === id)[0]

  return auctionType.type
}


export const generateInitialAuctionData = async (id: string, auctionType: 'fixedPriceAuction' | 'easyAuction'): Promise<AuctionBid[]> => {
  // reformat data
  const auctionBidsRequest = request(ENDPOINT, auctionBidsQuery(id, auctionType))


  // converts buy/sell numbers from type number to type bignumbers
  const auctionBids: AuctionBid[] = (await auctionBidsRequest).easyauctionbids.map((item: any) => ({
    ...item,
    tokenOutAmount: BigNumber.from(item.tokenOutAmount),
    tokenInAmount: BigNumber.from(item.tokenInAmount),
  }))

  console.log(auctionBids)
  return [...auctionBids]
}

// export const generatedSubscriptionAuctiondata = async(): Promise<AuctionBid[]> => {
//   // subscription to auctionBids
//   // pulls in single bids each 1/5/10 seconds
//   return ()
// }
