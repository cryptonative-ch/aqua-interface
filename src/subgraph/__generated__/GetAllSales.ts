/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SaleStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAllSales
// ====================================================

export interface GetAllSales_fixedPriceSales_tokenIn {
  __typename: "Token";
  /**
   * Token address
   */
  id: string;
  /**
   * Token name, from the smart contract ERC20.name()
   */
  name: string | null;
  /**
   * The token symbol from ERC20.symbol()
   */
  symbol: string | null;
  /**
   * The token decimals, from ERC.decimals()
   */
  decimals: any;
}

export interface GetAllSales_fixedPriceSales_tokenOut {
  __typename: "Token";
  /**
   * Token address
   */
  id: string;
  /**
   * Token name, from the smart contract ERC20.name()
   */
  name: string | null;
  /**
   * The token symbol from ERC20.symbol()
   */
  symbol: string | null;
  /**
   * The token decimals, from ERC.decimals()
   */
  decimals: any;
}

export interface GetAllSales_fixedPriceSales_launchedTemplate {
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

export interface GetAllSales_fixedPriceSales {
  __typename: "FixedPriceSale";
  id: string;
  /**
   * The name of the sale, default is the tokenIn's name
   */
  name: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
  /**
   * Sale status: open/ended/settled/upcoming/cancelled/failed
   */
  status: SaleStatus;
  /**
   * The UTC timestamp at which the sale starts
   */
  startDate: number;
  /**
   * The UTC timestamp at which the sale closes
   */
  endDate: number;
  /**
   * Amount of tokens sold so far
   */
  soldAmount: any;
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
  minCommitment: any;
  /**
   * Maximum token amount per commitment
   */
  maxCommitment: any;
  /**
   * Token price
   */
  tokenPrice: any;
  /**
   * Token investors can use to bid
   */
  tokenIn: GetAllSales_fixedPriceSales_tokenIn;
  /**
   * Token investor get
   */
  tokenOut: GetAllSales_fixedPriceSales_tokenOut;
  launchedTemplate: GetAllSales_fixedPriceSales_launchedTemplate | null;
}

export interface GetAllSales_fairSales_tokenIn {
  __typename: "Token";
  /**
   * Token address
   */
  id: string;
  /**
   * Token name, from the smart contract ERC20.name()
   */
  name: string | null;
  /**
   * The token symbol from ERC20.symbol()
   */
  symbol: string | null;
  /**
   * The token decimals, from ERC.decimals()
   */
  decimals: any;
}

export interface GetAllSales_fairSales_tokenOut {
  __typename: "Token";
  /**
   * Token address
   */
  id: string;
  /**
   * Token name, from the smart contract ERC20.name()
   */
  name: string | null;
  /**
   * The token symbol from ERC20.symbol()
   */
  symbol: string | null;
  /**
   * The token decimals, from ERC.decimals()
   */
  decimals: any;
}

export interface GetAllSales_fairSales_launchedTemplate {
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

export interface GetAllSales_fairSales_launchedTemplate {
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

export interface GetAllSales_fairSales {
  __typename: "FairSale";
  /**
   * The sale contract address
   */
  id: string;
  /**
   * The sale name
   */
  name: string | null;
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
  /**
   * Sale status: open/ended/settled/upcoming
   */
  status: SaleStatus;
  /**
   * Date of the sale start
   */
  startDate: number;
  /**
   * Date of the sale end
   */
  endDate: number;
  /**
   * Total amount of tokens available for sale
   */
  tokensForSale: any;
  /**
   * Minimum amount per bid
   */
  minBidAmount: any;
  /**
   * The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment
   */
  minFundingThreshold: number | null;
  /**
   * Accepted bidding token (ie: DAI, USDC)
   */
  tokenIn: GetAllSales_fairSales_tokenIn;
  /**
   * Auctioning token
   */
  tokenOut: GetAllSales_fairSales_tokenOut;
  launchedTemplate: GetAllSales_fairSales_launchedTemplate | null;
}

export interface GetAllSales {
  fixedPriceSales: GetAllSales_fixedPriceSales[];
  fairSales: GetAllSales_fairSales[];
}
