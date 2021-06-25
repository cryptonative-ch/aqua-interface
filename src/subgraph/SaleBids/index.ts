export const saleBidsQuery = (saleid: string) => {
  return `
      {
        fixedPriceSales (id:"${saleid}") {
          id
    purchases {
      id
      buyer
      amount
      sale {
        id
      }
    }
   }

  fairSales (id: "${saleid}") {
    id
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
