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
} from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

//helpers
import { aggregatePurchases } from 'src/utils'

//redux
import { setClaimStatus } from 'src/redux/claims'
import { FixedPriceSaleCommitmentStatus } from 'src/subgraph/__generated__/globalTypes'

export interface SummarySales {
  sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale
  status: FixedPriceSaleCommitmentStatus
  amount: BigNumber
  user: {
    address: string
  }
}

interface UseSalesQueryResult extends Omit<QueryResult, 'data'> {
  sales: SummarySales[]
  saleIds: string[]
}

export function useFixedPriceSaleCommitmentsByBuyerIdQuery(buyerId: string | undefined | null): UseSalesQueryResult {
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
      .filter(purchase => unixDateNow >= purchase.sale.endDate)
      .map(purchase =>
        dispatch(
          setClaimStatus({
            sale: purchase.sale,
            claimToken: purchase.status as any,
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
