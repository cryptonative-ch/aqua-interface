import { BigNumber } from 'ethers'

interface BaseAuction {
  id: string // Contract address (Using Factory pattern)
  name: string // BaseAuction name
  createdAt: number // The UTC timestamp at which the BaseAuction was placed
  updatedAt: number | null // The UTC timestamp at which the BaseAuction was updated
  deletedAt: number | null // The UTC timestamp at which the BaseAuction was deleted
  status: string // open/ended/settled/upcoming
  startDate: number // Open timestamp
  endDate: number // Close timestamp
  type: auctionType // auction type, i.e fairsale or fixedPriceSale
}

interface Bid {
  id: string
  status: string // submitted/settled/cancelled/claimed
  BaseAuction: string
  createdAt: number // The UTC timestamp at which the bid was placed
  updatedAt: number | null // The UTC timestamp at which the bid was updated
  deletedAt: number | null // The UTC timestamp at which the bid was deleted
}

export interface FairSaleBid extends Bid {
  tokenIn: BigNumber // number of tokens the investor wants to buy
  tokenOut: BigNumber // number of tokens the investor wants to buy
  address: string // The bidder's Ethereum address
}

export type FairBidPick = Pick<FairSaleBid, 'address' | 'tokenOut' | 'tokenIn'>

export interface FixedPriceSalePurchase extends Bid {
  amount: BigNumber // number of tokens the investor wants to buy
  buyer: string // The bidder's Ethereum address
}

export type AuctionBid = FairSaleBid & FixedPriceSalePurchase

export type Auction = FixedPriceSale & FairSale
export interface Token {
  id: string
  name: string // Token name, from the smart contract ERC20.name()
  address: string // ERC20 Token's contract address
  symbol: string // Symbol, from ERC20.symbol()
  decimals: number // Decimal, from ERC.decimals()
  icon: string
}

export interface AuctionUser {
  id: string
  address: string // The bidder's Ethereum address
}

// FairSale entity
export interface FairSale extends BaseAuction {
  // Specific to the FairSale
  // Total amount of tokens available for BaseAuctioning
  tokenAmount: BigNumber
  // Minimum amount per bid
  minimumBidAmount: BigNumber
  // Bidding token (ie: DAI, USDC)
  tokenIn: Token
  // BaseAuctioning token
  tokenOut: Token
  // List of bids
  bids: FairSaleBid[]
  // The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment
  minFundingThreshold: number
  //
}

// FixedPriceAuction
export interface FixedPriceSale extends BaseAuction {
  // Specific to the FixedPriceAuction
  // Amount to sell
  sellAmount: BigNumber
  //bidding and sale tokens
  tokenIn: Token
  tokenOut: Token
  tokenPrice: BigNumber
  soldAmount: BigNumber
  //Minimum and maxmimum token per order
  allocationMin: number
  allocationMax: number
  bids: FixedPriceSalePurchase[]
}

export type auctionType = 'fixedPriceSale' | 'fairSale'

export interface MesaFactory {
  // ID: should be a unique easy-to-reference
  id: string
  // BaseAuction
  BaseAuctionCount: number
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
  BaseAuctionFee: number
}

export enum BaseAuctionTemplateName {
  FairSale,
  FixedPriceAuction,
}

export interface BaseAuctionTemplate {
  // TemplatesId from the event
  id: string
  // Address of the BaseAuctionTemplate contract: either FairSale or FixedPriceAuction
  address: string
  // Address of the MesaFactory
  factory: string
  // Template name
  name: BaseAuctionTemplateName
  // Exists
  verified: boolean
}
