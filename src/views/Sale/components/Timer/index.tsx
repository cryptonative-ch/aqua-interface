// External
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import moment from 'moment-timezone'

// Components
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'

//Interfaces
import { Sale } from 'src/interfaces/Sale'
import { isSaleOpen, isSaleUpcoming } from 'src/mesa/sale'

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
  const timeZoneStamp = moment().tz(moment.tz.guess()).format('z');

  if (unixSeconds < 0) {
    throw Error('seconds cannot be negative')
  }

  return `${endDate}, ${endTime} ${timeZoneStamp}`
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
        <CardText data-testid="open">{timeFrame(convertUtcTimestampToLocal(sale.startDate))}</CardText>
        <CardText color="grey">&nbsp;to&nbsp;</CardText>
        <CardText>{timeFrame(convertUtcTimestampToLocal(sale.endDate))}</CardText>
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
      <CardText data-testid="closed">{timeFrame(sale.endDate)}</CardText>
    </Flex>
  )
}
