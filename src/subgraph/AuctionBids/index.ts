// Externals
import { gql } from 'graphql-request'

// fix this

export const auctionBidsQuery = (auctionid: string, auctionType: 'fixedPriceAuction' | 'easyAuction') => {
  if (auctionType == 'fixedPriceAuction') {
    return gql`
      {
        fixedPriceAuction (id: ${JSON.stringify(auctionid)}) {
       
    bids {
      id
      tokenInAmount
      tokenOutAmount
    }
   }
 }
      `
  }

  return gql`
{
  easyAuction (id: ${JSON.stringify(auctionid)}) {
   
    bids {
      id
      tokenInAmount
      tokenOutAmount
    }
   }
 }
`
}
