// External
import { useEffect, useState } from 'react'

// Data generators
import { generateAuctionData } from 'src/data/auction'

// Hooks
import { useBlockNumber } from './useBlockNumber'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

export function useAuctions() {
  const [auctions, setAuctions] = useState<Auction[]>([])
  const blockNumber = useBlockNumber()

  useEffect(() => {
    // Populate with fake data
    // startBlock and endBlock assumes that there are 6000 blocks per 24 hours interval
    // push data once
    if (blockNumber === 0 || auctions.length) {
      return
    }
    setAuctions(generateAuctionData(blockNumber))
  }, [blockNumber])

  return auctions
}
