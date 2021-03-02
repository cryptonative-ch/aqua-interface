// Externals
import React, { FunctionComponent } from 'react'

// Components
import { DarkCircle, LightCircle } from 'src/components/Circle'
import { Flex } from 'src/components/Flex'
import { Timer } from 'src/views/Auction/components/Timer'

// Interface
import { Auction } from 'src/interfaces/Auction'
import { CardText } from 'src/components/CardSaleBody'
import { isAuctionClosed, isAuctionUpcoming } from 'src/mesa/auction'

interface AuctionClockProps {
  auction: Auction
}

export const AuctionClock: FunctionComponent<AuctionClockProps> = ({ auction }) => {
  if (isAuctionClosed(auction)) {
    return (
      <Flex flexDirection="row" justifyContent="space-between">
        <CardText color="grey">Closed</CardText>
        <Flex>
          <Timer auction={auction} />
          <DarkCircle>
            <LightCircle />
          </DarkCircle>
        </Flex>
      </Flex>
    )
  } else if (isAuctionUpcoming(auction)) {
    return (
      <Flex flexDirection="row" justifyContent="space-between">
        <CardText color="grey">Timeframe</CardText>
        <Timer auction={auction} />
      </Flex>
    )
  }

  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <CardText color="grey">Time Remaining</CardText>
      <Flex>
        <Timer auction={auction} />
        <DarkCircle>
          <LightCircle />
        </DarkCircle>
      </Flex>
    </Flex>
  )
}
