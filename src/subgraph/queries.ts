import { gql } from '@apollo/client'

export const GET_ALL_SALES = gql`
  query GetAllSales {
    fixedPriceSales {
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
      soldAmount
      minimumRaise
      allocationMin
      allocationMax
      tokenPrice
    }
    fairSales {
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

export const GET_MESA_FACTORY = gql`
  query GetMesaFactory {
    mesaFactory(id: "MesaFactory") {
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
