// External
import { QueryResult, useQuery } from '@apollo/client'

// Query
import { GET_ALL_SALES } from 'src/subgraph/queries'

// Interfaces
import { GetAllSales, GetAllSales_fairSales, GetAllSales_fixedPriceSales } from 'src/subgraph/__generated__/GetAllSales'

import { Sale } from 'src/interfaces/Sale'

interface UseSalesQueryResult extends Omit<QueryResult, 'data'> {
  sales: Sale[]
}

/**
 * Fetches all sales from the subgraph
 * @returns A list of `Sale`
 */
export function useSalesQuery(): UseSalesQueryResult {
  const { data, ...rest } = useQuery<GetAllSales>(GET_ALL_SALES)

  // Default value
  let sales: Sale[] = []

  // Flatten the data
  if (data) {
    sales = Object.values(data).reduce((acc, val) => {
      // map
      const mappedSales = val.map((sale: GetAllSales_fairSales | GetAllSales_fixedPriceSales) => ({
        ...sale,
        type: sale.__typename,
      }))

      // Merge
      acc = acc.concat(mappedSales)

      return acc
    }, [])
  }

  return {
    sales,
    ...rest,
  }
}
