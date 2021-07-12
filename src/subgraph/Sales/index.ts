export const salesQuery = `
  {
    fixedPriceSales {
      id
      name
      createdAt
      updatedAt
      deletedAt
      status
      startDate
      endDate
      tokenIn {
        id
        name
        symbol
        decimals
      }
      tokenOut {
        id
        name
        symbol
        decimals
      }

      sellAmount
      soldAmount
      minimumRaise
      allocationMin
      allocationMax
      tokenPrice
    }
    fairSales {
      id
      name
      createdAt
      updatedAt
      deletedAt
      status
      startDate
      endDate
      tokensForSale
      minimumBidAmount
      minFundingThreshold
      tokenIn {
        id
        name
        symbol
        decimals
      }
      tokenOut {
        id
        name
        symbol
        decimals
      }
    }
  }
`
