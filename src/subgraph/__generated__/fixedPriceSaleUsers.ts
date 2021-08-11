/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SaleStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: fixedPriceSaleUsers
// ====================================================

export interface fixedPriceSaleUsers_sale_tokenIn {
  __typename: 'Token'
  /**
   * Token address
   */
  id: string
  /**
   * Token name, from the smart contract ERC20.name()
   */
  name: string | null
  /**
   * The token symbol from ERC20.symbol()
   */
  symbol: string | null
  /**
   * The token decimals, from ERC.decimals()
   */
  decimals: any
}

export interface fixedPriceSaleUsers_sale_tokenOut {
  __typename: 'Token'
  /**
   * Token address
   */
  id: string
  /**
   * Token name, from the smart contract ERC20.name()
   */
  name: string | null
  /**
   * The token symbol from ERC20.symbol()
   */
  symbol: string | null
  /**
   * The token decimals, from ERC.decimals()
   */
  decimals: any
}

export interface fixedPriceSaleUsers_sale_launchedTemplate {
  __typename: "LaunchedSaleTemplate";
  /**
   * Address of the template
   */
  id: string;
  /**
   * IPFS content hash
   */
  metadataContentHash: string | null;
}

export interface fixedPriceSaleUsers_sale {
  __typename: 'FixedPriceSale'
  id: string
  /**
   * The name of the sale, default is the tokenIn's name
   */
  name: string
  createdAt: number
  updatedAt: number
  deletedAt: number | null
  /**
   * Sale status: open/ended/settled/upcoming/cancelled/failed
   */
  status: SaleStatus;
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
  sellAmount: any;
  /**
   * Minimum raise threshold
   */
  minRaise: any;
  /**
   * Minimum token amount per commitment
   */
  minCommitment: any
  /**
   * Maximum token amount per commitment
   */
  maxCommitment: any
  /**
   * Token price
   */
  tokenPrice: any
  /**
   * Token investors can use to bid
   */
  tokenIn: fixedPriceSaleUsers_sale_tokenIn
  /**
   * Token investor get
   */
  tokenOut: fixedPriceSaleUsers_sale_tokenOut;
  launchedTemplate: fixedPriceSaleUsers_sale_launchedTemplate | null;
}

export interface fixedPriceSaleUsers {
  __typename: 'FixedPriceSaleUser'
  /**
   * The user's ID <saleAddress>/users/<saleUserAddress>
   */
  id: string
  createdAt: number
  updatedAt: number
  deletedAt: number | null
  /**
   * Total commitments submitted in the sale
   */
  totalCommitment: number
  /**
   * Total volume for this user
   */
  totalVolume: any
  /**
   * FixedPriceSale reference
   */
  sale: fixedPriceSaleUsers_sale
  /**
   * Address of buyer
   */
  address: any
}
