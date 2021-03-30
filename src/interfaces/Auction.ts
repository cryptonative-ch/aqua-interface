import { BigNumber } from 'ethers'

export interface Auction {
  id: string // Contract address (Using Factory pattern)
  name: string // auction name
  createdAt: number // The UTC timestamp at which the auction was placed
  updatedAt: number // The UTC timestamp at which the auction was updated
  deletedAt: number // The UTC timestamp at which the auction was deleted
  status: string // open/ended/settled/upcoming
}

export interface AuctionBid {
  id: string
  status: string // submitted/settled/cancelled/claimed
  auction: Auction
  createdAt: number // The UTC timestamp at which the bid was placed
  updatedAt: number // The UTC timestamp at which the bid was updated
  deletedAt: number // The UTC timestamp at which the bid was deleted
  tokenInAmount: BigNumber // number of tokens the investor wants to buy
  tokenOutAmount: BigNumber // number of tokens the investor wants to buy
  address: string // The bidder's Ethereum address
}

export interface AuctionToken {
  id: string
  auction: Auction // references the auction
  name: string // Token name, from the smart contract ERC20.name()
  icon: string // Token icon, preferably are URL on the IPFS
  address: string // ERC20 Token's contract address
  symbol: string // Symbol, from ERC20.symbol()
  decimals: number // Decimal, from ERC.decimals()
}

export interface AuctionUser {
  id: string
  address: string // The bidder's Ethereum address
}

// EasyAuction entity
export interface EasyAuction extends Auction {
  // Specific to the EasyAuction
  startDate: number // Open timestamp
  endDate: number // Close timestamp
  // number of seconds after the endTime of the auction
  gracePeriodStartDate: number
  // number of seconds after the endTime of the auction
  gracePeriodEndDate: number
  // Total amount of tokens available for auctioning
  tokenAmount: number
  // Minimum amount per bid
  minimumBidAmount: number
  // Bidding token (ie: DAI, USDC)
  tokenIn: AuctionToken
  // Auctioning token
  tokenOut: AuctionToken
  // List of bids
  bids: AuctionBid[]
  // The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment
  minFundingThreshold: number
}

// FixedPriceAuction
export interface FixedPriceAuction extends Auction {
  // Specific to the FixedPriceAuction
  startDate: number // Open timestamp
  endDate: number // Close timestamp
  // Amount to sell
  sellAmount: string
  // Minimum amount per bid
  minbiddingAmount: number
  minFundingThreshold: number
  orderCancellationPeriod: number
  duration: number
  minBuyAmountPerOrder: number
  isAtomicClosureAllowed: Boolean
  bids: AuctionBid[]
}

export interface MesaFactory {
  // ID: should be a unique easy-to-reference
  id: string
  // Auction
  auctionCount: number
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
  auctionFee: number
}

export enum AuctionTemplateName {
  EasyAuction,
  FixedPriceAuction,
}

export interface AuctionTemplate {
  // TemplatesId from the event
  id: string
  // Address of the AuctionTemplate contract: either EasyAuction or FixedPriceAuction
  address: string
  // Address of the MesaFactory
  factory: string
  // Template name
  name: AuctionTemplateName
  // Exists
  verified: Boolean
}
