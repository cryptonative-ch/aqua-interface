// External
import { QueryResult, useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { BigNumber } from 'ethers'

// Query
import { GET_FIXED_PRICE_SALE_COMMITMENTS_ALL } from 'src/subgraph/queries'

// Interfaces
import {
  GetFixedPriceSaleCommitmentsByUser,
  GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments,
  GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale,
  GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_user,
} from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

import { ClaimState } from 'src/hooks/useTokenClaim'

//helpers
import { aggregatePurchases } from 'src/utils/Defaults'

//redux
import { setClaimStatus } from 'src/redux/claims'

export interface SummarySales {
  sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale
  status: Pick<GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments, 'status'>
  amount: BigNumber
  user: Pick<GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_user, 'address'>
}

interface UseSalesQueryResult extends Omit<QueryResult, 'data'> {
  sales: SummarySales[]
  saleIds: string[]
}

export function useFixedPriceSalePurchasesByBuyerQuery(buyerId: string | undefined | null): UseSalesQueryResult {
  const dispatch = useDispatch()
  const { data, ...rest } = useQuery<GetFixedPriceSaleCommitmentsByUser>(GET_FIXED_PRICE_SALE_COMMITMENTS_ALL)

  let purchases: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments[] = []
  let sales: SummarySales[] = []
  let saleIds: string[] = []

  if (data) {
    purchases = data.fixedPriceSaleCommitments.filter(
      commitment => commitment.user.address.toLowerCase() === buyerId?.toLowerCase()
    )

    const groupBy = purchases.reduce((a: any, c: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments) => {
      a[c.sale.id] = a[c.sale.id] || []
      a[c.sale.id].push(c)
      return a
    }, [])

    saleIds = Object.keys(groupBy)

    sales = saleIds.map((purchases: string) => {
      return aggregatePurchases(groupBy[purchases], buyerId, groupBy[purchases][0].sale)
    })

    const unixDateNow = dayjs(Date.now()).unix()
    sales
      .filter(
        purchase =>
          BigNumber.from(purchase.sale.soldAmount) >= BigNumber.from(purchase.sale.minimumRaise) &&
          unixDateNow >= purchase.sale.endDate
      )
      .map(purchase =>
        dispatch(
          setClaimStatus({
            sale: purchase.sale,
            claimToken: ClaimState.UNCLAIMED,
            error: null,
            transaction: null,
            amount: purchase.amount,
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
