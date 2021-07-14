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

//helpers
import { aggregatePurchases } from 'src/utils/Defaults'

export type SummarySales = Omit<
  GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases,
  '__typename' | 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>[]

interface UseSalesQueryResult extends Omit<QueryResult, 'data'> {
  sales: SummarySales
  saleIds: string[]
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
  let sales: SummarySales = []
  let saleIds: string[] = []

  if (data) {
    purchases = data.fixedPriceSalePurchases.filter(purchase => purchase.status !== 'CLAIMED')
    const groupBy = purchases.reduce((a: any, c: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases) => {
      a[c.sale.id] = a[c.sale.id] || []
      a[c.sale.id].push(c)
      return a
    }, [])

    sales = Object.keys(groupBy).map((purchases: string) => {
      return aggregatePurchases(groupBy[purchases], buyerId, groupBy[purchases][0].sale)
    })

    saleIds = Object.keys(groupBy)
  }

  return {
    sales,
    saleIds,
    ...rest,
  }
}