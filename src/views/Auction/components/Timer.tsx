// External
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

//Interfaces
import { Auction } from 'src/interfaces/Auction'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'
import { isAuctionClosed, isAuctionOpen, isAuctionUpcoming } from 'src/mesa/auction'

interface TimerComponentProps {
  auction: Auction
}

export const Timer: React.FC<TimerComponentProps> = ({ auction }: TimerComponentProps) => {
  // calculating time difference between local persons time and the start and end block times
  const time_diff_start: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(auction.startBlock))
  const time_diff_end: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(auction.endBlock))

  // setting state to update the timer more frequently than the bids
  const [time, setTime] = useState(0)

  // re-renders component every second
  useEffect(() => {
    const interval = setInterval(() => setTime(PrevTime => PrevTime + 1), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [time])

  if (isAuctionUpcoming(auction)) {
    const format_time = new Date(time_diff_start * 1000).toISOString().substr(11, 8)
    

    return (
      <div>
        Auction starts in: <strong>{format_time}</strong>
      </div>
    )
  } else if (isAuctionOpen(auction)) {
    const format_time = new Date(time_diff_end * 1000).toISOString().substr(11, 8)
    

    return (
      <div>
        Auction ends in: <strong>{format_time}</strong>
      </div>
    )
  } else if (isAuctionClosed(auction)) {
    return <strong>Auction closed</strong>
  } else {
    console.log('broken pl0x fix')
    return null
  }
}
