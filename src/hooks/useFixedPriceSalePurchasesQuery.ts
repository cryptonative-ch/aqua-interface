// External
import { QueryResult, useQuery } from '@apollo/client'

// Query
import { GET_FIXED_PRICE_SALE_PURCHASES_BY_SALE_ID } from 'src/subgraph/queries'

// Interfaces
import {
  GetFixedPriceSalePurchasesBySaleId_fixedPriceSalePurchases,
  GetFixedPriceSalePurchasesBySaleIdVariables,
  GetFixedPriceSalePurchasesBySaleId,
} from 'src/subgraph/__generated__/GetFixedPriceSalePurchasesBySaleId'

interface UseSalesQueryResult extends Omit<QueryResult, 'data'> {
  purchases: GetFixedPriceSalePurchasesBySaleId_fixedPriceSalePurchases[]
}

/**
 * Fetches all sales from the subgraph
 * @returns A list of `Sale`
 */
export function useFixedPriceSalePurchasesQuery(saleId: string): UseSalesQueryResult {
  const { data, ...rest } = useQuery<GetFixedPriceSalePurchasesBySaleId, GetFixedPriceSalePurchasesBySaleIdVariables>(
    GET_FIXED_PRICE_SALE_PURCHASES_BY_SALE_ID,
    {
      variables: {
        saleId,
      },
    }
  )

  // Default value
  let purchases: GetFixedPriceSalePurchasesBySaleId_fixedPriceSalePurchases[] = []

  // Flatten the data
  if (data) {
    purchases = data.fixedPriceSalePurchases
  }

  return {
    purchases,
    ...rest,
  }
}
