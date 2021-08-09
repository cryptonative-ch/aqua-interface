// Externals
import { gql } from '@apollo/client'
// FixedPriceSale Attributes

export const TOKEN_FIELDS = gql`
  fragment tokenResults on Token {
    id
    name
    symbol
    decimals
  }
`

export const FIXED_PRICE_SALE_FIELDS = gql`
  fragment fixedPriceSaleResults on FixedPriceSale {
    id
    name
    createdAt
    updatedAt
    deletedAt
    status
    startDate
    endDate
    soldAmount
    sellAmount
    minRaise
    minCommitment
    maxCommitment
    tokenPrice
    tokenIn {
      ...tokenResults
    }
    tokenOut {
      ...tokenResults
    }
  }
  ${TOKEN_FIELDS}
`

export const FAIR_PRICE_SALE_FIELDS = gql`
  fragment fairSaleResults on FairSale {
    id
    name
    createdAt
    updatedAt
    deletedAt
    status
    startDate
    endDate
    tokensForSale
    minBidAmount
    minFundingThreshold
    tokenIn {
      ...tokenResults
    }
    tokenOut {
      ...tokenResults
    }
  }
  ${TOKEN_FIELDS}
`

export const FIXED_PRICE_SALE_USERS = gql`
  fragment fixedPriceSaleUsers on FixedPriceSaleUser {
    id
    createdAt
    updatedAt
    deletedAt
    totalCommitment
    totalVolume
    sale {
      ...fixedPriceSaleResults
    }
    address
  }
  ${FIXED_PRICE_SALE_FIELDS}
`
export const FIXED_PRICE_SALE_COMMITMENT_ALL = gql`
  fragment fixedPriceSaleCommitments on FixedPriceSaleCommitment {
    id
    createdAt
    updatedAt
    deletedAt
    user {
      ...fixedPriceSaleUsers
    }
    amount
    status
    sale {
      ...fixedPriceSaleResults
    }
  }
  ${FIXED_PRICE_SALE_FIELDS}
  ${FIXED_PRICE_SALE_USERS}
`
