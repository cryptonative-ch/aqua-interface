/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedPriceSaleStatus } from './globalTypes'

// ====================================================
// GraphQL query operation: GetSingleSale
// ====================================================

export interface GetSingleSale_fixedPriceSale_tokenIn {
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

export interface GetSingleSale_fixedPriceSale_tokenOut {
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

export interface GetSingleSale_fixedPriceSale {
  __typename: 'FixedPriceSale'
  id: string
  /**
   * The name of the sale, default is the tokenIn's name
   */
  name: string
  createdAt: number
  updatedAt: number
  deletedAt: number | null
  /**
   * Sale status: open/ended/settled/upcoming/cancelled/failed
   */
  status: FixedPriceSaleStatus
  /**
   * The UTC timestamp at which the sale starts
   */
  startDate: number
  /**
   * The UTC timestamp at which the sale closes
   */
  endDate: number
  /**
   * Amount of tokens sold so far
   */
  soldAmount: any
  /**
   * Amount of tokens to sell
   */
  sellAmount: any
  minRaise: any
  /**
   * Minimum token amount per commitment
   */
  minCommitment: any
  /**
   * Maximum token amount per commitment
   */
  maxCommitment: any
  /**
   * Token price
   */
  tokenPrice: any
  /**
   * Token investors can use to bid
   */
  tokenIn: GetSingleSale_fixedPriceSale_tokenIn
  /**
   * Token investor get
   */
  tokenOut: GetSingleSale_fixedPriceSale_tokenOut
}

export interface GetSingleSale_fairSale_tokenIn {
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

export interface GetSingleSale_fairSale_tokenOut {
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

export interface GetSingleSale_fairSale {
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
  tokenIn: GetSingleSale_fairSale_tokenIn
  /**
   * Auctioning token
   */
  tokenOut: GetSingleSale_fairSale_tokenOut
}

export interface GetSingleSale {
  fixedPriceSale: GetSingleSale_fixedPriceSale | null
  fairSale: GetSingleSale_fairSale | null
}

export interface GetSingleSaleVariables {
  saleId: string
}
