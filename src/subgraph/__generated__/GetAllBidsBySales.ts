/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedPriceSaleCommitmentStatus } from './globalTypes'

// ====================================================
// GraphQL query operation: GetAllBidsBySales
// ====================================================

export interface GetAllBidsBySales_fixedPriceSale_commitments_user {
  __typename: 'FixedPriceSaleUser'
  /**
   * Address of buyer
   */
  address: any
}

export interface GetAllBidsBySales_fixedPriceSale_commitments_sale {
  __typename: 'FixedPriceSale'
  id: string
  /**
   * Token price
   */
  tokenPrice: any
}

export interface GetAllBidsBySales_fixedPriceSale_commitments {
  __typename: 'FixedPriceSaleCommitment'
  /**
   * The commitment ID
   */
  id: string
  /**
   * Amount of tokens
   */
  amount: any
  status: FixedPriceSaleCommitmentStatus
  /**
   * Address of buyer
   */
  user: GetAllBidsBySales_fixedPriceSale_commitments_user
  /**
   * FixedPriceSale this commitment is associated with
   */
  sale: GetAllBidsBySales_fixedPriceSale_commitments_sale
}

export interface GetAllBidsBySales_fixedPriceSale {
  __typename: 'FixedPriceSale'
  id: string
  /**
   * Amount of tokens sold so far
   */
  soldAmount: any
  /**
   * List of sale commitments
   */
  commitments: GetAllBidsBySales_fixedPriceSale_commitments[] | null
}

export interface GetAllBidsBySales_fairSale_bids_sale {
  __typename: 'FairSale'
  /**
   * The sale contract address
   */
  id: string
}

export interface GetAllBidsBySales_fairSale_bids {
  __typename: 'FairSaleBid'
  id: string
  /**
   * Number of tokens the investor wants to invest
   */
  tokenInAmount: any
  /**
   * Number of tokens the investor wants to buy
   */
  tokenOutAmount: any
  /**
   * The FairSale the bid is associated with
   */
  sale: GetAllBidsBySales_fairSale_bids_sale
}

export interface GetAllBidsBySales_fairSale {
  __typename: 'FairSale'
  /**
   * The sale contract address
   */
  id: string
  /**
   * List of bids
   */
  bids: GetAllBidsBySales_fairSale_bids[] | null
}

export interface GetAllBidsBySales {
  fixedPriceSale: GetAllBidsBySales_fixedPriceSale | null
  fairSale: GetAllBidsBySales_fairSale | null
}

export interface GetAllBidsBySalesVariables {
  saleId: string
}
