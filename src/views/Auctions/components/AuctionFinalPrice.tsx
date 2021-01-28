// External
import numeral from 'numeral'
import React from 'react'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

// Mesa Utils
import { calculateClearingPrice } from 'src/mesa/price'
import { isAuctionUpcoming } from 'src/mesa/auction'

interface AuctionFinalPriceProps {
  auction: Auction
}

export function AuctionFinalPrice({ auction }: AuctionFinalPriceProps) {
  if (isAuctionUpcoming(auction)) {
    return null
  }

  return (
    <div>
      {numeral(calculateClearingPrice(auction.bids).sellAmount.toNumber()).format('0,0')} {auction.tokenSymbol} = 1 DAI
    </div>
  )
}
