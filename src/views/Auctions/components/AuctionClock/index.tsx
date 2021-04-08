// Externals
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

// Components
import { Flex } from 'src/components/Flex'
import { Timer, timeFrame } from 'src/views/Auction/components/Timer'

// Interface
import { Auction } from 'src/interfaces/Auction'
import { CardText } from 'src/components/CardText'
import { isAuctionClosed, isAuctionUpcoming } from 'src/mesa/auction'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'

interface AuctionClockProps {
  auction: Auction
}

export const timerPercentage = (auction: Auction) => {
  const localTimeStamp = dayjs(Date.now()).unix()
  const startTime = convertUtcTimestampToLocal(auction.startDate)
  const endTime = convertUtcTimestampToLocal(auction.endDate)
  const totalTime = Math.abs(startTime - endTime)
  const percentage = Math.round((1 - Math.abs(localTimeStamp - endTime) / totalTime) * 100)
  return percentage
}

export const AuctionClock: React.FC<AuctionClockProps> = ({ auction }) => {
  const [time, setTime] = useState(0)
  const [isMobile, setMobile] = useState(window.innerWidth < 770)

  const updateMedia = () => {
    setMobile(window.innerWidth < 770)
  }

  useEffect(() => {
    const interval = setInterval(() => setTime(PrevTime => PrevTime + 1), 1000)
    window.addEventListener('resize', updateMedia)
    return () => {
      window.removeEventListener('resize', updateMedia)
      clearInterval(interval)
    }
  }, [time])

  const color = '#304ffe'

  if (isAuctionClosed(auction)) {
    return (
      <Flex flexDirection="row" justifyContent="space-between">
        <CardText color="grey">Closed</CardText>
        <Flex>
          <Timer auction={auction} />
        </Flex>
      </Flex>
    )
  }

  if (isAuctionUpcoming(auction)) {
    return (
      <>
        {isMobile ? (
          <Flex flexDirection="column" justifyContent="space-between">
            <Flex flexDirection="row" justifyContent="space-between">
              <CardText color="grey">Starts</CardText>
              <CardText>{timeFrame(convertUtcTimestampToLocal(auction.startDate))}</CardText>
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between">
              <CardText color="grey">Ends</CardText>
              <CardText>{timeFrame(convertUtcTimestampToLocal(auction.endDate))}</CardText>
            </Flex>
          </Flex>
        ) : (
          <Flex flexDirection="row" justifyContent="space-between">
            <CardText color="grey">Timeframe</CardText>
            <Timer auction={auction} />
          </Flex>
        )}
      </>
    )
  }

  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <CardText color="grey">Time Remaining</CardText>
      <Flex justifyContent="center">
        <Timer auction={auction} />
        <svg height="16" width="16" style={{ marginLeft: '8px', marginTop: '8px' }}>
          <circle r="8" cx="8" cy="8" fill={color} fillOpacity="0.1" transform="rotate(-90) translate(-16)" />
          <circle
            r="4"
            cx="8"
            cy="8"
            fill="transparent"
            stroke={color}
            strokeOpacity="1"
            strokeWidth="8"
            strokeDasharray={`calc(${timerPercentage(auction)} * 25 / 100) 25`}
            transform="rotate(-90) translate(-16)"
          />
        </svg>
      </Flex>
    </Flex>
  )
}
