// External
import { QueryResult, useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { BigNumber } from 'ethers'

// Query
import { GET_FIXED_PRICE_SALE_PURCHASES_ALL_BY_BUYER } from 'src/subgraph/queries'

// Interfaces
import {
  GetFixedPriceSalePurchasesByBuyer,
  GetFixedPriceSalePurchasesByBuyerVariables,
  GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases,
} from 'src/subgraph/__generated__/GetFixedPriceSalePurchasesByBuyer'
import { ClaimState } from 'src/hooks/useTokenClaim'

//helpers
import { aggregatePurchases } from 'src/utils/Defaults'

//redux
import { setClaimStatus } from 'src/redux/claims'

export type SummarySales = Omit<
  GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases,
  '__typename' | 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

interface UseSalesQueryResult extends Omit<QueryResult, 'data'> {
  sales: SummarySales[]
  saleIds: string[]
}

export function useFixedPriceSalePurchasesByBuyerQuery(buyerId: string | undefined | null): UseSalesQueryResult {
  const dispatch = useDispatch()
  const { data, ...rest } = useQuery<GetFixedPriceSalePurchasesByBuyer, GetFixedPriceSalePurchasesByBuyerVariables>(
    GET_FIXED_PRICE_SALE_PURCHASES_ALL_BY_BUYER,
    {
      variables: {
        buyerId,
      },
    }
  )

  let purchases: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases[] = []
  let sales: SummarySales[] = []
  let saleIds: string[] = []

  if (data) {
    purchases = data.fixedPriceSalePurchases

    const groupBy = purchases.reduce((a: any, c: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases) => {
      a[c.sale.id] = a[c.sale.id] || []
      a[c.sale.id].push(c)
      return a
    }, [])

    saleIds = Object.keys(groupBy)

    sales = saleIds.map((purchases: string) => {
      return aggregatePurchases(groupBy[purchases], buyerId, groupBy[purchases][0].sale)
    })

    const unixDateNow = dayjs(Date.now()).unix()

    // dispatch for claims redux
    dispatch(
      sales
        .filter(
          purchase =>
            BigNumber.from(purchase.sale.soldAmount) >= BigNumber.from(purchase.sale.minimumRaise) &&
            unixDateNow >= purchase.sale.endDate
        )
        .map(purchase =>
          setClaimStatus({
            sale: purchase.sale,
            ClaimToken: ClaimState.UNCLAIMED,
            error: null,
            transaction: null,
          })
        )
    )
  }

  return {
    sales,
    saleIds,
    ...rest,
  }
}
