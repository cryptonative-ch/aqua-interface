/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedPriceSaleStatus, FixedPriceSaleCommitmentStatus } from './globalTypes'

// ====================================================
// GraphQL fragment: fixedPriceSaleCommitments
// ====================================================

export interface fixedPriceSaleCommitments_user_sale_tokenIn {
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

export interface fixedPriceSaleCommitments_user_sale_tokenOut {
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

export interface fixedPriceSaleCommitments_user_sale {
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
  status: FixedPriceSaleStatus
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
  tokenIn: fixedPriceSaleCommitments_user_sale_tokenIn
  /**
   * Token investor get
   */
  tokenOut: fixedPriceSaleCommitments_user_sale_tokenOut
}

export interface fixedPriceSaleCommitments_user {
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
  sale: fixedPriceSaleCommitments_user_sale
  /**
   * Address of buyer
   */
  address: any
}

export interface fixedPriceSaleCommitments_sale_tokenIn {
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

export interface fixedPriceSaleCommitments_sale_tokenOut {
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

export interface fixedPriceSaleCommitments_sale {
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
  status: FixedPriceSaleStatus
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
  tokenIn: fixedPriceSaleCommitments_sale_tokenIn
  /**
   * Token investor get
   */
  tokenOut: fixedPriceSaleCommitments_sale_tokenOut
}

export interface fixedPriceSaleCommitments {
  __typename: 'FixedPriceSaleCommitment'
  /**
   * The commitment ID
   */
  id: string
  createdAt: number
  updatedAt: number
  deletedAt: number | null
  /**
   * Address of buyer
   */
  user: fixedPriceSaleCommitments_user
  /**
   * Amount of tokens
   */
  amount: any
  status: FixedPriceSaleCommitmentStatus
  /**
   * FixedPriceSale this commitment is associated with
   */
  sale: fixedPriceSaleCommitments_sale
}
