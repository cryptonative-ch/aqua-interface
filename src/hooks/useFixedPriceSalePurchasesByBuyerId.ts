// External
import { QueryResult, useQuery } from '@apollo/client'

// Query
import { GET_FIXED_PRICE_SALE_PURCHASES_ALL_BY_BUYER } from 'src/subgraph/queries'

// Interfaces
import {
  GetFixedPriceSalePurchasesByBuyer,
  GetFixedPriceSalePurchasesByBuyerVariables,
  GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases,
  GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases_sale,
} from 'src/subgraph/__generated__/GetFixedPriceSalePurchasesByBuyer'

interface UseSalesQueryResult extends Omit<QueryResult, 'data'> {
  purchases: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases[]
  sales: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases | undefined
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
  let sales: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases | undefined = undefined

  if (data) {
    purchases = data.fixedPriceSalePurchases.filter(purchase => purchase.status !== 'CLAIMED')
    sales = purchases.reduce((a: any, c: any) => {
      a[c.sale.id] = a[c.sale.id] || []
      a[c.sale.id].push(c)
      return a
    }, [])
  }

  return {
    purchases,
    sales,
    ...rest,
  }
}
