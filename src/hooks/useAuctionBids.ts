// External
import { useEffect, useState } from 'react'

// Hooks
import { useAuctions } from './useAuctions'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

/**
 *
 * @param auctionId
 */
export function useAuctionBids(auctionId: string) {
  const auctions = useAuctions()
  const [auction, setAuctions] = useState<Auction>()

  useEffect(() => {
    setAuctions(auctions.find(auction => auction.id === auctionId))
  }, [auctions])

  return auction
}
