// Externals
import React, { FunctionComponent } from 'react'
import numeral from 'numeral'

// Components
import { CardText } from 'src/components/CardSaleBody'
import { Flex } from 'src/components/Flex'
// Interface
import { Auction } from 'src/interfaces/Auction'

interface AuctionAmountprops {
  auction: Auction
}

export const AuctionAmount: FunctionComponent<AuctionAmountprops> = ({ auction }) => {
  return (
    <Flex>
      <CardText>{numeral(auction.tokenAmount).format('0,0')}</CardText>
      <CardText fontWeight="light">&nbsp;{auction.tokenSymbol}</CardText>
    </Flex>
  )
}
