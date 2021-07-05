export const saleBidsQuery = (saleid: string) => {
  return `
      {
        fixedPriceSales (where: {id:"${saleid}"} ) {
          id
    purchases {
      id
      buyer
      amount
      status
      sale {
        id
      }
    }
   }

  fairSales (where: {id: "${saleid}"}) {
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
