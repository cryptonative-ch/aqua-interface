// Externals
import { MockList } from 'graphql-tools'
import casual from 'casual-browserify'

// schema

export const schemaString = `  
  # Base Auction schema
  interface Auction {
    # Contract address
    id: ID!
    # The auction name
    name: String
    # The UTC timestamp at which the auction was placed
    createdAt: Int!
    # The UTC timestamp at which the auction was updated
    updatedAt: Int
    # The UTC timestamp at which the auction was deleted
    deletedAt: Int
    # open/ended/settled/upcoming
    status: String
  }
  
  # EasyAuction entity
  type EasyAuction implements Auction  {
    # Base fields from Auction interface
    id: ID!
    name: String
    createdAt: Int!
    updatedAt: Int
    deletedAt: Int
    status: String
    # Specific to the EasyAuction
    startDate: Int # Open timestamp
    endDate: Int # Close timestamp
    # Int of seconds after the endTime of the auction
    gracePeriodStartDate: Int
    # Int of seconds after the endTime of the auction
    gracePeriodEndDate: Int
    # Total amount of tokens available for auctioning
    tokenAmount: Int
    # Minimum amount per bid
    minimumBidAmount: Int
    # Bidding token (ie: DAI, USDC)
    tokenIn: AuctionToken
    # Auctioning token
    tokenOut: AuctionToken
    # List of bids
    bids: [EasyAuctionBid!]
    # The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment
    minFundingThreshold: Int
  }
  
  # FixedPriceAuction
  type FixedPriceAuction implements Auction  {
    # Base fields from Auction interface
    id: ID!
    name: String
    createdAt: Int!
    updatedAt: Int
    deletedAt: Int
    status: String
    # Specific to the FixedPriceAuction
    startDate: Int # Open timestamp
    endDate: Int # Close timestamp
    # Amount to sell
    sellAmount: String
    tokenIn: AuctionToken
    tokenOut: AuctionToken
    # Minimum amount per bid
    minbiddingAmount: Int
    allocationMin: Int
    allocationMax: Int
    bids: [EasyAuctionBid!]
  }
  
  # AuctionBid
  type EasyAuctionBid  {
    id: ID!
    # submitted/settled/cancelled/claimed
    status: String
    # The UTC timestamp at which the bid was placed
    createdAt: Int
    # The UTC timestamp at which the bid was updated
    updatedAt: Int
    # The UTC timestamp at which the bid was deleted
    deletedAt: Int
    # Int of tokens the investor wants to buy
    tokenIn: Int
    # Int of tokens the investor wants to buy
    tokenOut: Int
    # The bidder's Ethereum address
    address: String
  }
  
  type FixedPriceAuctionPurchase  {
    id: ID!
    # The UTC timestamp at which the bid was placed
    createdAt: Int
    # The UTC timestamp at which the bid was updated
    updatedAt: Int
    # The UTC timestamp at which the bid was deleted
    deletedAt: Int
    # The amount paid by the buyer
    amount: Int
    # The buyer address EOA
    buyer: String
  }
  
  # AuctionToken
  type AuctionToken  {
    # Token address
    id: ID!
    # Token name, from the smart contract ERC20.name()
    name: String
    # ERC20 Token's contract address
    address: String
    # Symbol, from ERC20.symbol()
    symbol: String
    # Decimal, from ERC.decimals()
    decimals: Int
  }

  type Query {
    easyAuctions (id: ID): [EasyAuction]
    fixedPriceAuctions (id: ID): [FixedPriceAuction]
    easyAuction (id: ID): EasyAuction
    fixedPriceAuction (id: ID): FixedPriceAuction
  }
`
const address = '0x###D####b########d###aA##e###c##eF##EE#c'

export const preserveResolvers = false

export const mocks = {
  ID: () => casual.numerify(address),
  Int: () => casual.integer(1, 1000),
  String: () => casual.name,
  Boolean: () => casual.boolean,
  EasyAuction: () => ({
    status: () => casual.random_element(['live', 'upcoming', 'closed']),
    name: () => casual.company_name,
    createdAt: () => casual.unix_time,
    updatedAt: () => casual.unix_time,
    deletedAt: () => casual.unix_time,
    startDate: () => casual.random_element([1586276387, 1583601587]),
    endDate: () => casual.random_element([1646673587, 1644254387]),
    tokenAmount: () => casual.integer(1, 1000),
  }),
  FixedPriceAuction: () => ({
    status: () => casual.random_element(['live', 'upcoming', 'closed']),
    name: () => casual.company_name,
    createdAt: () => casual.unix_time,
    updatedAt: () => casual.unix_time,
    deletedAt: () => casual.unix_time,
    startDate: () => casual.random_element([1586276387, 1583601587]),
    endDate: () => casual.random_element([1646673587, 1644254387]),
    sellAmount: () => casual.integer(1, 100).toString(),
  }),
  EasyAuctionBid: () => ({
    createdAt: () => casual.unix_time,
    updatedAt: () => casual.unix_time,
    deletedAt: () => casual.unix_time,
    address: () => casual.numerify(address),
  }),
  FixedPriceAuctionPurchase: () => ({
    createdAt: () => casual.unix_time,
    updatedAt: () => casual.unix_time,
    deletedAt: () => casual.unix_time,
    buyer: () => casual.numerify(address),
  }),
  AuctionToken: () => ({
    address: () => casual.numerify(address),
    name: () => casual.company_name,
    symbol: () => casual.state_abbr,
    decimals: () => casual.integer(1, 18),
  }),
  Query: () => ({
    easyAuctions: () => new MockList(3),
    fixedPriceAuctions: () => new MockList(3),
  }),
}

export const queryAuctions = `
{
    fixedPriceAuctions {
      id
      name
      createdAt
      updatedAt
      deletedAt
      status
      startDate
      endDate
      tokenIn {
        id
        name
        symbol
        decimals
      }
      tokenOut {
        id
        name
        symbol
        decimals
      }
      sellAmount
      minbiddingAmount
      allocationMin
      allocationMax
    }
    easyAuctions {
      id
      name
      createdAt
      updatedAt
      deletedAt
      status
      startDate
      endDate
      tokenAmount
      tokenIn {
        id
        name
        symbol
        decimals
      }
      tokenOut {
        id
        name
        symbol
        decimals
      }
    }
  }
`
