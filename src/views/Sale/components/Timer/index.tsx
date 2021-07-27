// External
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import momentTimeZone from 'moment-timezone'

// Components
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'

//Interfaces
import { Sale } from 'src/interfaces/Sale'
import { isSaleOpen, isSaleUpcoming } from 'src/aqua/sale'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'

interface TimerComponentProps {
  sale: Sale
}

export const secondsTohms = (seconds: number) => {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor(((seconds % 86400) % 3600) / 60)
  const s = Math.floor((seconds % 86400) % 3600) % 60

  const dDisplay = d > 0 ? d + 'd ' : ''
  const hDisplay = h > 0 ? h + 'h ' : ''
  const mDisplay = m > 0 ? m + 'm ' : ''
  const sDisplay = s > 0 && h == 0 && d == 0 ? s + 's' : ''

  if (seconds < 0) {
    throw Error('seconds cannot be negative')
  }

  return dDisplay + hDisplay + mDisplay + sDisplay
}

export const timeEnd = (unixtmestamp: number, timezone?: string) => {
  if (unixtmestamp < 0) {
    throw new Error('unixtimestamp cannot be negative')
  }

  const timeZoneGuess = new Intl.DateTimeFormat(
    'en-US',
    timezone ? { timeZone: `${timezone}` } : undefined
  ).resolvedOptions().timeZone

  const date = momentTimeZone
    .unix(unixtmestamp)
    .tz(typeof timezone !== 'undefined' ? timeZoneGuess : momentTimeZone.tz.guess())
    .format('MMM D, H:mm')

  const timeZoneStamp = momentTimeZone
    .tz(typeof timezone !== 'undefined' ? timeZoneGuess : momentTimeZone.tz.guess())
    .zoneAbbr()

  return `${date} ${timeZoneStamp}`
}

export const Timer: React.FC<TimerComponentProps> = ({ sale }: TimerComponentProps) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTime(PrevTime => PrevTime + 1), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [time])

  const localTimeStamp = dayjs(Date.now()).unix()

  const timeDiffEnd = Math.abs(localTimeStamp - convertUtcTimestampToLocal(sale.endDate))

  if (isSaleUpcoming(sale)) {
    return (
      <Flex>
        <CardText data-testid="open">{timeEnd(sale.startDate)}</CardText>
        <CardText color="grey">&nbsp;to&nbsp;</CardText>
        <CardText>{timeEnd(sale.endDate)}</CardText>
      </Flex>
    )
  } else if (isSaleOpen(sale)) {
    const format_time = secondsTohms(timeDiffEnd)

    return (
      <Flex>
        <CardText data-testid="open">{format_time}</CardText>
      </Flex>
    )
  }
  return (
    <Flex>
      <CardText data-testid="closed">{timeEnd(sale.endDate)}</CardText>
    </Flex>
  )
}
