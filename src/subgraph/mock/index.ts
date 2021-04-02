// Externals
import { mockServer } from 'graphql-tools'
import casual from 'casual-browserify'
import { graphql } from 'graphql'

// schema

const schema = `  
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
  type EasyAuction implements Auction @entity {
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
  type FixedPriceAuction implements Auction @entity {
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
    # Minimum amount per bid
    minbiddingAmount: Int
    minFundingThreshold: Int
    orderCancellationPeriod: Int
    duration: Int
    minBuyAmountPerOrder: Int
    isAtomicClosureAllowed: Boolean
    bids: [FixedPriceAuctionPurchase!]
  }
  
  # AuctionBid
  type EasyAuctionBid @entity {
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
    tokenInAmount: Int
    # Int of tokens the investor wants to buy
    tokenOutAmount: Int
    # The bidder's Ethereum address
    address: String
  }
  
  type FixedPriceAuctionPurchase @entity {
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
  type AuctionToken @entity {
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
  
 
`
const address = '0x###D####b########d###aA##e###c##eF##EE#c'
const symbol = '###'

const preserveResolvers = false

const mocks = {
  ID: () => casual.numerify(address),
  int: () => casual.integer(1, 1000),
  String: () => casual.name,
  Boolean: () => casual.boolean,
  EasyAuction: () => ({
    name: () => casual.company_name,
    createdAt: () => casual.unix_time,
    updatedAt: () => casual.unix_time,
    deletedAt: () => casual.unix_time,
    startDate: () => casual.unix_time,
    endDate: () => casual.unix_time,
  }),
  FixedPriceAuction: () => ({
    name: () => casual.company_name,
    createdAt: () => casual.unix_time,
    updatedAt: () => casual.unix_time,
    deletedAt: () => casual.unix_time,
    startDate: () => casual.unix_time,
    endDate: () => casual.unix_time,
    sellAmount: () => casual.integer(1, 100).toString(),
  }),
  EasyAuctionBid: () => ({
    status: () => casual.random_element(['live', 'upcoming', 'closed']),
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
  }),
}

const server = mockServer(schema, mocks, preserveResolvers)

server.query(`
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
      sellAmount
      minbiddingAmount
      minBuyAmountPerOrder
      minFundingThreshold
      orderCancellationPeriod
      duration
      isAtomicClosureAllowed
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
`)
