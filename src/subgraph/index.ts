// Externals

import axios from 'axios'
import { BigNumber } from 'ethers'

//interface
import { Auction, AuctionBid, auctionType } from '../interfaces/Auction'

export const ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/graphql'
    : 'https://api.thegraph.com/subgraphs/name/adamazad/mesa'

// eslint-disable-next-line
export const getAuctionsData = async (auctionsRequest: Promise<any>): Promise<Auction[]> => {
  const fairSale: auctionType = 'fairSale'
  const fixedPriceSale: auctionType = 'fixedPriceSale'
  const fairSales: Auction[] = (await auctionsRequest).fairSales

  const addFairSaleType = fairSales.map(item => ({
    ...item,
    tokenAmount: BigNumber.from(item.tokenAmount),
    type: fairSale,
  }))

  const fixedPriceSales: Auction[] = (await auctionsRequest).fixedPriceSales
  const addFixedPriceSalesType = fixedPriceSales.map(item => ({
    ...item,
    sellAmount: BigNumber.from(item.sellAmount),
    tokenPrice: BigNumber.from(item.tokenPrice),
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
    const auctionBids: AuctionBid[] = (await auctionBidsRequest)[auctiontypes].purchases.map((item: AuctionBid) => ({
      ...item,

      amount: BigNumber.from(item.amount),
    }))
    console.log(auctionBids)

    return auctionBids
  }

  const auctionBids: AuctionBid[] = (await auctionBidsRequest)[auctiontypes].bids.map((item: any) => ({
    ...item,
    tokenOut: BigNumber.from(item.tokenOutAmount),
    tokenIn: BigNumber.from(item.tokenInAmount),
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
