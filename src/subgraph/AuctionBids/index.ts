export const auctionBidsQuery = (auctionid: string, auctionType: 'fixedPriceAuction' | 'easyAuction') => {
  if (auctionType == 'fixedPriceAuction') {
    return `
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

  return `
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
