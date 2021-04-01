// External
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

// subgraph

import { getAuctionsData } from 'src/subgraph'

//redux
import { RootState } from 'src/redux/store'
import { generateAuctions } from 'src/redux/auctionListings'

interface UseAuctionsReturn {
  loading: boolean
  error: Error | null
  auctions: Auction[]
}

export function useAuctions(): UseAuctionsReturn {
  const [loading, setLoading] = useState<boolean>(true)
  const [error] = useState<Error | null>(null)
  const [auctions, setAuctions] = useState<Auction[]>([])
  const dispatch = useDispatch()
  const reduxAuctionsStore = useSelector<RootState, Auction[]>(state => {
    return state.AuctionReducer.auctions
  })

  const fetchData = async () => {
    dispatch(generateAuctions(await getAuctionsData()))
  }

  useEffect(() => {
    // Populate with fake data
    // startDate and endDate assumes that there are 6000 blocks per 24 hours interval
    // push data once
    fetchData()
    setAuctions(reduxAuctionsStore)
    setLoading(false)
  }, [])

  return {
    error,
    loading,
    auctions,
  }
}
