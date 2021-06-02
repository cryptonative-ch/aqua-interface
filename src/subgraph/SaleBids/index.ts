import { SaleType } from 'src/interfaces/Sale'

export const saleBidsQuery = (saleid: string, saleType: SaleType) => {
  if (saleType == 'FixedPriceSale') {
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
