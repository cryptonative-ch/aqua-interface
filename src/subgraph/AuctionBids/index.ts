// Externals
import { gql } from 'graphql-request'

// no subscriptions
// switch to long polling

export const auctionBidsQuery = (auctionid: string, auctionType: 'fixedPriceAuction' | 'easyAuction') => {
  if (auctionType == 'fixedPriceAuction') {
    return gql`
    @live 
  
      {
        fixedPriceAuction (id: ${auctionid}) {
          id
    bids {
      id
      status
      createdAt
      updatedAt
      deletedAt
      tokenInAmount
      tokenOutAmount
      address
    }
   }
 }
      `
  }

  return gql`
  @live 
{
  easyAuction (id: ${auctionid}) {
    id
    bids {
      id
      status
      createdAt
      updatedAt
      deletedAt
      tokenInAmount
      tokenOutAmount
      address
    }
   }
 }
`
}
