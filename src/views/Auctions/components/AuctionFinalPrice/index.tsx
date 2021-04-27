// External

import numeral from 'numeral'
import React from 'react'

// Components

import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

// Mesa Utils
import { formatBigInt } from 'src/utils/Defaults'

interface AuctionFinalPriceProps {
  auction: Auction
}

export function AuctionFinalPrice({ auction }: AuctionFinalPriceProps) {
  const pricePerToken = numeral(
    auction.type == 'fixedPriceSale'
      ? formatBigInt(auction.tokenPrice, auction.tokenOut.decimals)
      : formatBigInt(auction.minimumBidAmount, auction.tokenOut.decimals)
  ).format('0.00')

  return (
    <Flex>
      <CardText data-testid="openprice">{pricePerToken}</CardText>
      <CardText fontWeight="light">&nbsp;DAI/{auction.tokenOut?.symbol}</CardText>
    </Flex>
  )
}
