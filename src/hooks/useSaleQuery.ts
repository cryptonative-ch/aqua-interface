// Externals
import { QueryResult, useQuery } from '@apollo/client'

// Queries
import { GET_SINGLE_SALE } from 'src/subgraph/queries'

// Interfaces
import {
  GetSingleSale,
  GetSingleSaleVariables,
  GetSingleSale_fairSale,
  GetSingleSale_fixedPriceSale,
} from 'src/subgraph/__generated__/GetSingleSale'

type Sale = GetSingleSale_fairSale | GetSingleSale_fixedPriceSale

interface UseSaleQueryResult<T> extends Omit<QueryResult, 'data'> {
  sale: T | undefined
}

export function useSaleQuery<T = Sale>(saleId: string): UseSaleQueryResult<T> {
  const { data, ...rest } = useQuery<GetSingleSale, GetSingleSaleVariables>(GET_SINGLE_SALE, {
    variables: {
      saleId,
    },
  })

  // Default
  let sale = undefined

  if (data) {
    sale = Object.values(data).find(sale => sale != null)

    if (sale) {
      // Add type fields
      sale = {
        ...sale,
        type: sale.__typename,
      }
    }
  }

  return {
    sale: sale as T,
    ...rest,
  }
}

export function useFixedPriceSaleQuery(saleId: string) {
  return useSaleQuery<GetSingleSale_fixedPriceSale>(saleId)
}

export function useFairSaleQuery(saleId: string) {
  return useSaleQuery<GetSingleSale_fairSale>(saleId)
}
