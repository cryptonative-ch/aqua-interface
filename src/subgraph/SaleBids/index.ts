import { SaleType } from 'src/interfaces/Sale'

export const saleBidsQuery = (saleid: string, saleType: SaleType) => {
  if (saleType == 'FixedPriceSale') {
    return `
      {
        fixedPriceSale (where: {"${saleid}"}) {
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
  fairSale (where: {""${saleid}""}) {
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
