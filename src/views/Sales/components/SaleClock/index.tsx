// Externals
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

// Components
import { Flex } from 'src/components/Flex'
import { Timer, timeEnd } from 'src/views/Sale/components/Timer'

// Interface
import { CardText } from 'src/components/CardText'
import { isSaleClosed, isSaleUpcoming } from 'src/aqua/sale'
import { GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale } from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'

interface SaleClockProps {
  sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale
  margin?: string
}

export const timerPercentage = (sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale) => {
  const localTimeStamp = dayjs(Date.now()).unix()
  const startTime = convertUtcTimestampToLocal(sale.startDate)
  const endTime = convertUtcTimestampToLocal(sale.endDate)
  const totalTime = Math.abs(startTime - endTime)
  const percentage = Math.round((1 - Math.abs(localTimeStamp - endTime) / totalTime) * 100)
  return percentage
}

export const SaleClock: React.FC<SaleClockProps> = ({ sale, margin }) => {
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

  if (isSaleClosed(sale)) {
    return (
      <Flex margin={margin} flexDirection="row" justifyContent="space-between">
        <CardText color="grey">Closed</CardText>
        <Flex>
          <Timer sale={sale} />
        </Flex>
      </Flex>
    )
  }

  if (isSaleUpcoming(sale)) {
    return (
      <>
        {isMobile ? (
          <Flex flexDirection="column" justifyContent="space-between">
            <Flex flexDirection="row" justifyContent="space-between">
              <CardText color="grey">Starts</CardText>
              <CardText>{timeEnd(sale.startDate)}</CardText>
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between">
              <CardText color="grey">Ends</CardText>
              <CardText>{timeEnd(sale.endDate)}</CardText>
            </Flex>
          </Flex>
        ) : (
          <Flex flexDirection="row" justifyContent="space-between">
            <CardText color="grey">Timeframe</CardText>
            <Timer sale={sale} />
          </Flex>
        )}
      </>
    )
  }

  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <CardText color="grey">Time Remaining</CardText>
      <Flex justifyContent="center">
        <Timer sale={sale} />
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
            strokeDasharray={`calc(${timerPercentage(sale)} * 25 / 100) 25`}
            transform="rotate(-90) translate(-16)"
          />
        </svg>
      </Flex>
    </Flex>
  )
}
