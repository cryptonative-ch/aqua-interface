import { gql } from '@apollo/client'

// Attributes: DRY principles
import {
  FAIR_PRICE_SALE_FIELDS,
  FIXED_PRICE_SALE_FIELDS,
  FIXED_PRICE_SALE_COMMITMENT_ALL,
} from 'src/subgraph/attributes'

export const GET_ALL_SALES = gql`
  query GetAllSales {
    fixedPriceSales {
      ...fixedPriceSaleResults
    }
    fairSales {
      ...fairSaleResults
    }
  }
  ${FIXED_PRICE_SALE_FIELDS}
  ${FAIR_PRICE_SALE_FIELDS}
`

export const GET_SINGLE_SALE = gql`
  query GetSingleSale($saleId: ID!) {
    fixedPriceSale(id: $saleId) {
      ...fixedPriceSaleResults
    }
    fairSale(id: $saleId) {
      ...fairSaleResults
    }
  }
  ${FIXED_PRICE_SALE_FIELDS}
  ${FAIR_PRICE_SALE_FIELDS}
`

export const GET_AQUA_FACTORY = gql`
  query GetAquaFactory {
    aquaFactory(id: "aquaFactory") {
      id
      saleFee
      saleCount
      feeManager
      address
      feeTo
      templateManager
      templateLauncher
      feeNumerator
    }
  }
`

export const GET_FIXED_PRICE_SALE_COMMITMENTS_ALL = gql`
  query GetFixedPriceSaleCommitmentsByUser {
    fixedPriceSaleCommitments {
      ...fixedPriceSaleCommitments
    }
  }
  ${FIXED_PRICE_SALE_COMMITMENT_ALL}
`

export const GET_ALL_BIDS_BY_SALES = gql`
  query GetAllBidsBySales($saleId: ID!) {
    fixedPriceSale(id: $saleId) {
      id
      soldAmount
      commitments {
        id
        amount
        status
        user {
          address
        }
        sale {
          id
          tokenPrice
        }
      }
    }
    fairSale(id: $saleId) {
      id
      bids {
        id
        tokenInAmount
        tokenOutAmount
        sale {
          id
        }
      }
    }
  }
`
