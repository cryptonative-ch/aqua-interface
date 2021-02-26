// Externals
import React, { FunctionComponent } from 'react'

// Components
import { DarkCircle, LightCircle } from 'src/components/Circle'
import { Flex } from 'src/components/Flex'
import { Timer } from 'src/views/Auction/components/Timer'

// Interface
import { Auction } from 'src/interfaces/Auction'

interface AuctionClockProps {
  auction: Auction
}

/**
 *
 * @todo Dark circle reduces in size as time goes on revealing light circle
 * @todo find a way to reduce the size of the circle
 */

export const AuctionClock: FunctionComponent<AuctionClockProps> = ({ auction }) => {
  console.log(auction)
  // logic in reducing size of circle according to time

  return (
    <Flex justifyContent='center'>
      <Timer auction={auction} />
      <DarkCircle>
        <LightCircle />
      </DarkCircle>
    </Flex>
  )
}
