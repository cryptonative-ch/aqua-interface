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
      tokenInAmount

      minFundingThreshold
      orderCancellationPeriod
      duration
      mintokenOutAmountPerOrder
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

export const auctionsRequest = request('http://localhost:8000/subgraphs/name/adamazad/mesa', auctionsQuery)
