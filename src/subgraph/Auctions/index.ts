// Externals
import { request, gql } from 'graphql-request'






const ENDPOINT = "http://localhost:8000/subgraphs/name/adamazad/mesa"





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
      bids {
        address:id
     createdAt
     updatedAt
     deletedAt
     status
       sellAmount:tokenInAmount
       buyAmount:tokenOutAmount
      
     }
    }
  }

`

export const auctionsRequest = request(ENDPOINT, auctionsQuery)