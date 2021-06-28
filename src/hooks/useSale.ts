// External
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// Hooks
import { useMesa } from 'src/hooks/useMesa'

// Redux actions
import { fetchSalesComplete, fetchSalesError, fetchSalesRequest, fetchSalesSuccess } from 'src/redux/sales'
// Interfaces
import { Sale } from 'src/interfaces/Sale'

interface UseSaleReturn {
  loading: boolean
  error: Error | undefined
  sale: Sale | undefined
}

// We request both types because we do not know the exact
export const salesQuery = (saleId: string) => `
  {
    fixedPriceSale ("${saleId}") {
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
    fairSale ("${saleId}") {
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
 * This hooks fetches, caches a single Sale to the Redux sales
 *
 * @param saleId the saleId (contract address)
 */
export function useSale(saleId: string): UseSaleReturn {
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error>()
  const mesa = useMesa()
  const sales = useSelector(({ sales }) => sales.sales)
  const sale = sales.find(sale => sale.id === saleId)

  useEffect(() => {
    // Sale exists in Redux cache, return
    if (sale) {
      return setLoading(false)
    }
    // Store is missing this sale
    // or the browser directly requested the path /sales/<saleId>
    dispatch(fetchSalesRequest())
    // Submit the query to the subgraph
    mesa.subgraph
      .query(salesQuery(saleId))
      .then(({ data }) => {
        const { fixedPriceSale, fairSale } = data
        // Merge store data with this
        dispatch(fetchSalesSuccess([sales, ...fixedPriceSale, ...fairSale] as Sale[]))
      })
      .catch(error => {
        setError(error)
        toast.error(t('errors.fetchSale'))
        dispatch(fetchSalesError(error))
      })
      .then(() => {
        setLoading(false)
        dispatch(fetchSalesComplete())
      })
  }, [sale, saleId])

  return {
    sale,
    loading,
    error,
  }
}
