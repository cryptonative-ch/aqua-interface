// Externals
import { QueryResult, useQuery } from '@apollo/client'

// Queries
import { GET_SINGLE_SALE } from 'src/subgraph/queries'

// Interfaces
import { GetSingleSale, GetSingleSaleVariables } from 'src/subgraph/__generated__/GetSingleSale'
import { Sale } from 'src/interfaces/Sale'

interface UseSaleQueryResult extends Omit<QueryResult, 'data'> {
  sale: Sale | undefined
}

export function useSaleQuery(saleId: string): UseSaleQueryResult {
  const { data, ...rest } = useQuery<GetSingleSale, GetSingleSaleVariables>(GET_SINGLE_SALE, {
    variables: {
      saleId,
    },
  })

  // Default
  let sale = undefined

  if (data) {
    sale = Object.values(data).find(sale => sale != null)

    // Add type fields
    sale = {
      ...sale,
      type: sale.__typename,
    }
  }

  return {
    sale,
    ...rest,
  }
}
