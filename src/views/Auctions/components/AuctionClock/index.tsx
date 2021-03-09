// Externals
import React, { FunctionComponent } from 'react'
import dayjs from 'dayjs'

// Components
import { Flex } from 'src/components/Flex'
import { Timer } from 'src/views/Auction/components/Timer'

// Interface
import { Auction } from 'src/interfaces/Auction'
import { CardText } from 'src/components/CardText'
import { isAuctionClosed, isAuctionUpcoming } from 'src/mesa/auction'


// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'


interface AuctionClockProps {
  auction: Auction
}




export const AuctionClock: FunctionComponent<AuctionClockProps> = ({ auction }) => {
  const localTimeStamp = dayjs(Date.now()).unix()
  const startTime = convertUtcTimestampToLocal(auction.startBlock)
  const endTime = convertUtcTimestampToLocal(auction.endBlock)
  const totalTime = Math.abs(startTime - endTime)
  const percentage = (1 - Math.abs(localTimeStamp - endTime) / totalTime) * 100
  const color = '#304ffe';



  if (isAuctionClosed(auction)) {
    return (
      <Flex flexDirection="row" justifyContent="space-between">
        <CardText color="grey">Closed</CardText>
        <Flex>
          <Timer auction={auction} />
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
        <svg height='16' width='16'>
          <circle r="8" cx="8" cy="8" fill={color} fillOpacity='0.1' transform="rotate(-90) translate(-16)" />
          <circle r="4" cx="8" cy="8" fill="transparent"
            stroke={color}
            strokeOpacity='1'
            strokeWidth="8"
            strokeDasharray={`calc(${percentage} * 25 / 100) 25`}
            transform="rotate(-90) translate(-16)" />
        </svg>
      </Flex>
    </Flex>
  )
}

