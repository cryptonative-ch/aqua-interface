/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SaleStatus } from './globalTypes'

// ====================================================
// GraphQL fragment: fixedPriceSaleResults
// ====================================================

export interface fixedPriceSaleResults_tokenIn {
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

export interface fixedPriceSaleResults_tokenOut {
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

export interface fixedPriceSaleResults_launchedTemplate {
  __typename: 'LaunchedSaleTemplate'
  /**
   * Address of the template
   */
  id: string
  /**
   * IPFS content hash
   */
  metadataContentHash: string | null
}

export interface fixedPriceSaleResults {
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
  status: SaleStatus
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
  /**
   * Minimum raise threshold
   */
  minRaise: any
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
  tokenIn: fixedPriceSaleResults_tokenIn
  /**
   * Token investor get
   */
  tokenOut: fixedPriceSaleResults_tokenOut
  launchedTemplate: fixedPriceSaleResults_launchedTemplate | null
}
