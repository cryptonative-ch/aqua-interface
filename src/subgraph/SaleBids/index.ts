export const saleBidsQuery = (saleid: string) => {
  return `
      {
        fixedPriceSales (where: {"${saleid}"}) {
    purchases {
      id
      buyer
      amount
      sale {
        id
      }
    }
   }

  fairSales (where: {"${saleid}"}) {
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
