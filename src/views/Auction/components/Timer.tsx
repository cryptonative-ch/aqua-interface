import React, { useEffect, useState } from 'react'
import { Auction } from 'src/interfaces/Auction'
import dayjs from 'dayjs'

interface TimerComponentProps {
  auction: Auction
}

export const Timer: React.FC<TimerComponentProps> = ({ auction }: TimerComponentProps) => {
  const time_diff = Math.abs(dayjs(Date.now()).unix() - auction.endBlock)

  const [time, setTime] = useState(time_diff)

  const format_time = new Date(time_diff * 1000).toISOString().substr(11, 8)

  useEffect(() => {
    const interval = setInterval(() => setTime(PrevTime => PrevTime - 1), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [time])

  

  return (
    <div>
      Auction ends in: <strong>{format_time}</strong>
    </div>
  )
}
