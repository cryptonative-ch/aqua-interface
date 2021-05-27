/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: fixedPriceSaleResults
// ====================================================

export interface fixedPriceSaleResults_tokenIn {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface fixedPriceSaleResults_tokenOut {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface fixedPriceSaleResults {
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
  tokenIn: fixedPriceSaleResults_tokenIn
  /**
   * Token investor get
   */
  tokenOut: fixedPriceSaleResults_tokenOut
}
