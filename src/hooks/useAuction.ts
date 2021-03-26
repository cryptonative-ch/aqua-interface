// External
import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'
// Hooks
import { useAuctions } from './useAuctions'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

//subgraph

import { auctionsRequest } from "src/subgraph/Auctions";



const generateAuctionData = async() => {
  const auctionsArray = (await auctionsRequest).auctions.map((element: any) => ({...element,bids: element.bids.map((item: any) => ({...item,buyAmount: BigNumber.from(item.buyAmount), sellAmount: BigNumber.from(item.sellAmount) }))}))

  return [...auctionsArray]
}

interface UseAuctionReturn {
  loading: boolean
  error: Error | null
  auction: Auction | null
}

/**
 *
 * @param auctionId
 */
export function useAuction(auctionId: string): UseAuctionReturn {
  const { auctions } = useAuctions()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [auction, setAuctions] = useState<Auction | null>(null)

  useEffect(() => {
    try {
      const foundAuction = auctions.find(auction => auction.id === auctionId)

      // Auction == null = not found
      if (foundAuction) {
        setAuctions(foundAuction)
      }
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }, [auctions, auctionId])

  return {
    auction,
    loading,
    error,
  }
}
