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
      minRaise
      minCommitment
      maxCommitment
      tokenPrice
    }
  }
`
