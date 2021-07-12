// External
import { QueryResult, useQuery } from '@apollo/client'

// Query
import { GET_FIXED_PRICE_SALE_PURCHASES_ALL_BY_BUYER } from 'src/subgraph/queries'

// Interfaces
import {
  GetFixedPriceSalePurchasesByBuyer,
  GetFixedPriceSalePurchasesByBuyerVariables,
  GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases,
} from 'src/subgraph/__generated__/GetFixedPriceSalePurchasesByBuyer'

interface UseSalesQueryResult extends Omit<QueryResult, 'data'> {
  purchases: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases[]
}

export function useFixedPriceSalePurchasesByBuyerQuery(buyerId: string): UseSalesQueryResult {
  const { data, ...rest } = useQuery<GetFixedPriceSalePurchasesByBuyer, GetFixedPriceSalePurchasesByBuyerVariables>(
    GET_FIXED_PRICE_SALE_PURCHASES_ALL_BY_BUYER,
    {
      variables: {
        buyerId,
      },
    }
  )

  let purchases: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases[] = []

  if (data) {
    purchases = data.fixedPriceSalePurchases
  }

  return {
    purchases,
    ...rest,
  }
}
