// Externals
import { MockList } from 'graphql-tools'
import casual from 'casual-browserify'

// schema

export const schemaString = `  
# EntityMetadata
# Enforces important fields on each entity that implement this interface
interface EntityMetadata {
  # Contract address
  id: ID!
  # The UTC timestamp at which the sale was placed
  createdAt: Int!
  # The UTC timestamp at which the sale was updated
  updatedAt: Int!
  # The UTC timestamp at which the sale was deleted
  deletedAt: Int
}

#################################################

# MesaFactory
# Stores critical information the MesaFactory.
# Allows subgraph function to access the MesaFactory without knowing its address
type MesaFactory  {
  # ID: should be a unique easy-to-reference
  id: ID!
  # Sale
  saleCount: Int!
  # Factory address
  address: String!
  # Fee manager: CFO
  feeManager: String!
  # Fee Collector: Treasury
  feeTo: String!
  # Template manager:
  templateManager: String!
  # Address of TemplateLauncher contract
  templateLauncher: String!
  # Fees
  saleFee: Int!
  feeNumerator: Int!
  templateFee: Int!
}

#################################################

# FairSale entity
type FairSale implements EntityMetadata  {
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  # Specific to the EasySale
  # The sale name
  name: String
  # open/ended/settled/upcoming
  status: String!
  # Date of the sale start
  startDate: Int!
  # Date of the sale end
  endDate: Int!
  # Total amount of tokens available for sale
  tokenAmount: String!
  # Minimum amount per bid
  minimumBidAmount: String!
  # Bidding token (ie: DAI, USDC)
  tokenIn: Token!
  # Saleing token
  tokenOut: Token!
  # List of bids
  # The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment
  minFundingThreshold: Int
  bids: [FairSaleBid!]
}

# SaleBid
type FairSaleBid implements EntityMetadata  {
  id: ID!
  # Address of sale this bid is associated with
  sale: FairSale!
  # submitted/settled/cancelled/claimed
  status: String!
  # The UTC timestamp at which the bid was placed
  createdAt: Int!
  # The UTC timestamp at which the bid was updated
  updatedAt: Int!
  # The UTC timestamp at which the bid was deleted
  deletedAt: Int
  # Int of tokens the investor wants to buy
  tokenInAmount: String!
  # Int of tokens the investor wants to buy
  tokenOutAmount: String!
  # The bidder's Ethereum address
  address: String!
}

#################################################

# FixedPriceSale
type FixedPriceSale implements EntityMetadata  {
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  # The sale name
  name: String!
  # open/ended/settled/upcoming/cancelled/failed
  status: String!
  # Specific to the FixedPriceSale
  startDate: Int! # Open timestamp
  endDate: Int! # Close timestamp
  # Amount to sell
  sellAmount: String!
  tokenPrice: String!
  soldAmount: String!
  # Minimum amount per bid
  minimumRaise: String!
  # Minimum and maxmimum token per order
  allocationMin: String!
  allocationMax: String!
  # bidding and sale tokens
  tokenIn: Token!
  tokenOut: Token!
  purchases: [FixedPriceSalePurchase!] 
}

type FixedPriceSalePurchase implements EntityMetadata  {
  # Meta
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  # Address of sale this bid is associated with
  sale: FixedPriceSale!
  # Address of buyer
  buyer: String!
  # Amount this purchase took
  amount: String!
}

#################################################

# Token
type Token  {
  # Token address
  id: ID!
  # Token name, from the smart contract ERC20.name()
  name: String
  # Symbol, from ERC20.symbol()
  symbol: String
  # Decimal, from ERC.decimals()
  decimals: Int!
  icon: String
}

#################################################

type SaleUser  {
  # User id
  id: ID!
  # The bidder's Ethereum address
  address: String
}

#################################################

# Sale Templates
# Each Sale contract implements a template
type SaleTemplate  {
  # TemplatesId from the event
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  # Address of the SaleTemplate contract: either EasySale or FixedPriceSale
  address: String!
  # Address of the MesaFactory
  factory: String!
  # Template name
  name: SaleTemplateNames!
  verified: Boolean!
}

enum SaleTemplateNames {
  FairSaleTemplate
  FixedPriceSaleTemplate
}

# MesaLog beacuses The Graph internal logging does not work
type MesaLog  {
  id: ID!
  content: String!
}

type Query {
  fairSales (id: ID): [FairSale]
  fixedPriceSales (id: ID): [FixedPriceSale]
  fairSale (id: ID): FairSale
  fixedPriceSale (id: ID): FixedPriceSale
}
`
const address = '0x###D####b########d###aA##e###c##eF##EE#c'

const bigDecimal = '###.##################'

export const preserveResolvers = false

export const mocks = {
  ID: () => casual.numerify(address),
  Int: () => casual.integer(1, 1000),
  String: () => casual.name,
  Boolean: () => casual.boolean,
  FairSale: () => ({
    id: () => '0x092D3639b03826862d947aA58e031c79eF76EE9c',
    status: () => casual.random_element(['live', 'upcoming', 'closed']),
    name: () => casual.company_name,
    createdAt: () => casual.unix_time,
    updatedAt: () => casual.unix_time,
    deletedAt: () => casual.unix_time,
    startDate: () => casual.random_element([1586276387, 1583601587]),
    endDate: () => casual.random_element([1646673587, 1644254387]),
    tokenAmount: () => casual.numerify(bigDecimal),
    minimumBidAmount: () => casual.numerify(bigDecimal),
    tokenIn: () => ({
      decimals: () => 18,
    }),
    tokenOut: () => ({
      decimals: () => 18,
    }),
  }),
  FixedPriceSale: () => ({
    id: () => '0x257D5402b01056764d985aA44e154c07eF23EE6c',
    status: () => casual.random_element(['live', 'upcoming', 'closed']),
    name: () => casual.company_name,
    createdAt: () => casual.unix_time,
    updatedAt: () => casual.unix_time,
    deletedAt: () => casual.unix_time,
    startDate: () => casual.random_element([1586276387, 1583601587]),
    endDate: () => casual.random_element([1646673587, 1644254387]),
    sellAmount: () => casual.numerify(bigDecimal),
    minimumRaise: () => casual.numerify(bigDecimal),
    allocationMin: () => casual.numerify(bigDecimal),
    allocationMax: () => casual.numerify(bigDecimal),
    tokenPrice: () => casual.numerify(bigDecimal),
    soldAmount: () => casual.numerify(bigDecimal),
    tokenIn: () => ({
      decimals: () => 18,
    }),
    tokenOut: () => ({
      decimals: () => 18,
    }),
  }),
  FairSaleBid: () => ({
    createdAt: () => casual.unix_time,
    updatedAt: () => casual.unix_time,
    deletedAt: () => casual.unix_time,
    address: () => casual.numerify(address),
    tokenInAmount: () => casual.numerify(bigDecimal),
    tokenOutAmount: () => casual.numerify(bigDecimal),
  }),
  FixedPriceSalePurchase: () => ({
    createdAt: () => casual.unix_time,
    updatedAt: () => casual.unix_time,
    deletedAt: () => casual.unix_time,
    buyer: () => casual.numerify(address),
    amount: () => casual.numerify(bigDecimal),
  }),
  Token: () => ({
    address: () => casual.numerify(address),
    name: () => casual.company_name,
    symbol: () => casual.state_abbr,
    decimals: () => casual.integer(1, 18),
  }),
  Query: () => ({
    fairSales: () => new MockList(1),
    fixedPriceSales: () => new MockList(1),
  }),
}
