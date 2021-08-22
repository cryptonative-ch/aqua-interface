// Externals
import { IMockStore } from '@graphql-tools/mock'
import casual from 'casual-browserify'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat)

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

# AquaFactory
# Stores critical information the AquaFactory.
# Allows subgraph function to access the AquaFactory without knowing its address
type AquaFactory {
  "ID: should be a unique easy-to-reference from the subgraph"
  id: ID!
  "Number of sales created via the factory"
  saleCount: Int!
  "AquaFactory contract address"
  address: String!
  "Fee manager; CFO"
  feeManager: String!
  "Fee Collector address: DAO/EOA/multisig"
  feeTo: String!
  "Template manager address"
  templateManager: String!
  "TemplateLauncher contract address"
  templateLauncher: String
  "Fee for launching a new sale"
  saleFee: String!
  feeNumerator: String!
  "Fee for launching a new template"
  templateFee: String!
}

#################################################

# FairSale entity
type FairSale implements EntityMetadata {
  "The sale contract address"
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  # Specific to the EasyAuction
  "The sale name"
  name: String
  "Sale status: open/ended/settled/upcoming"
  status: String!
  "Date of the sale start"
  startDate: Int!
  "Date of the sale end"
  endDate: Int!
  "Total amount of tokens available for sale"
  tokensForSale: String!
  "Minimum amount per bid"
  minBidAmount: String!
  "Accepted bidding token (ie: DAI, USDC)"
  tokenIn: Token!
  "Auctioning token"
  tokenOut: Token!
  "The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment"
  minFundingThreshold: Int
  "List of bids"
  bids: [FairSaleBid!]
  launchedTemplate: LaunchedSaleTemplate
}

# FairSaleUser
type FairSaleUser implements EntityMetadata {
  "Time at which the User was registered is the ID"
  id: ID!
  "The FairSale this user is associated with"
  sale: FairSale!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  address: String!
  "The ownerId in the FairSale contract"
  ownerId: Int!
}

# FairSaleBid
type FairSaleBid implements EntityMetadata {
  id: ID!
  "The FairSale the bid is associated with"
  sale: FairSale!
  # submitted/settled/cancelled/claimed
  status: String!
  "The UTC timestamp at which the Bid was placed"
  createdAt: Int!
  "The UTC timestamp at which the Bid was updated"
  updatedAt: Int!
  "The UTC timestamp at which the Bid was deleted"
  deletedAt: Int
  "Number of tokens the investor wants to invest"
  tokenInAmount: String!
  "Number of tokens the investor wants to buy"
  tokenOutAmount: String!
  "The owner of the Bid"
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
  "The name of the sale, default is the tokenIn's name"
  name: String!
  "Sale status: open/ended/settled/upcoming/cancelled/failed"
  status: FixedPriceSaleStatus!
  "The UTC timestamp at which the sale starts"
  startDate: Int! # Open timestamp
  "The UTC timestamp at which the sale closes"
  endDate: Int! # Close timestamp
  "Token price"
  tokenPrice: String!
  "Amount of tokens to sell"
  sellAmount: String!
  "Amount of tokens sold so far"
  soldAmount: String!
  # Minimum amount per bid
  minRaise: String!
  "Minimum token amount per commitment"
  minCommitment: String!
  "Maximum token amount per commitment"
  maxCommitment: String!
  "Token investors can use to bid"
  tokenIn: Token!
  "Token investor get"
  tokenOut: Token!
  "List of sale commitments"
  commitments: [FixedPriceSaleCommitment!]
  "List of users"
  users: [FixedPriceSaleUser!]
  "List of withdrawals"
  withdrawals: [FixedPriceSaleWithdrawal!]
  launchedTemplate: LaunchedSaleTemplate
}

enum FixedPriceSaleCommitmentStatus {
  SUBMITTED
  RELEASED
  CLAIMED
}

type FixedPriceSaleCommitment implements EntityMetadata {
  "The commitment ID"
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  "FixedPriceSale this commitment is associated with"
  sale: FixedPriceSale!
  "Address of buyer"
  user: FixedPriceSaleUser!
  "Amount of tokens"
  amount: String!
  status: FixedPriceSaleCommitmentStatus!
}

# Withdrawal track the tokens that have been withdrawn
type FixedPriceSaleWithdrawal implements EntityMetadata {
  "The withdrawal ID"
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  "FixedPriceSale this withdrawal is associated with"
  sale: FixedPriceSale!
  "Address of buyer"
  user: FixedPriceSaleUser!
  "Amount of tokens"
  amount: String!
  status: FixedPriceSaleCommitmentStatus!
}

type FixedPriceSaleUser implements EntityMetadata {
  "The user's ID <saleAddress>/users/<saleUserAddress>"
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  "Total commitments submitted in the sale"
  totalCommitment: Int!
  "Total volume for this user"
  totalVolume: String!
  "FixedPriceSale reference"
  sale: FixedPriceSale!
  "Address of buyer"
  address: String!
}

#################################################

# Token
type Token {
  "Token address"
  id: ID!
  "Token name, from the smart contract ERC20.name()"
  name: String
  "The token symbol from ERC20.symbol()"
  symbol: String
  "The token decimals, from ERC.decimals()"
  decimals: String!
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
  # Address of the AquaFactory
  factory: String!
  # Template name
  name: SaleTemplateNames!
  verified: Boolean!
}

# Sale Templates
# Each Sale contract implements a template
type LaunchedSaleTemplate {
  # TemplatesId from the event
  id: ID!
  createdAt: Int!
  updatedAt: Int!
  deletedAt: Int
  # Address of the SaleTemplate contract: either EasyAuction or FixedPriceSale
  address: String!
  factory: AquaFactory!
  template: SaleTemplate!
  metadataContentHash: String
}

enum SaleTemplateNames {
  FairSaleTemplate
  FixedPriceSaleTemplate
}

# AquaLog beacuses The Graph internal logging does not work
type AquaLog {
  id: ID!
  content: String!
}

type Query {
  fairSales: [FairSale]
  fixedPriceSales: [FixedPriceSale]
  fairSale (id: ID): FairSale
  fixedPriceSale (id: ID): FixedPriceSale
  fixedPriceSaleCommitments: [FixedPriceSaleCommitment]
}
`

const address = '0x###D####b########d###aA##e###c##eF##EE#c'
const fixedPriceSaleAddress = '0x257D5402b01056764d985aA44e154c07eF23EE6c'
const fairSaleAddress = '0x092D3639b03826862d947aA58e031c79eF76EE9c'

const bigDecimal = '#######00000000000000'

const metadataContentHash = 'bafybeibozpgzagp4opgu5ugmja2hpwdnyh675ofi44xobizpyr5gzqrxnu'

const oneDayAgo = dayjs().subtract(1, 'day').format("X");
const oneDayLater = dayjs().add(1, 'day').format("X");

export const preserveResolvers = false

export const mocks = {
  ID: () => casual.numerify(address),
  Int: () => casual.integer(1, 1000),
  String: () => casual.name,
  Boolean: () => casual.boolean,
  FairSale: () => ({
    id: fairSaleAddress,
    status: casual.random_element(['UPCOMING', 'FAILED', 'SETTLED', 'CLOSED', 'OPEN']),
    name: casual.company_name,
    createdAt: casual.unix_time,
    updatedAt: casual.unix_time,
    deletedAt: casual.unix_time,
    startDate: oneDayAgo,
    endDate: oneDayLater,
    tokensForSale: casual.numerify(bigDecimal),
    minBidAmount: casual.numerify(bigDecimal),
    minFundingThreshold: casual.integer(1, 1000),
    bids: [...new Array(1)],
  }),
  FixedPriceSale: () => ({
    id: fixedPriceSaleAddress,
    name: casual.company_name,
    createdAt: casual.unix_time,
    updatedAt: casual.unix_time,
    deletedAt: casual.unix_time,
    startDate: oneDayAgo,
    endDate: oneDayLater,
    sellAmount: casual.numerify(bigDecimal),
    minRaise: casual.numerify(bigDecimal),
    minCommitment: casual.numerify(bigDecimal),
    maxCommitment: casual.numerify(bigDecimal),
    tokenPrice: casual.numerify(bigDecimal),
    soldAmount: casual.numerify(bigDecimal),
    commitments: [...new Array(1)],
    users: [...new Array(1)],
    withdrawals: [...new Array(1)],
  }),
  FairSaleUser: () => ({
    createdAt: casual.unix_time,
    updatedAt: casual.unix_time,
    deletedAt: casual.unix_time,
    address: casual.numerify(address),
    ownerId: casual.integer(1, 1000),
  }),
  FairSaleBid: () => ({
    createdAt: casual.unix_time,
    updatedAt: casual.unix_time,
    deletedAt: casual.unix_time,
    status: casual.random_element(['submitted', 'cancelled', 'settled', 'claimed']),
    tokenInAmount: casual.numerify(bigDecimal),
    tokenOutAmount: casual.numerify(bigDecimal),
  }),
  FixedPriceSaleUser: () => ({
    createdAt: casual.unix_time,
    updatedAt: casual.unix_time,
    deletedAt: casual.unix_time,
    totalCommitment: casual.integer(1, 10),
    totalVolume: casual.numerify(bigDecimal),
    address: casual.numerify(address),
  }),
  FixedPriceSaleCommitment: () => ({
    createdAt: casual.unix_time,
    updatedAt: casual.unix_time,
    deletedAt: casual.unix_time,
    amount: casual.numerify(bigDecimal),
  }),
  FixedPriceSaleWithdrawal: () => ({
    createdAt: casual.unix_time,
    updatedAt: casual.unix_time,
    deletedAt: casual.unix_time,
    amount: casual.numerify(bigDecimal),
  }),
  LaunchedSaleTemplate: () => ({
    createdAt: casual.unix_time,
    updatedAt: casual.unix_time,
    deletedAt: casual.unix_time,
    address: casual.numerify(address),
    metadataContentHash: metadataContentHash,
  }),
  Token: () => ({
    id: casual.numerify(address),
    name: casual.company_name,
    symbol: casual.state_abbr,
    decimals: casual.integer(1, 18),
  }),
  Query: () => ({
    fairSales: [...new Array(1)],
    fixedPriceSales: [...new Array(1)],
    fixedPriceSaleCommitments: [...new Array(1)],
  }),
}

export const resolvers = (store: IMockStore) => ({
  FairSale: {
    tokenIn: () => store.get('Token', { decimals: 18 }),
    tokenOut: () => store.get('Token', { decimals: 18 }),
  },
  FixedPriceSale: {
    tokenIn: () => store.get('Token', { decimals: 18 }),
    tokenOut: () => store.get('Token', { decimals: 18 })
  },
  Query: {
    fixedPriceSale: (_: any, { id }: { id: string }) => {
      return id == fixedPriceSaleAddress ? store.get('FixedPriceSale', id) : null
    },
    fairSale: (_: any, { id }: { id: string }) => {
      return id == fairSaleAddress ? store.get('FairSale', id) : null
    },
  },
})
