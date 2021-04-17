//subgraph
import { ENDPOINT, subgraphCall } from 'src/subgraph/index'

const auctionsQuery = `
  {
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

export const auctionsRequest = subgraphCall(ENDPOINT, auctionsQuery)
