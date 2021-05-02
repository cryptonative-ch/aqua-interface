export const saleBidsQuery = (saleid: string, saleType: 'fixedPriceSale' | 'fairSale') => {
  if (saleType == 'fixedPriceSale') {
    return `
      {
        fixedPriceSale (id: ${JSON.stringify(saleid)}) {
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
  fairSale (id: ${JSON.stringify(saleid)}) {
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
