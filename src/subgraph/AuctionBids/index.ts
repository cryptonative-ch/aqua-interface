export const auctionBidsQuery = (auctionid: string, auctionType: 'fixedPriceAuction' | 'easyAuction') => {
  if (auctionType == 'fixedPriceAuction') {
    return `
      {
        fixedPriceAuction (id: ${JSON.stringify(auctionid)}) {
    bids {
      id
      tokenIn
      tokenOut
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
      tokenIn
      tokenOut
    }
   }
 }
`
}
