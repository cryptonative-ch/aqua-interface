export const auctionBidsQuery = (auctionid: string, auctionType: 'fixedPriceAuction' | 'fairSale') => {
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
  fairSale (id: ${JSON.stringify(auctionid)}) {
    bids {
      id
      tokenIn
      tokenOut
    }
   }
 }
`
}
