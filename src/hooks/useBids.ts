// External
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { QueryResult, useQuery } from '@apollo/client'

// Redux actions
import { initialBidSuccess, initialBidFailure, initialBidRequest, BidsBySaleId } from 'src/redux/bids'
import {
  initialCommitmentSuccess,
  initialCommitmentFailure,
  initialCommitmentRequest,
  CommitmentsBySaleId,
  CommitmentsState,
} from 'src/redux/commitments'

// Interfaces
import {
  GetAllBidsBySaleId,
  GetAllBidsBySaleIdVariables,
  GetAllBidsBySaleId_fixedPriceSale_commitments,
  GetAllBidsBySaleId_fairSale_bids,
} from 'src/subgraph/__generated__/GetAllBidsBySaleId'
import { GET_ALL_BIDS_BY_SALE_ID } from 'src/subgraph/queries'

// Blockchain websocket
import { useNewCommitmentEventFromChain } from 'src/hooks/useNewBidEventFromChain'
import { formatBigInt } from 'src/utils'

interface ClearingPrice {
  volumeMet: boolean
  price: number
  lowestBid: GetAllBidsBySaleId_fairSale_bids
}

interface UseBidsReturn extends Omit<QueryResult, 'data'> {
  userBids: GetAllBidsBySaleId_fairSale_bids[]
  allBids: GetAllBidsBySaleId_fairSale_bids[]
  clearingPrice: ClearingPrice
}
interface UseCommitmentsReturn extends Omit<QueryResult, 'data'> {
  bids: GetAllBidsBySaleId_fixedPriceSale_commitments[]
  allBids: GetAllBidsBySaleId_fixedPriceSale_commitments[]
}

const calculateClearingPrice = (allBids: GetAllBidsBySaleId_fairSale_bids[], volume: number) => {
  // Temporary fake volume target
  const volumeLimit = volume > 0 ? volume : formatBigInt('790029100000000000000', 18)
  const lowestBid = allBids[allBids.length - 1]
  let clearing = {
    volumeMet: false,
    price: lowestBid ? lowestBid.tokenInAmount / lowestBid.tokenOutAmount : 0,
    lowestBid,
  }
  if (allBids.length > 0) {
    let total = 0
    allBids.forEach((bid, index) => {
      total = total + formatBigInt(bid.tokenOutAmount, 18)
      if (total > volumeLimit) {
        const lowestPassingBid = allBids[index > 0 ? index - 1 : 0]
        clearing = {
          volumeMet: true,
          price: lowestPassingBid.tokenInAmount / lowestPassingBid.tokenOutAmount,
          lowestBid: lowestPassingBid,
        }
      }
    })
  }
  return clearing
}

export function useBids(saleId: string, volume: number): UseBidsReturn {
  const dispatch = useDispatch()
  const { data, ...rest } = useQuery<GetAllBidsBySaleId, GetAllBidsBySaleIdVariables>(GET_ALL_BIDS_BY_SALE_ID, {
    variables: { saleId },
  })
  const { account, library, chainId } = useWeb3React()
  const {
    bidsBySaleId: { [saleId]: { updatedAt } = { updatedAt: 0 } },
  } = useSelector(({ bids }) => bids)

  // const { bids: allBids } = useNewBidEventFromChain(saleId)
  // const bids = allBids.filter(bid => bid.owner.address.toLowerCase() === account?.toLowerCase()) || []
  const userBids: GetAllBidsBySaleId_fairSale_bids[] = []

  // Temporary mock data
  const allBids: GetAllBidsBySaleId_fairSale_bids[] = [
    {
      __typename: 'FairSaleBid',
      id: 'test',
      owner: { __typename: 'FairSaleUser', id: 'test', address: 'ownerId' },
      tokenInAmount: '657229100000000000000',
      tokenOutAmount: '65229100000000000000',
      sale: {
        __typename: 'FairSale',
        id: 'saleId',
      },
    },
    {
      __typename: 'FairSaleBid',
      id: 'test',
      owner: { __typename: 'FairSaleUser', id: 'test', address: 'ownerId' },
      tokenInAmount: '257229100000000000000',
      tokenOutAmount: '607229100000000000000',
      sale: {
        __typename: 'FairSale',
        id: 'saleId',
      },
    },
    {
      __typename: 'FairSaleBid',
      id: 'test',
      owner: { __typename: 'FairSaleUser', id: 'test', address: 'ownerId' },
      tokenInAmount: '657229100000000000000',
      tokenOutAmount: '67229100000000000000',
      sale: {
        __typename: 'FairSale',
        id: 'saleId',
      },
    },
  ]

  allBids.sort((a, b) => formatBigInt(a.tokenInAmount) - formatBigInt(b.tokenInAmount))

  const clearingPrice = calculateClearingPrice(allBids, volume)

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
        const { fairSale } = data
        const saleBids = fairSale?.bids
        const sales = (saleBids as any)?.reduce(
          (_: BidsBySaleId, x: GetAllBidsBySaleId_fixedPriceSale_commitments) => ({
            [x.sale.id]: {
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
  }, [account, library, chainId, data])

  return {
    allBids,
    userBids,
    clearingPrice,
    ...rest,
  }
}
export function useCommitments(saleId: string): UseCommitmentsReturn {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()

  useNewCommitmentEventFromChain(saleId)

  const {
    bidsBySaleId: { [saleId]: { updatedAt } = { updatedAt: 0 } },
  } = useSelector(({ commitments }) => commitments as CommitmentsState)

  const allBids = useSelector(({ commitments }) => (commitments as CommitmentsState).bidsBySaleId[saleId]?.bids)

  const bids = allBids?.filter(bid => bid.user.address.toLowerCase() === account?.toLowerCase()) || []

  const { data, ...rest } = useQuery<GetAllBidsBySaleId, GetAllBidsBySaleIdVariables>(GET_ALL_BIDS_BY_SALE_ID, {
    variables: { saleId },
  })

  useEffect(() => {
    // only request new bids if the delta between Date.now and saleId.updatedAt is more than 30 seconds
    const timeNow = dayjs.utc().unix()
    const delta = Math.abs(updatedAt - timeNow)
    if (delta <= 30 && account) {
      return
    }

    //pull past bids from subgraph
    if (data) {
      dispatch(initialCommitmentRequest(true))
      try {
        const { fixedPriceSale } = data
        const saleBids = fixedPriceSale?.commitments
        const sales = (saleBids as any)?.reduce(
          (_: CommitmentsBySaleId, x: GetAllBidsBySaleId_fixedPriceSale_commitments) => ({
            [x.sale.id]: {
              lastUpdated: Date.now(),
              bids: saleBids,
            },
          }),
          {}
        )
        dispatch(initialCommitmentSuccess(sales))
      } catch (error) {
        console.error(error)
        dispatch(initialCommitmentFailure(error))
      }
    }
  }, [account, library, chainId, data])

  return {
    allBids,
    bids,
    ...rest,
  }
}
