// External
import { useCallback, useEffect } from 'react'
import { QueryResult, useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { useWeb3React } from '@web3-react/core'
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

//hooks
import { useCPK } from 'src/hooks/useCPK'

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

export function useFixedPriceSaleCommitmentsByBuyerIdQuery(): UseSalesQueryResult {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const { data, ...rest } = useQuery<GetFixedPriceSaleCommitmentsByUser>(GET_FIXED_PRICE_SALE_COMMITMENTS_ALL)
  const { cpk } = useCPK(library, chainId)

  let purchases: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments[] = []
  let sales: SummarySales[] = []
  let saleIds: string[] = []

  const setInitialClaimStatus = useCallback(() => {
    const unixDateNow = dayjs(Date.now()).unix()
    sales
      .filter(
        purchase =>
          BigNumber.from(purchase.sale.soldAmount) >= BigNumber.from(purchase.sale.minRaise) &&
          unixDateNow >= purchase.sale.endDate
      )
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
  }, [sales])

  if (data && account) {
    purchases =
      data.fixedPriceSaleCommitments.filter(
        commitment =>
          commitment.user.address.toLowerCase() === account?.toLowerCase() ||
          commitment.user.address.toLowerCase() === cpk?.address?.toLowerCase()
      ) || []

    const groupBy = purchases.reduce((a: any, c: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments) => {
      a[c.sale.id] = a[c.sale.id] || []
      a[c.sale.id].push(c)
      return a
    }, [])

    saleIds = Object.keys(groupBy)

    sales = saleIds.map((purchases: string) => {
      return aggregatePurchases(
        groupBy[purchases],
        { userAddress: account! as string, cpkAddress: cpk?.address as string },
        groupBy[purchases][0].sale
      )
    })
  }

  useEffect(() => {
    if (!chainId || !library || !account) {
      return
    }

    setInitialClaimStatus()
  }, [data, library, chainId, account])

  return {
    sales,
    saleIds,
    ...rest,
  }
}
