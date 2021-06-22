// External
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// Redux actions
import { fetchSalesComplete, fetchSalesError, fetchSalesRequest, fetchSalesSuccess } from 'src/redux/sales'
// Interfaces
import { Sale } from 'src/interfaces/Sale'
import { useMesa } from './useMesa'

interface UseSalesReturn {
  loading: boolean
  error: Error | null
  sales: Sale[]
}

export const salesQuery = `
  {
    fixedPriceSales {
      id
      name
      createdAt
      updatedAt
      deletedAt
      status
      startDate
      endDate
      tokenIn {
        id
        name
        symbol
        decimals
      }
      tokenOut {
        id
        name
        symbol
        decimals
      }
      sellAmount
      soldAmount
      minimumRaise
      allocationMin
      allocationMax
      tokenPrice
    }
    fairSales {
      id
      name
      createdAt
      updatedAt
      deletedAt
      status
      startDate
      endDate
      tokenAmount
      minimumBidAmount
      minFundingThreshold
      tokenIn {
        id
        name
        symbol
        decimals
      }
      tokenOut {
        id
        name
        symbol
        decimals
      }
    }
  }
`

/**
 * @todo better name for this
 */
function isCacheExpired(delta: number) {
  return Math.abs(delta) > 1000 * 30
}

/**
 * Dispatches FETCH_SALES action and returns
 * @returns
 */
export function useSales(): UseSalesReturn {
  const [t] = useTranslation()
  const mesa = useMesa()
  const dispatch = useDispatch()
  const { isLoading, error, sales, updatedAt } = useSelector(({ sales }) => sales)

  useEffect(() => {
    //
    const timeNow = dayjs.utc().unix()
    if (!isCacheExpired(timeNow - updatedAt)) {
      return
    }

    // Dispatch request start
    dispatch(fetchSalesRequest())
    // Submit the query to the subgraph
    mesa.subgraph
      .query(salesQuery)
      .then(({ data }) => {
        const { fixedPriceSales, fairSales } = data
        dispatch(fetchSalesSuccess([...fixedPriceSales, ...fairSales] as Sale[]))
      })
      .catch(error => {
        toast.error(t('error.fetchSale'))
        dispatch(fetchSalesError(error))
      })
      .then(() => dispatch(fetchSalesComplete()))
  }, [dispatch])

  return {
    error,
    loading: isLoading,
    sales,
  }
}
