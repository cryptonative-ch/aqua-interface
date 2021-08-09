// External
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { QueryResult, useQuery } from '@apollo/client'

// Redux actions
import { initialBidSuccess, initialBidFailure, initialBidRequest, BidsBySaleId } from 'src/redux/bids'

// Interfaces
import {
  GetAllBidsBySales,
  GetAllBidsBySalesVariables,
  GetAllBidsBySales_fixedPriceSale_commitments_sale,
  GetAllBidsBySales_fixedPriceSale_commitments,
} from 'src/subgraph/__generated__/GetAllBidsBySales'
import { GET_ALL_BIDS_BY_SALES } from 'src/subgraph/queries'

// Blockchain websocket
import { useChain } from 'src/hooks/useChain'

interface UseBidsReturn extends Omit<QueryResult, 'data'> {
  bids: GetAllBidsBySales_fixedPriceSale_commitments[]
  totalBids: GetAllBidsBySales_fixedPriceSale_commitments[]
}

export function useBids(saleId: string, saleType: string): UseBidsReturn {
  const dispatch = useDispatch()
  const { data, ...rest } = useQuery<GetAllBidsBySales, GetAllBidsBySalesVariables>(GET_ALL_BIDS_BY_SALES, {
    variables: { saleId },
  })
  const { account, library, chainId } = useWeb3React()
  const {
    bidsBySaleId: { [saleId]: { updatedAt } = { updatedAt: 0 } },
  } = useSelector(({ bids }) => bids)

  const { bids: totalBids } = useChain(saleId, saleType)
  const bids = totalBids.filter(bid => bid.user.address.toLowerCase() === account!.toLowerCase())

  useEffect(() => {
    // only request new bids if the delta between Date.now and saleId.updatedAt is more than 30 seconds
    const timeNow = dayjs.utc().unix()
    const delta = Math.abs(updatedAt - timeNow)
    if (delta <= 30 && account) {
      return
    }

    //pull past bids from subgraph

    if (data) {
      dispatch(initialBidRequest(true))
      try {
        const { fixedPriceSale, fairSale } = data
        const saleBids = fixedPriceSale ? fixedPriceSale.commitments : fairSale?.bids
        const sales = (saleBids as any)?.reduce(
          (_: BidsBySaleId, x: GetAllBidsBySales_fixedPriceSale_commitments_sale) => ({
            [x.id]: {
              lastUpdated: Date.now(),
              bids: saleBids,
            },
          }),
          {}
        )
        dispatch(initialBidSuccess(sales))
      } catch (error) {
        console.error(error)
        dispatch(initialBidFailure(error))
      }
    }
  }, [account, library, chainId])

  return {
    totalBids,
    bids,
    ...rest,
  }
}
