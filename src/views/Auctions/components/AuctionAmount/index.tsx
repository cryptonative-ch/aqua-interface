// Externals
import React from 'react'
import numeral from 'numeral'

// Components
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'
// Interface
import { Auction } from 'src/interfaces/Auction'

// Mesa utils
import { formatBigInt } from 'src/utils/Defaults'

interface AuctionAmountprops {
  auction: Auction
}

export const AuctionAmount: React.FC<AuctionAmountprops> = ({ auction }) => {
  return (
    <Flex>
      <CardText>
        {numeral(
          auction.type == 'fairSale'
            ? formatBigInt(auction.tokenAmount, auction.tokenOut.decimals)
            : formatBigInt(auction.sellAmount, auction.tokenOut.decimals)
        ).format('0,0')}
      </CardText>
      <CardText fontWeight="light">&nbsp;{auction.tokenOut?.symbol}</CardText>
    </Flex>
  )
}
