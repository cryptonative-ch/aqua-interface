// External
import { QueryResult, useQuery } from '@apollo/client'
import { useEffect } from 'react'

// Query
import { GET_FIXED_PRICE_SALE_PURCHASES_ALL_BY_BUYER } from 'src/subgraph/queries'

// Interfaces
import {
  GetFixedPriceSalePurchasesByBuyer,
  GetFixedPriceSalePurchasesByBuyerVariables,
  GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases,
} from 'src/subgraph/__generated__/GetFixedPriceSalePurchasesByBuyer'
import { FixedPriceSaleStatus } from 'src/subgraph/__generated__/globalTypes'

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

export function useFixedPriceSalePurchasesByBuyerQuery(buyerId: string | undefined | null): UseSalesQueryResult {
  const { data, ...rest } = useQuery<GetFixedPriceSalePurchasesByBuyer, GetFixedPriceSalePurchasesByBuyerVariables>(
    GET_FIXED_PRICE_SALE_PURCHASES_ALL_BY_BUYER,
    {
      variables: {
        buyerId,
      },
    }
  )

  useEffect(() => {
    if (!buyerId) {
      return
    }
  }, [buyerId])

  let purchases: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases[] = []
  let sales: SummarySales = []
  let saleIds: string[] = []

  if (data) {
    purchases = data.fixedPriceSalePurchases.filter(
      purchase =>
        // included upcoming as subgraph does not update status from upcoming to open
        purchase.sale.status === FixedPriceSaleStatus.OPEN || purchase.sale.status === FixedPriceSaleStatus.UPCOMING
    )
    const groupBy = purchases.reduce((a: any, c: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases) => {
      a[c.sale.id] = a[c.sale.id] || []
      a[c.sale.id].push(c)
      return a
    }, [])

    saleIds = Object.keys(groupBy)

    sales = saleIds.map((purchases: string) => {
      return aggregatePurchases(groupBy[purchases], buyerId, groupBy[purchases][0].sale)
    })
  }

  return {
    sales,
    saleIds,
    ...rest,
  }
}
