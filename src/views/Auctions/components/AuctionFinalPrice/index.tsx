// External
// import numeral from 'numeral'
import React from 'react'

// Components

import { CardText } from 'src/components/CardSaleBody'
import { Flex } from 'src/components/Flex'

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
    // or some other minimum reserve price
    return (
      <Flex>
        <CardText>N/A</CardText>
        <CardText fontWeight="light">&nbsp;DAI/{auction.tokenSymbol}</CardText>
      </Flex>
    )
  }

  const pricePerDAI: number = calculateClearingPrice(auction.bids).sellAmount.toNumber()

  const pricePerToken: number = 1 / pricePerDAI

  return (
    <Flex>
      <CardText data-testid="openprice">{pricePerToken}</CardText>
      <CardText fontWeight="light">&nbsp;DAI/{auction.tokenSymbol}</CardText>
    </Flex>
  )
}
