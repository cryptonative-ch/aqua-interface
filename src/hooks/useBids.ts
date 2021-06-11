// External
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { providers } from 'ethers'

// Hooks
import { useMesa } from './useMesa'

// Redux actions
import { initialBidSuccess, initialBidFailure, initialBidRequest, BidsBySaleId } from 'src/redux/bids'
import { store } from 'src/redux/store'
// Interfaces
import { FixedPriceSalePurchase, Bid, SaleBid, FairSaleBid, SaleType, Sale } from 'src/interfaces/Sale'

// Blockchain websocket
import { useChain } from 'src/hooks/useChain'

// Query
import { saleBidsQuery } from 'src/subgraph/SaleBids'

interface UseBidsReturn {
  bidsLoading: boolean
  bidsError: Error | undefined
  bids: SaleBid[]
  totalBids: SaleBid[]
}

export function useBids(
  saleId: string,
  saleType: SaleType,
  provider: providers.JsonRpcProvider,
  decimal: number
): UseBidsReturn {
  const dispatch = useDispatch()
  const [bidsLoading, setBidsLoading] = useState<boolean>(true)
  const [bidsError, setBidsError] = useState<Error>()
  const { account } = useWeb3React()
  const mesa = useMesa()
  const totalBids = useSelector(state => {
    return state.bids.bidsBySaleId[saleId] ? state.bids.bidsBySaleId[saleId].bids : []
  })
  const bids = totalBids.filter((bid: any) => bid.buyer === account)

  console.log(totalBids)
  console.log(account)
  console.log(bids)

  useEffect(() => {
    if (bids.length > 0) {
      return setBidsLoading(false)
    }
    const timeNow = dayjs.utc().unix()
    // only request new bids if the delta between Date.now and saleId.updatedAt is more than 30 seconds
    const { updatedAt } = store.getState().bids.bidsBySaleId[saleId] || timeNow
    const delta = Math.abs(updatedAt - timeNow)
    // exit
    // should only be called once
    if (delta <= 3000000) {
      return
    }

    dispatch(initialBidRequest(true))
    mesa.subgraph
      .query(saleBidsQuery(saleId))
      .then(({ data }) => {
        const { fixedPriceSales, fairSales } = data
        const saleBids = fixedPriceSales ? fixedPriceSales[0].purchases : fairSales[0].bids
        const sales = saleBids.reduce(
          (_: BidsBySaleId, x: any) => ({
            [x.sale.id]: {
              lastUpdated: Date.now(),
              bids: saleBids,
            },
          }),
          {}
        )
        dispatch(initialBidSuccess(sales))
      })
      .catch(bidsError => {
        setBidsError(bidsError)
        dispatch(initialBidFailure(bidsError))
      })
      .then(() => {
        setBidsLoading(false)
      })

    //const { bids: chainBids } = useChain(saleId, saleType, provider, decimal)
  }, [account])
  return {
    totalBids,
    bids,
    bidsLoading,
    bidsError,
  }
}
