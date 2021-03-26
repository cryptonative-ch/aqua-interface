// Externals
import { request, gql } from 'graphql-request'


// subgraph 
import { ENDPOINT } from "../index";











const auctionsQuery = gql`{
    auctions {
      id
      createdAt
      updatedAt
      deletedAt
      status
      startBlock:startTime
      endBlock:endTime
      gracePeriod
      tokenAmount
      tokenIn
      tokenOut
    }
  }

`

export const auctionsRequest = request(ENDPOINT, auctionsQuery)