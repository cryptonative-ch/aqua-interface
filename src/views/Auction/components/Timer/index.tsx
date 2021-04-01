// External
import React from 'react'
import dayjs from 'dayjs'

// Components
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'

//Interfaces
import { Auction } from 'src/interfaces/Auction'
import { isAuctionOpen, isAuctionUpcoming } from 'src/mesa/auction'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'

interface TimerComponentProps {
  auction: Auction
}

export const secondsTohms = (seconds: number) => {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor(((seconds % 86400) % 3600) / 60)
  const s = Math.floor((seconds % 86400) % 3600) % 60

  const dDisplay = d > 0 ? d + 'd ' : ''
  const hDisplay = h > 0 ? h + 'h ' : ''
  const mDisplay = m > 0 ? m + 'm ' : ''
  const sDisplay = s > 0 ? s + 's' : ''

  if (seconds < 0) {
    throw Error('seconds cannot be negative')
  }

  return dDisplay + hDisplay + mDisplay + sDisplay
}

export const timeFrame = (unixSeconds: number) => {
  const diff = new Date().getTimezoneOffset()
  const endDateDateTime = new Date(unixSeconds * 1000 + diff * 1000 * 60).toString()
  const endDate = endDateDateTime.slice(4, 10)
  const endTime = endDateDateTime.slice(15, 21)
  const timeZoneStamp = endDateDateTime.slice(25, 28)

  if (unixSeconds < 0) {
    throw Error('seconds cannot be negative')
  }

  return `${endDate}, ${endTime} ${timeZoneStamp}`
}

export const Timer: React.FC<TimerComponentProps> = ({ auction }: TimerComponentProps) => {
  const localTimeStamp = dayjs(Date.now()).unix()

  const timeDiffEnd = Math.abs(localTimeStamp - convertUtcTimestampToLocal(auction.endDate))

  if (isAuctionUpcoming(auction)) {
    return (
      <Flex>
        <CardText data-testid="open">{timeFrame(convertUtcTimestampToLocal(auction.startDate))}</CardText>
        <CardText color="grey">&nbsp;to&nbsp;</CardText>
        <CardText>{timeFrame(convertUtcTimestampToLocal(auction.endDate))}</CardText>
      </Flex>
    )
  } else if (isAuctionOpen(auction)) {
    const format_time = secondsTohms(timeDiffEnd)

    return (
      <Flex>
        <CardText data-testid="open">{format_time}</CardText>
      </Flex>
    )
  }
  return (
    <Flex>
      <CardText data-testid="closed">{timeFrame(auction.endDate)}</CardText>
    </Flex>
  )
}
