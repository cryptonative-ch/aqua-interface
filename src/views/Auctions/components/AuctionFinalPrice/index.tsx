// External

import React from 'react'

// Components

import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

interface AuctionFinalPriceProps {
  auction: Auction
}

export function AuctionFinalPrice({ auction }: AuctionFinalPriceProps) {
  const pricePerToken = auction.type == 'fixedPriceSale' ? auction.minbiddingAmount : auction.minimumBidAmount

  return (
    <Flex>
      <CardText data-testid="openprice">{pricePerToken}</CardText>
      <CardText fontWeight="light">&nbsp;DAI/{auction.tokenOut?.symbol}</CardText>
    </Flex>
  )
}
