// Externals
import { request, gql } from 'graphql-request'






const ENDPOINT = "http://localhost:8000/subgraphs/name/adamazad/mesa"





const auctionBidsQuery = gql`{
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
      bids {
         id
      createdAt
      updatedAt
      deletedAt
      status
        tokenInAmount
        tokenOutAmount
        address
      }
    }
  }


`

export const auctionBidsRequest = request(ENDPOINT, auctionBidsQuery)