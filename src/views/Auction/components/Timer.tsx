// External
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'


// Components 
import { CardText } from "src/components/CardSaleBody";

//Interfaces
import { Auction } from 'src/interfaces/Auction'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'
import { isAuctionOpen, isAuctionUpcoming } from 'src/mesa/auction'

interface TimerComponentProps {
  auction: Auction
}



/**
 * 
 * @todo change auction closed to show local time
 * @todo show timer as proportion of circle completed
 * 
 */
export const Timer: React.FC<TimerComponentProps> = ({ auction }: TimerComponentProps) => {
  // calculating time difference between local persons time and the start and end block times
  const time_diff_start: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(auction.startBlock))
  const time_diff_end: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(auction.endBlock))

  // setting state to update the timer more frequently than the bids
  const [time, setTime] = useState(0)

  const secondsTohms = (seconds: number) => {
    const d = Math.floor(seconds / 86400)
    const h = Math.floor(seconds % 86400 / 3600)
    const m = Math.floor(((seconds % 86400) % 3600) / 60)
    const s = Math.floor((seconds % 86400) % 3600) % 60

    const dDisplay = d > 0 ? d + 'd ' : ' '
    const hDisplay =  h > 0 ? h + 'h ' : ' ' 
    const mDisplay = m > 0 ? m + 'm ': ' ' 
    const sDisplay = s > 0 ? s + 's ': ' ' 
    return dDisplay + hDisplay + mDisplay + sDisplay
  }

  // re-renders component every second
  useEffect(() => {
    const interval = setInterval(() => setTime(PrevTime => PrevTime + 1), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [time])

  if (isAuctionUpcoming(auction)) {
    const format_time = secondsTohms(time_diff_start)

    return (
      <div>
         <CardText>{format_time}</CardText>
      </div>
    )
  } else if (isAuctionOpen(auction)) {
    const format_time = secondsTohms(time_diff_end)

    return (
      <div>
        <CardText>{format_time}</CardText>
      </div>
    )
  } else {
    return <CardText>Auction closed</CardText>
  }
}
