// Externals
import React  from 'react'
import numeral from 'numeral'

// Components
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'
// Interface
import { Auction } from 'src/interfaces/Auction'

interface AuctionAmountprops {
  auction: Auction
}

export const AuctionAmount: React.FC<AuctionAmountprops> = ({ auction }) => {
  return (
    <Flex>
      <CardText>{numeral(auction.tokenAmount).format('0,0')}</CardText>
      <CardText fontWeight="light">&nbsp;{auction.tokenSymbol}</CardText>
    </Flex>
  )
}
