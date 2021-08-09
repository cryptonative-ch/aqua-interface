import { BigNumber } from 'ethers'

interface BaseSale {
  id: string // Contract address (Using Factory pattern)
  name: string // BaseSale name
  createdAt: number // The UTC timestamp at which the BaseSale was placed
  updatedAt: number | null // The UTC timestamp at which the BaseSale was updated
  deletedAt: number | null // The UTC timestamp at which the BaseSale was deleted
  status: string // open/ended/settled/upcoming
  startDate: number // Open timestamp
  endDate: number // Close timestamp
  type: SaleType // sale type, i.e fairsale or fixedPriceSale
}

export interface Bid {
  id: string
  baseSale: Pick<BaseSale, 'id'>
  createdAt: number // The UTC timestamp at which the bid was placed
  updatedAt: number | null // The UTC timestamp at which the bid was updated
  deletedAt: number | null // The UTC timestamp at which the bid was deleted
}

export interface FairSaleBid extends Bid {
  tokenIn: BigNumber // number of tokens the investor wants to buy
  tokenOut: BigNumber // number of tokens the investor wants to buy
  address: string // The bidder's Ethereum address
  status?: string
}
export type SaleDate = Pick<Sale, 'startDate' | 'endDate' | 'id' | 'status'>

export type FairBidPick = Pick<FairSaleBid, 'address' | 'tokenOut' | 'tokenIn'>

export type FixedPricePick = Pick<FixedPriceSalePurchase, 'amount' | 'buyer'>

export type SalePickBid = FixedPricePick | FairBidPick

export interface FixedPriceSalePurchase extends Bid {
  amount: BigNumber // number of tokens the investor wants to buy
  buyer: string // The bidder's Ethereum address
  status?: string
  sale?: FixedPriceSale
}

export type SaleBid = FairSaleBid | FixedPriceSalePurchase

export type Sale = FixedPriceSale & FairSale

export interface Token {
  id: string
  name: string // Token name, from the smart contract ERC20.name()
  address: string // ERC20 Token's contract address
  symbol: string // Symbol, from ERC20.symbol()
  decimals: number // Decimal, from ERC.decimals()
  icon: string
}

export interface SaleUser {
  id: string
  address: string // The bidder's Ethereum address
}

// FairSale entity
export interface FairSale extends BaseSale {
  // Specific to the FairSale
  // Total amount of tokens available for BaseSaleing
  tokensForSale: BigNumber
  // Minimum amount per bid
  minBidAmount: BigNumber
  // Bidding token (ie: DAI, USDC)
  tokenIn: Token
  // BaseSaleing token
  tokenOut: Token
  // List of bids
  bids: FairSaleBid[]
  // The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment
  minFundingThreshold: number
  //
}

// FixedPriceSale
export interface FixedPriceSale extends BaseSale {
  // Specific to the FixedPriceSale
  // Amount to sell
  sellAmount: BigNumber
  //bidding and sale tokens
  tokenIn: Token
  tokenOut: Token
  tokenPrice: BigNumber
  soldAmount: BigNumber
  //Minimum and maxmimum token per order
  minCommitment: number
  maxCommitment: number
  minRaise: BigNumber
  bids: FixedPriceSalePurchase[]
}

export type SaleType = 'FixedPriceSale' | 'FairSale'

export interface MesaFactory {
  // ID: should be a unique easy-to-reference
  id: string
  // BaseSale
  BaseSaleCount: number
  // Factory address
  address: string
  // Fee manager: CFO
  feeManager: string
  // Fee Collector: Treasury
  feeTo: string
  // Template manager:
  templateManager: string
  // Address of TemplateLauncher contract
  templateLauncher: string
  feeNumerator: number
  BaseSaleFee: number
}

export enum BaseSaleTemplateName {
  FairSale,
  FixedPriceSale,
}

export interface BaseSaleTemplate {
  // TemplatesId from the event
  id: string
  // Address of the BaseSaleTemplate contract: either FairSale or FixedPriceSale
  address: string
  // Address of the MesaFactory
  factory: string
  // Template name
  name: BaseSaleTemplateName
  // Exists
  verified: boolean
}

interface SaleDescription {
  title?: string
  p?: string
}

interface SaleWebsite {
  url: string
}

interface SaleSocial {
  name: string
  link: string
  icon?: string
}

export interface SaleDetails {
  description?: SaleDescription[]
  website?: SaleWebsite
  socials?: SaleSocial[]
}
