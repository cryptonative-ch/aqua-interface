// External
import { useEffect, useState } from 'react'




// Hooks
import { useAuctions } from './useAuctions'

// Interfaces
import { Auction } from 'src/interfaces/Auction'







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
  /**
   * @todo refactor this function
   * function puts another request to the server
   */
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
