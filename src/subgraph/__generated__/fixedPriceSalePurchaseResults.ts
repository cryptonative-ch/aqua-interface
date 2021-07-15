/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedPriceSalePurchaseStatus } from './globalTypes'

// ====================================================
// GraphQL fragment: fixedPriceSalePurchaseResults
// ====================================================

export interface fixedPriceSalePurchaseResults_sale {
  __typename: 'FixedPriceSale'
  id: string
}

export interface fixedPriceSalePurchaseResults {
  __typename: 'FixedPriceSalePurchase'
  /**
   * The purchase ID
   */
  id: string
  createdAt: number
  updatedAt: number
  deletedAt: number | null
  /**
   * Address of buyer
   */
  buyer: any
  /**
   * Amount of tokens
   */
  amount: any
  status: FixedPriceSalePurchaseStatus
  /**
   * FixedPriceSale this purchase is associated with
   */
  sale: fixedPriceSalePurchaseResults_sale
}
