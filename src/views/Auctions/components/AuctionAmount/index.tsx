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
 *
 * @todo update these when adam finishes subgraph
 */
export const AuctionAmount: React.FC<AuctionAmountprops> = ({ auction }) => {
  return (
    <Flex>
      <CardText>
        {numeral(auction.type == 'easyAuction' ? auction.tokenAmount : auction.minFundingThreshold).format('0,0')}
      </CardText>
      <CardText fontWeight="light">
        &nbsp;{auction.type == 'easyAuction' ? auction.tokenOut?.symbol : auction.tokenInAmount}
      </CardText>
    </Flex>
  )
}
