// External
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

// Hooks
import { useMesa } from './useMesa'

// Redux actions
import {
  initialBidSuccess,
  initialBidSuccess,
  initialBidFailure,
  updateBidSuccess,
  updateBidRequest,
  updateBidFailure,
  initialBidRequest,
  BidsBySaleId,
} from 'src/redux/bids'
// Interfaces
import { SaleBid, SaleType } from 'src/interfaces/Sale'

// Query
import { saleBidsQuery } from 'src/subgraph/SaleBids'

interface UseBidsReturn {
  loading: boolean
  error: Error | undefined
  bids: SaleBid | undefined
}

export function useBids(saleId: string, saleType: SaleType): UseBidsReturn {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error>()
  const mesa = useMesa()
  const bids = useSelector(({ bids }) => bids.bidsBySaleId[saleId].bids)

  export const fetchSaleBids = (saleId: string, saleType: SaleType, saleBidsRequest: Promise<any>): AppThunk => {
    return async (dispatch, getState) => {
      // Current time
      const timeNow = dayjs.utc().unix()
      // only request new bids if the delta between Date.now and saleId.updatedAt is more than 30 seconds
      const { updatedAt } = getState().bids.bidsBySaleId[saleId] || timeNow
      const delta = Math.abs(updatedAt - timeNow)
      // exit
      // should only be called once
      if (delta <= 3000000) {
        return
      }
      // fetch new (fresh) data

      dispatch(initialBidRequest(true))
      try {
        dispatch(initialBidSuccess(await generateInitialSaleData(saleBidsRequest, saleType)))
      } catch (error) {
        console.log(error)
        dispatch(initialBidFailure(error))
      }
    }
  }

  useEffect(() => {
    // Sale exists in Redux cache, return
    if (bids) {
      return setLoading(false)
    }
    // Store is missing this sale
    // or the browser directly requested the path /sales/<saleId>
    dispatch(initialBidRequest(true))
    // Submit the query to the subgraph
    mesa.subgraph
      .query(saleBidsQuery(saleId, saleType))
      .then(({ data }) => {
        const { fixedPriceSale, fairSale } = data
        const saleBids = fixedPriceSale ? fixedPriceSale.purchases : fairSale.bids
        const sales: BidsBySaleId = saleBids.reduce(
          (a, x: any) => ({
            [x.sale.id]: {
              lastUpdated: Date.now(),
              bids: saleBids,
            },
          }),
          {}
        )
        // Merge store data with this
        dispatch(initialBidSuccess(sales))
      })
      .catch(error => {
        setError(error)
        dispatch(initialBidFailure(error))
      })
      .then(() => {
        setLoading(false)
      })
  }, [bids])

  return {
    bids,
    loading,
    error,
  }
}
