export const auctionBidsQuery = (auctionid: string, auctionType: 'fixedPriceSale' | 'fairSale') => {
  if (auctionType == 'fixedPriceSale') {
    return `
      {
        fixedPriceSale (id: ${JSON.stringify(auctionid)}) {
    purchases {
      id
      buyer
      amount
      sale {
        id
      }
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
      tokenInAmount
      tokenOutAmount
      sale {
        id
      }
    }
   }
 }
`
}
