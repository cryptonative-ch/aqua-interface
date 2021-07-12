/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedPriceSalePurchaseStatus } from './../../../__generated__/globalTypes'

// ====================================================
// GraphQL query operation: GetFixedPriceSalePurchasesBySaleId
// ====================================================

export interface GetFixedPriceSalePurchasesBySaleId_fixedPriceSalePurchases_sale {
  __typename: 'FixedPriceSale'
  id: string
}

export interface GetFixedPriceSalePurchasesBySaleId_fixedPriceSalePurchases {
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
  sale: GetFixedPriceSalePurchasesBySaleId_fixedPriceSalePurchases_sale
}

export interface GetFixedPriceSalePurchasesBySaleId {
  fixedPriceSalePurchases: GetFixedPriceSalePurchasesBySaleId_fixedPriceSalePurchases[]
}

export interface GetFixedPriceSalePurchasesBySaleIdVariables {
  saleId: string
}
