/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: fairSaleResults
// ====================================================

export interface fairSaleResults_tokenIn {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface fairSaleResults_tokenOut {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
  decimals: any
}

export interface fairSaleResults {
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
  tokenIn: fairSaleResults_tokenIn
  tokenOut: fairSaleResults_tokenOut
}
