/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: fixedPriceSalePurchaseResults
// ====================================================

export interface fixedPriceSalePurchaseResults_sale {
  __typename: "FixedPriceSale";
  id: string;
}

export interface fixedPriceSalePurchaseResults {
  __typename: "FixedPriceSalePurchase";
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
  buyer: any;
  amount: any;
  sale: fixedPriceSalePurchaseResults_sale;
}
