// External
import { useEffect, useState } from 'react'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

//subgraph

import { auctionsRequest } from 'src/subgraph/Auctions'

const getAuctions = async () => {
  console.log(await auctionsRequest)

  const easyAuctions = (await auctionsRequest).Easyauctions

  const easyAuctionType = easyAuctions.map((item:any) => ({...item, type: 'easyAuction'}))

  const fixedPriceAuctions = (await auctionsRequest).fixedPriceAuctions

  const fixedPriceAuctionsType = fixedPriceAuctions.map((item:any) => ({...item, type: 'fixedPriceAuctions'}))

  const auctionsArray = easyAuctionType.map((item: unknown[], i: number) => Object.assign({}, item, fixedPriceAuctionsType[i]))

  return [...auctionsArray]
}

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

    const fetchData = async () => {
      setAuctions(await getAuctions())
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
