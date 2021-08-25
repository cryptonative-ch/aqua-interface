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
import { useReadBidEventFromBlockchain } from 'src/hooks/useReadBidEventFromBlockchain'

interface UseBidsReturn extends Omit<QueryResult, 'data'> {
  bids: GetAllBidsBySaleId_fairSale_bids[]
  allBids: GetAllBidsBySaleId_fairSale_bids[]
}
interface UseCommitmentsReturn extends Omit<QueryResult, 'data'> {
  bids: GetAllBidsBySaleId_fixedPriceSale_commitments[]
  allBids: GetAllBidsBySaleId_fixedPriceSale_commitments[]
}

// export function useCommitments(saleId: string): useCommitmentsReturn {
//   const dispatch = useDispatch()
//   const { data, ...rest } = useQuery<GetAllBidsBySaleId, GetAllBidsBySaleIdVariables>(GET_ALL_BIDS_BY_SALE_ID, {
//     variables: { saleId },
//   })
//   const { account, library, chainId } = useWeb3React()
//   const {
//     bidsBySaleId: { [saleId]: { updatedAt } = { updatedAt: 0 } },
//   } = useSelector(({ bids }) => bids)

//   // const { bids: allBids } = useReadBidEventFromBlockchain(saleId, saleType)
//   // const bids = allBids.filter(bid => bid.user.address.toLowerCase() === account?.toLowerCase()) || []

//   useEffect(() => {
//     // only request new bids if the delta between Date.now and saleId.updatedAt is more than 30 seconds
//     const timeNow = dayjs.utc().unix()
//     const delta = Math.abs(updatedAt - timeNow)
//     if (delta <= 30 && account) {
//       return
//     }

//     //pull past bids from subgraph

//     if (data) {
//       dispatch(initialBidRequest(true))
//       try {
//         const { fixedPriceSale, fairSale } = data
//         const saleBids = fixedPriceSale ? fixedPriceSale.commitments : fairSale?.bids
//         const sales = (saleBids as any)?.reduce(
//           (_: BidsBySaleId, x: GetAllBidsBySaleId_fixedPriceSale_commitments) => ({
//             [x.sale.id]: {
//               lastUpdated: Date.now(),
//               bids: saleBids,
//             },
//           }),
//           {}
//         )
//         dispatch(initialBidSuccess(sales))
//       } catch (error) {
//         console.error(error)
//         dispatch(initialBidFailure(error))
//       }
//     }
//   }, [account, library, chainId, data])

//   // return {
//   //   allBids,
//   //   bids,
//   //   ...rest,
//   // }
// }

export function useCommitments(saleId: string): UseCommitmentsReturn {
  const dispatch = useDispatch()
  const { data, ...rest } = useQuery<GetAllBidsBySaleId, GetAllBidsBySaleIdVariables>(GET_ALL_BIDS_BY_SALE_ID, {
    variables: { saleId },
  })
  const { account, library, chainId } = useWeb3React()
  const {
    bidsBySaleId: { [saleId]: { updatedAt } = { updatedAt: 0 } },
  } = useSelector(({ bids }) => bids)

  const { bids: allBids } = useReadBidEventFromBlockchain(saleId, 'FixedPriceSale')
  const bids = allBids.filter(bid => bid.user.address.toLowerCase() === account?.toLowerCase()) || []

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
