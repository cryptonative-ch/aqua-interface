// Externals
import { request, gql } from 'graphql-request'






const ENDPOINT = "http://localhost:8000/subgraphs/name/adamazad/mesa/graphql"





const auctionsQuery = gql`{
    auctions {
      id
      createdAt
      updatedAt
      deletedAt
      status
      startTime
      endTime
      gracePeriod
      tokenAmount
    }
  }

`

export const auctionsRequest = request(ENDPOINT, auctionsQuery)