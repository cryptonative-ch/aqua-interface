// External
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

// Hooks
import { useMesa } from './useMesa'

// Redux actions
import {
  initialBidSuccess,
  initialBidFailure,
  updateBidSuccess,
  updateBidRequest,
  updateBidFailure,
  initialBidRequest,
  BidsBySaleId,
} from 'src/redux/bids'
// Interfaces
import { FixedPriceSalePurchase, SaleBid, FairSaleBid, SaleType } from 'src/interfaces/Sale'

// Blockchain websocket
import { getBidDataFromChain } from 'src/blockchain'

// Query
import { saleBidsQuery } from 'src/subgraph/SaleBids'

interface UseBidsReturn {
  loading: boolean
  error: Error | undefined
  bids: any | undefined
}

export function useBids(saleId: string): UseBidsReturn {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error>()
  const mesa = useMesa()
  const bids = useSelector(state => {
    return state.bids
  })
  useEffect(() => {
    // Sale exists in Redux cache, return
    if (bids.bidsBySaleId[saleId]) {
      return setLoading(false)
    }
    // Store is missing this sale
    // or the browser directly requested the path /sales/<saleId>
    dispatch(initialBidRequest(true))
    // Submit the query to the subgraph
    // then submit query to the blockchain
    mesa.subgraph
      .query(saleBidsQuery(saleId))
      .then(({ data }) => {
        console.log(data)
        const { fixedPriceSales, fairSales } = data
        const saleBids = fixedPriceSales ? fixedPriceSales.purchases : fairSales.bids
        const sales: BidsBySaleId = saleBids.reduce(
          (a: any, x: any) => ({
            [x.sale.id]: {
              lastUpdated: Date.now(),
              bids: saleBids,
            },
          }),
          {}
        )
        console.log(sales)
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
  }, [])
  //
  //  useEffect(() => {
  //    if (bids) {
  //      return setLoading(false)
  //    }
  //    dispatch(initialBidRequest(true))
  //    try {
  //      // getBidDataFromChain(saleId, saleType, provider, tokendecimals)
  //      dispatch(updateBidSuccess(bids))
  //    } catch (error) {
  //      console.log(error)
  //      dispatch(updateBidFailure(error))
  //    }
  //  }, [bids])
  //
  return {
    bids,
    loading,
    error,
  }
}
