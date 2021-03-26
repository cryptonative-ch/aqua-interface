// External

import React from 'react'

// Components

import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

// Mesa Utils
import { isAuctionUpcoming } from 'src/mesa/auction'

interface AuctionFinalPriceProps {
  auction: Auction
}

const round = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100
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

  /**
   * @todo redo props/redux on VSP to share with other components
   */

  // const pricePerDAI: number = calculateClearingPrice(auction.bids).sellAmount.toNumber()

  // const pricePerToken: number = round(1 / pricePerDAI)

  return (
    <Flex>
      {/* <CardText data-testid="openprice">{pricePerToken}</CardText> */}
      <CardText data-testid="openprice">N/A</CardText>
      <CardText fontWeight="light">&nbsp;DAI/{auction.tokenSymbol}</CardText>
    </Flex>
  )
}
