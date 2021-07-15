/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedPriceSaleStatus } from './globalTypes'

// ====================================================
// GraphQL query operation: GetAllSales
// ====================================================

export interface GetAllSales_fixedPriceSales_tokenIn {
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

export interface GetAllSales_fixedPriceSales_tokenOut {
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

export interface GetAllSales_fixedPriceSales {
  __typename: 'FixedPriceSale'
  id: string
  /**
   * The name of the same, default is the tokenIn's name
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
  minimumRaise: any
  /**
   * Minimum token amount per purchase
   */
  allocationMin: any
  /**
   * Maximum token amount per purchase
   */
  allocationMax: any
  /**
   * Token price
   */
  tokenPrice: any
  /**
   * Token investors can use to bid
   */
  tokenIn: GetAllSales_fixedPriceSales_tokenIn
  /**
   * Token investor get
   */
  tokenOut: GetAllSales_fixedPriceSales_tokenOut
}

export interface GetAllSales_fairSales_tokenIn {
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

export interface GetAllSales_fairSales_tokenOut {
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

export interface GetAllSales_fairSales {
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
  minimumBidAmount: any
  /**
   * The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment
   */
  minFundingThreshold: number | null
  /**
   * Accepted bidding token (ie: DAI, USDC)
   */
  tokenIn: GetAllSales_fairSales_tokenIn
  /**
   * Auctioning token
   */
  tokenOut: GetAllSales_fairSales_tokenOut
}

export interface GetAllSales {
  fixedPriceSales: GetAllSales_fixedPriceSales[]
  fairSales: GetAllSales_fairSales[]
}
