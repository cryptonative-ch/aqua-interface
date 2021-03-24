// External
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

// Data generators
import { generateAuctionData } from 'src/data/auction'

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
    const utcDate = dayjs(new Date().toUTCString())
   
    // Populate with fake data
    // startBlock and endBlock assumes that there are 6000 blocks per 24 hours interval
    // push data once
   

    const fetchData = async() => {
      setAuctions(await generateAuctionData(utcDate.unix()))
    }
    fetchData()
    setLoading(false)
  }, [])

  return {
    error,
    loading,
    auctions,
  }
}
