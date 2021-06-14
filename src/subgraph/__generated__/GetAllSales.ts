/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllSales
// ====================================================

export interface GetAllSales_fixedPriceSales_tokenIn {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface GetAllSales_fixedPriceSales_tokenOut {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
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
  status: string
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
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface GetAllSales_fairSales_tokenOut {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface GetAllSales_fairSales {
  __typename: 'FairSale'
  id: string
  name: string | null
  createdAt: number
  updatedAt: number
  deletedAt: number | null
  status: string
  startDate: number
  endDate: number
  tokenAmount: any
  minimumBidAmount: any
  minFundingThreshold: number | null
  tokenIn: GetAllSales_fairSales_tokenIn
  tokenOut: GetAllSales_fairSales_tokenOut
}

export interface GetAllSales {
  fixedPriceSales: GetAllSales_fixedPriceSales[]
  fairSales: GetAllSales_fairSales[]
}
