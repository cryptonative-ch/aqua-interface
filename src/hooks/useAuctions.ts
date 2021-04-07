// External
import { useEffect, useState } from 'react'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

interface UseAuctionsReturn {
  loading: boolean
  error: Error | null
  auctions: Auction[]
}

export function useAuctions(): UseAuctionsReturn {
  const [loading, setLoading] = useState<boolean>(true)
  const [error] = useState<Error | null>(null)
  const [auctions, setAuctions] = useState<Auction[]>([])

  useEffect(() => {
    // Populate with fake data
    // startDate and endDate assumes that there are 6000 blocks per 24 hours interval
    // push data once

    setLoading(false)
  }, [auctions])

  return {
    error,
    loading,
    auctions,
  }
}
