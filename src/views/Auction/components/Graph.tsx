// Externals
import React, { useEffect, useRef } from 'react'
import { Chart } from 'chart.js'

// Interfaces
import { AuctionBid } from 'src/interfaces/Auction'

interface GraphComponentProps {
  userAddress: string
  bids: AuctionBid[]
  height: number
  width: number
}

const getBidPricePerShare = (bid: AuctionBid) => bid.sellAmount.toNumber() / bid.buyAmount.toNumber()

export function Graph({ bids, userAddress }: GraphComponentProps) {
  const chartInstance = useRef<Chart>()
  const ctx = useRef<HTMLCanvasElement>()

  useEffect(() => {
    if (chartInstance.current) {
      console.log('Updating the chart data')

      // Build the dataset
      const datasets = bids
        .sort((bidA, bidB) => getBidPricePerShare(bidA) - getBidPricePerShare(bidB))
        .map(bid => {
          return {
            data: [bid.buyAmount.toNumber()],
            backgroundColor: userAddress === bid.address ? '#4895ef' : '#4361ee',
          }
        })

      // Amend data and update
      chartInstance.current.data = {
        labels: ['Bids'],
        datasets,
      }

      chartInstance.current.update()
      return
    }

    chartInstance.current = new Chart(ctx.current as HTMLCanvasElement, {
      type: 'bar',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        hover: {
          onHover: () => {
            return false
          },
        },
        animation: {
          duration: 0,
        },
      },
    })
  }, [bids, userAddress])

  return (
    <canvas
      width="100%"
      height="300"
      ref={e => {
        if (e) {
          ctx.current = e
        }
      }}
    />
  )
}
