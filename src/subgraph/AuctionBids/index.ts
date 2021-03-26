// Externals
import { request, gql } from 'graphql-request'

// subgraph 
import { ENDPOINT } from "../index";





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