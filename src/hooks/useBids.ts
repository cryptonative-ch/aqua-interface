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
  bidsLoading: boolean
  bidsError: Error | undefined
  bids: any | undefined
}

export function useBids(saleId: string): UseBidsReturn {
  const dispatch = useDispatch()
  const [bidsLoading, setBidsLoading] = useState<boolean>(true)
  const [bidsError, setBidsError] = useState<Error>()
  const mesa = useMesa()
  const bids = useSelector(state => {
    return state.bids.bidsBySaleId[saleId].bids
  })
  useEffect(() => {
    // Sale exists in Redux cache, return
    if (bids) {
      return setBidsLoading(false)
    }
    // Store is missing this sale
    // or the browser directly requested the path /sales/<saleId>
    dispatch(initialBidRequest(true))
    // Submit the query to the subgraph
    // then submit query to the blockchain
    mesa.subgraph
      .query(saleBidsQuery(saleId))
      .then(({ data }) => {
        const { fixedPriceSales, fairSales } = data
        const saleBids = fixedPriceSales ? fixedPriceSales[0].purchases : fairSales[0].bids
        const sales: BidsBySaleId = saleBids.reduce(
          (a: any, x: any) => ({
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
      .catch(bidsError => {
        setBidsError(bidsError)
        dispatch(initialBidFailure(bidsError))
      })
      .then(() => {
        setBidsLoading(false)
      })
  }, [])
  //
  //  useEffect(() => {
  //    if (bids) {
  //      return setBidsLoading(false)
  //    }
  //    dispatch(initialBidRequest(true))
  //    try {
  //      // getBidDataFromChain(saleId, saleType, provider, tokendecimals)
  //      dispatch(updateBidSuccess(bids))
  //    } catch (bidsError) {
  //      console.log(bidsError)
  //      dispatch(updateBidFailure(bidsError))
  //    }
  //  }, [bids])
  //
  return {
    bids,
    bidsLoading,
    bidsError,
  }
}
