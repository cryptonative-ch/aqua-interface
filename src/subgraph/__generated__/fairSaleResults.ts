/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: fairSaleResults
// ====================================================

export interface fairSaleResults_tokenIn {
  __typename: 'Token'
  /**
   * Token address
   */
  id: string
  /**
   * Token name, from the smart contract ERC20.name()
   */
  name: string | null
  /**
   * The token symbol from ERC20.symbol()
   */
  symbol: string | null
  /**
   * The token decimals, from ERC.decimals()
   */
  decimals: any
}

export interface fairSaleResults_tokenOut {
  __typename: 'Token'
  /**
   * Token address
   */
  id: string
  /**
   * Token name, from the smart contract ERC20.name()
   */
  name: string | null
  /**
   * The token symbol from ERC20.symbol()
   */
  symbol: string | null
  /**
   * The token decimals, from ERC.decimals()
   */
  decimals: any
}

export interface fairSaleResults {
  __typename: 'FairSale'
  /**
   * The sale contract address
   */
  id: string
  /**
   * The sale name
   */
  name: string | null
  createdAt: number
  updatedAt: number
  deletedAt: number | null
  /**
   * Sale status: open/ended/settled/upcoming
   */
  status: string
  /**
   * Date of the sale start
   */
  startDate: number
  /**
   * Date of the sale end
   */
  endDate: number
  /**
   * Total amount of tokens available for sale
   */
  tokensForSale: any
  /**
   * Minimum amount per bid
   */
  minBidAmount: any
  /**
   * The minimal funding threshold for executing the settlement. If funding is not
   * reached, everyone will get back their investment
   */
  minFundingThreshold: number | null
  /**
   * Accepted bidding token (ie: DAI, USDC)
   */
  tokenIn: fairSaleResults_tokenIn
  /**
   * Auctioning token
   */
  tokenOut: fairSaleResults_tokenOut
}
