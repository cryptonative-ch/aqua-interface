export const saleBidsQuery = (saleid: string) => {
  return `
      {
        fixedPriceSales (where: {id:"${saleid}"}) {
    purchases {
      id
      buyer
      amount
      sale {
        id
      }
    }
   }

  fairSales (where: {id: "${saleid}"}) {
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
