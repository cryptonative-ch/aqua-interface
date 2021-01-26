// External
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

// Data generators
import { generateAuctionData } from 'src/data/auction'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

export function useAuctions() {
  const [auctions, setAuctions] = useState<Auction[]>([])

  useEffect(() => {
    const utcDate = dayjs(new Date().toUTCString())
    // Populate with fake data
    // startBlock and endBlock assumes that there are 6000 blocks per 24 hours interval
    // push data once
    setAuctions(generateAuctionData(utcDate.unix()))
  }, [])

  return auctions
}
