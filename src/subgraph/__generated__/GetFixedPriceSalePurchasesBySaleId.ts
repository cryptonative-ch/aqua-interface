/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFixedPriceSalePurchasesBySaleId
// ====================================================

export interface GetFixedPriceSalePurchasesBySaleId_fixedPriceSalePurchases_sale {
  __typename: 'FixedPriceSale'
  id: string
}

export interface GetFixedPriceSalePurchasesBySaleId_fixedPriceSalePurchases {
  __typename: 'FixedPriceSalePurchase'
  id: string
  createdAt: number
  updatedAt: number
  deletedAt: number | null
  buyer: any
  amount: any
  sale: GetFixedPriceSalePurchasesBySaleId_fixedPriceSalePurchases_sale
}

export interface GetFixedPriceSalePurchasesBySaleId {
  fixedPriceSalePurchases: GetFixedPriceSalePurchasesBySaleId_fixedPriceSalePurchases[]
}

export interface GetFixedPriceSalePurchasesBySaleIdVariables {
  saleId: string
}
