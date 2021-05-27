/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSingleSale
// ====================================================

export interface GetSingleSale_fixedPriceSale_tokenIn {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface GetSingleSale_fixedPriceSale_tokenOut {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface GetSingleSale_fixedPriceSale {
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
  tokenIn: GetSingleSale_fixedPriceSale_tokenIn
  /**
   * Token investor get
   */
  tokenOut: GetSingleSale_fixedPriceSale_tokenOut
}

export interface GetSingleSale_fairSale_tokenIn {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface GetSingleSale_fairSale_tokenOut {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface GetSingleSale_fairSale {
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
  tokenIn: GetSingleSale_fairSale_tokenIn
  tokenOut: GetSingleSale_fairSale_tokenOut
}

export interface GetSingleSale {
  fixedPriceSale: GetSingleSale_fixedPriceSale | null
  fairSale: GetSingleSale_fairSale | null
}

export interface GetSingleSaleVariables {
  saleId: string
}
