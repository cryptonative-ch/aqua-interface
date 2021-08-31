/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedPriceSaleCommitmentStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAllBidsBySaleId
// ====================================================

export interface GetAllBidsBySaleId_fixedPriceSale_commitments_user {
  __typename: "FixedPriceSaleUser";
  /**
   * Address of buyer
   */
  address: any;
}

export interface GetAllBidsBySaleId_fixedPriceSale_commitments_sale {
  __typename: "FixedPriceSale";
  id: string;
  /**
   * Token price
   */
  tokenPrice: any;
}

export interface GetAllBidsBySaleId_fixedPriceSale_commitments {
  __typename: "FixedPriceSaleCommitment";
  /**
   * The commitment ID
   */
  id: string;
  /**
   * Amount of tokens
   */
  amount: any;
  status: FixedPriceSaleCommitmentStatus;
  /**
   * Address of buyer
   */
  user: GetAllBidsBySaleId_fixedPriceSale_commitments_user;
  /**
   * FixedPriceSale this commitment is associated with
   */
  sale: GetAllBidsBySaleId_fixedPriceSale_commitments_sale;
}

export interface GetAllBidsBySaleId_fixedPriceSale {
  __typename: "FixedPriceSale";
  id: string;
  /**
   * Amount of tokens sold so far
   */
  soldAmount: any;
  /**
   * List of sale commitments
   */
  commitments: GetAllBidsBySaleId_fixedPriceSale_commitments[] | null;
}

export interface GetAllBidsBySaleId_fairSale_bids_owner {
  __typename: "FairSaleUser";
  /**
   * Time at which the User was registered is the ID
   */
  id: string;
  address: any;
}

export interface GetAllBidsBySaleId_fairSale_bids_sale {
  __typename: "FairSale";
  /**
   * The sale contract address
   */
  id: string;
}

export interface GetAllBidsBySaleId_fairSale_bids {
  __typename: "FairSaleBid";
  id: string;
  /**
   * Number of tokens the investor wants to invest
   */
  tokenInAmount: any;
  /**
   * Number of tokens the investor wants to buy
   */
  tokenOutAmount: any;
  /**
   * The owner of the Bid
   */
  owner: GetAllBidsBySaleId_fairSale_bids_owner;
  /**
   * The FairSale the bid is associated with
   */
  sale: GetAllBidsBySaleId_fairSale_bids_sale;
}

export interface GetAllBidsBySaleId_fairSale {
  __typename: "FairSale";
  /**
   * The sale contract address
   */
  id: string;
  /**
   * List of bids
   */
  bids: GetAllBidsBySaleId_fairSale_bids[] | null;
}

export interface GetAllBidsBySaleId {
  fixedPriceSale: GetAllBidsBySaleId_fixedPriceSale | null;
  fairSale: GetAllBidsBySaleId_fairSale | null;
}

export interface GetAllBidsBySaleIdVariables {
  saleId: string;
}
