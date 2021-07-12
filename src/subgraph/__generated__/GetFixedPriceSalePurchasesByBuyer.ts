/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFixedPriceSalePurchasesByBuyer
// ====================================================

export interface GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases_sale_tokenIn {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases_sale_tokenOut {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases_sale {
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
  tokenIn: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases_sale_tokenIn
  /**
   * Token investor get
   */
  tokenOut: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases_sale_tokenOut
}

export interface GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases {
  __typename: 'FixedPriceSalePurchase'
  id: string
  createdAt: number
  updatedAt: number
  deletedAt: number | null
  buyer: any
  amount: any
  sale: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases_sale
}

export interface GetFixedPriceSalePurchasesByBuyer {
  fixedPriceSalePurchases: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases[]
}

export interface GetFixedPriceSalePurchasesByBuyerVariables {
  buyerId: any
}
