//subgraph
import { ENDPOINT, subgraphCall } from 'src/subgraph/index'

const auctionsQuery = `
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
      tokenInAmount
      minbiddingAmount
      mintokenOutAmountPerOrder
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
`

export const auctionsRequest = subgraphCall(ENDPOINT, auctionsQuery)
