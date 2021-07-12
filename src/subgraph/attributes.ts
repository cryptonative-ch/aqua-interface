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
    minimumRaise
    allocationMin
    allocationMax
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
    tokenAmount
    minimumBidAmount
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

export const FIXED_PRICE_SALE_PURCHASE_FIELDS = gql`
  fragment fixedPriceSalePurchaseResults on FixedPriceSalePurchase {
    id
    createdAt
    updatedAt
    deletedAt
    buyer
    amount
    sale {
      id
    }
  }
`

export const FIXED_PRICE_SALE_PURCHASE_ALL = gql`
  fragment fixedPriceSalePurchaseResultsAll on FixedPriceSalePurchase {
    id
    createdAt
    updatedAt
    deletedAt
    buyer
    amount
    sale {
      ...fixedPriceSaleResults
    }
  }
  ${FIXED_PRICE_SALE_FIELDS}
`
