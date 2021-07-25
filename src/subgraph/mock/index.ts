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
  # The UTC timestamp at which the auction was placed
  createdAt: Int!
  # The UTC timestamp at which the auction was updated
  updatedAt: Int!
  # The UTC timestamp at which the auction was deleted
  deletedAt: Int
}

#################################################

# MesaFactory
# Stores critical information the MesaFactory.
# Allows subgraph function to access the MesaFactory without knowing its address
type MesaFactory {
  # ID: should be a unique easy-to-reference from the subgraph
  id: ID!
  # Number of sales created via the factory
  saleCount: Int!
  # MesaFactory contract address
  address: String!
  # Fee manager; CFO
  feeManager: String!
  # Fee Collector address: DAO/EOA/multisig
  feeTo: String!
  # Template manager address
  templateManager: String!
  # TemplateLauncher contract address
  templateLauncher: String!
  # Fee for launching a new sale
  saleFee: Int!
  feeNumerator: Int!
  # Fee for luanching a new Template fee
  templateFee: Int!
}

#################################################

# FairSale entity
type FairSale implements EntityMetadata {
  # The sale contract address
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  # Specific to the EasyAuction
  # The sale name
  name: String
  # Sale status: open/ended/settled/upcoming
  status: String!
  # Date of the sale start
  startDate: Int!
  # Date of the sale end
  endDate: Int!
  # Total amount of tokens available for sale
  tokensForSale: String!
  # Minimum amount per bid
  minimumBidAmount: String!
  # Accepted bidding token (ie: DAI, USDC)
  tokenIn: Token!
  # Auctioning token
  tokenOut: Token!
  # The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment
  minFundingThreshold: Int
  # List of bids
  bids: [FairSaleBid!]
}

# FairSaleUser
type FairSaleUser implements EntityMetadata {
  # Time at which the User was registered is the ID
  id: ID!
  # The FairSale this user is associated with
  sale: FairSale!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  address: String!
  # The ownerId in the FairSale contract
  ownerId: Int!
}

# FairSaleBid
type FairSaleBid implements EntityMetadata {
  id: ID!
  # The FairSale the bid is associated with
  sale: FairSale!
  # submitted/settled/cancelled/claimed
  status: String!
  # The UTC timestamp at which the Bid was placed
  createdAt: Int!
  # The UTC timestamp at which the Bid was updated
  updatedAt: Int!
  # The UTC timestamp at which the Bid was deleted
  deletedAt: Int
  # Number of tokens the investor wants to invest
  tokenInAmount: String!
  # Number of tokens the investor wants to buy
  tokenOutAmount: String!
  # The owner of the Bid"
  owner: FairSaleUser!
}

#################################################

enum FixedPriceSaleStatus {
  UPCOMING
  SETTLED
  ENDED
  OPEN
}

# FixedPriceSale
type FixedPriceSale implements EntityMetadata {
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  # The name of the same, default is the tokenIn's name
  name: String!
  # Sale status: open/ended/settled/upcoming/cancelled/failed
  status: FixedPriceSaleStatus!
  # The UTC timestamp at which the sale starts
  startDate: Int! # Open timestamp
  # The UTC timestamp at which the sale closes
  endDate: Int! # Close timestamp
  # Token price
  tokenPrice: String!
  # Amount of tokens to sell
  sellAmount: String!
  # Amount of tokens sold so far
  soldAmount: String!
  # Minimum amount per bid
  minimumRaise: String!
  # Minimum token amount per purchase
  allocationMin: String!
  # Maximum token amount per purchase
  allocationMax: String!
  # Token investors can use to bid
  tokenIn: Token!
  # Token investor get
  tokenOut: Token!
  # List of sale purchases
  purchases: [FixedPriceSalePurchase!]
}

enum FixedPriceSalePurchaseStatus {
  SUBMITTED
  CLAIMED
}

type FixedPriceSalePurchase implements EntityMetadata {
  # The purchase ID
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  # FixedPriceSale this purchase is associated with
  sale: FixedPriceSale!
  # Address of buyer
  buyer: String!
  # Amount of tokens
  amount: String!
  status: FixedPriceSalePurchaseStatus!
}

type FixedPriceSaleUser implements EntityMetadata {
  # The user's ID <saleAddress>/users/<saleUserAddress>
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  # Total purchases submitted in the sale
  totalPurchase: String!
  # Total volume for this user
  totalVolume: String!
  # FixedPriceSale reference
  sale: FixedPriceSale!
  # Address of buyer
  address: String!
}

#################################################

# Token
type Token {
  # Token address
  id: ID!
  # Token name, from the smart contract ERC20.name()
  name: String
  # The token symbol from ERC20.symbol()
  symbol: String
  # The token decimals, from ERC.decimals()
  decimals: Int!
}

#################################################

# Sale Templates
# Each Sale contract implements a template
type SaleTemplate {
  # TemplatesId from the event
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  # Address of the SaleTemplate contract: either EasyAuction or FixedPriceSale
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
type MesaLog {
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

const bigDecimal = '#####################'

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
    startDate: () => casual.random_element([1621366543]),
    endDate: () => casual.random_element([1621373743]),
    tokensForSale: () => casual.numerify(bigDecimal),
    minimumBidAmount: () => casual.numerify(bigDecimal),
    tokenIn: () => ({
      decimals: () => 18,
    }),
    tokenOut: () => ({
      decimals: () => 18,
    }),
    minFundingThreshold: () => casual.numerify(bigDecimal),
    bids: () => new MockList(5),
  }),
  FixedPriceSale: () => ({
    id: () => '0x257D5402b01056764d985aA44e154c07eF23EE6c',
    name: () => casual.company_name,
    createdAt: () => casual.unix_time,
    updatedAt: () => casual.unix_time,
    deletedAt: () => casual.unix_time,
    startDate: () => casual.random_element([1621366543]),
    endDate: () => casual.random_element([1623227147]),
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
    purchases: () => new MockList(5),
  }),
  FairSaleUser: () => ({
    id: casual.unix_time,
    createdAt: casual.unix_time,
    updatedAt: casual.unix_time,
    deletedAt: casual.unix_time,
    address: casual.numerify(address),
    ownerId: () => casual.integer(1, 1000),
  }),
  FairSaleBid: () => ({
    createdAt: () => casual.unix_time,
    updatedAt: () => casual.unix_time,
    deletedAt: () => casual.unix_time,
    status: () => casual.random_element(['submitted', 'cancelled', 'settled', 'claimed']),
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
    id: () => casual.numerify(address),
    name: () => casual.company_name,
    symbol: () => casual.state_abbr,
    decimals: () => casual.integer(1, 18),
  }),
  Query: () => ({
    fairSales: () => new MockList(1),
    fixedPriceSales: () => new MockList(1),
  }),
}
