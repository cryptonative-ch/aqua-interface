// Externals
import { gql } from 'graphql-request'




export const auctionBidsQuery = (Id: string, auctionType: 'fixedPriceAuction' | 'easyAuction') => {
  if (auctionType == 'fixedPriceAuction') {
    
    return gql`
    @live 
    # live queries turning these into pseudo subscriptions
    # live queries observe data and update based on that
    # subscriptions update based on certain events
      {
        fixedPriceAuction (id: ${Id}) {
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
  easyAuction (id: ${Id}) {
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


