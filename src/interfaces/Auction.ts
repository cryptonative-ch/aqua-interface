import { BigNumber } from 'ethers'

 interface BaseAuction {
  id: string // Contract address (Using Factory pattern)
  name: string // BaseAuction name
  createdAt: number // The UTC timestamp at which the BaseAuction was placed
  updatedAt: number | null // The UTC timestamp at which the BaseAuction was updated
  deletedAt: number | null// The UTC timestamp at which the BaseAuction was deleted
  status: string // open/ended/settled/upcoming
}



export interface AuctionBid {
  id?: string
  status?: string // submitted/settled/cancelled/claimed
  BaseAuction?: BaseAuction
  createdAt?: number // The UTC timestamp at which the bid was placed
  updatedAt?: number // The UTC timestamp at which the bid was updated
  deletedAt?: number // The UTC timestamp at which the bid was deleted
  tokenInAmount: BigNumber // number of tokens the investor wants to buy
  tokenOutAmount: BigNumber // number of tokens the investor wants to buy
  address: string // The bidder's Ethereum address
}

export interface AuctionToken {
  id: string
  BaseAuction?: BaseAuction // references the BaseAuction
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
export interface EasyAuction extends BaseAuction {
  // Specific to the EasyAuction
  // number of seconds after the endTime of the BaseAuction
  gracePeriodStartDate?: number
  // number of seconds after the endTime of the BaseAuction
  gracePeriodEndDate?: number
  // Total amount of tokens available for BaseAuctioning
  tokenAmount?: number
  // Minimum amount per bid
  minimumBidAmount?: number
  // Bidding token (ie: DAI, USDC)
  tokenIn?: AuctionToken
  // BaseAuctioning token
  tokenOut?: AuctionToken
  // List of bids
  bids: AuctionBid[]
  // The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment
  minFundingThreshold?: number
}

// FixedPriceAuction
export interface FixedPriceAuction extends BaseAuction {
  // Specific to the FixedPriceAuction
  // Amount to sell
  sellAmount?: string
  // Minimum amount per bid
  minbiddingAmount?: number
  minFundingThreshold?: number
  orderCancellationPeriod?: number
  duration?: number
  minBuyAmountPerOrder?: number
  isAtomicClosureAllowed?: Boolean
  bids: AuctionBid[]
}


export type auctionType =  'fixedPriceAuction' | 'easyAuction'

export interface Auction extends FixedPriceAuction, EasyAuction {
  type: auctionType
  startDate: number // Open timestamp
  endDate: number // Close timestamp
}

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
  EasyAuction,
  FixedPriceAuction,
}

export interface BaseAuctionTemplate {
  // TemplatesId from the event
  id: string
  // Address of the BaseAuctionTemplate contract: either EasyAuction or FixedPriceAuction
  address: string
  // Address of the MesaFactory
  factory: string
  // Template name
  name: BaseAuctionTemplateName
  // Exists
  verified: Boolean
}
