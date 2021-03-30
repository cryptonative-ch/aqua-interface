// Externals
import { request, gql } from 'graphql-request'

// subgraph
import { ENDPOINT } from '../index'

const auctionsQuery = gql`
  {
    fixedPriceAuctions {
      id
      name
      createdAt
      updatedAt
      deletedAt
      status
      sellAmount
      minBuyAmount
      minFundingThreshold
      orderCancellationPeriod
      duration
      minBuyAmountPerOrder
      isAtomicClosureAllowed
    }
    easyAuctions {
      id
      name
      createdAt
      updatedAt
      deletedAt
      status
      startTime
      endTime
      gracePeriod
      tokenAmount
      tokenIn {
        id
        auction
        name
        icon
        addressss
        symbol
        decimals
      }
      tokenOut {
        id
        auction
        name
        icon
        addressss
        symbol
        decimals
      }
    }
  }
`

export const auctionsRequest = request(ENDPOINT, auctionsQuery)
