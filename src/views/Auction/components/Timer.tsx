// External
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

//Interfaces
import { Auction } from 'src/interfaces/Auction'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'
import { isAuctionOpen, isAuctionUpcoming } from 'src/mesa/auction'

interface TimerComponentProps {
  auction: Auction
}

export const Timer: React.FC<TimerComponentProps> = ({ auction }: TimerComponentProps) => {
  // calculating time difference between local persons time and the start and end block times
  const time_diff_start: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(auction.startBlock))
  const time_diff_end: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(auction.endBlock))

  // setting state to update the timer more frequently than the bids
  const [time, setTime] = useState(0)

  const secondsTohms = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)

    const hDisplay = String(h).padStart(2, '0') + ':'
    const mDisplay = String(m).padStart(2, '0') + ':'
    const sDisplay = String(s).padStart(2, '0')
    return hDisplay + mDisplay + sDisplay
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
        Auction starts in: <strong>{format_time}</strong>
      </div>
    )
  } else if (isAuctionOpen(auction)) {
    const format_time = secondsTohms(time_diff_end)

    return (
      <div>
        Auction ends in: <strong>{format_time}</strong>
      </div>
    )
  } else {
    return <strong>Auction closed</strong>
  }
}
