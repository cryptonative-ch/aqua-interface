export const saleBidsQuery = (saleid: string) => {
  return `
    {
      fixedPriceSale (id:"${saleid}" ) {
        id
        soldAmount
        commitments {
          id
          amount 
          status
          user {
            address
          }
          sale {
            id
            tokenPrice
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
