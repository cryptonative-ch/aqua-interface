// Externals
import React from 'react'
import numeral from 'numeral'

// Components
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'
// Interface
import { Auction } from 'src/interfaces/Auction'

interface AuctionAmountprops {
  auction: Auction
}
/**
 * @todo update these when adam finishes subgraph
 */
export const AuctionAmount: React.FC<AuctionAmountprops> = ({ auction }) => {
  return (
    <Flex>
      <CardText>
        {numeral(auction.type == 'fairSale' ? auction.tokenAmount : auction.sellAmount).format('0,0')}
      </CardText>
      <CardText fontWeight="light">&nbsp;{auction.tokenOut?.symbol}</CardText>
    </Flex>
  )
}
