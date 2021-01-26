// External
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
  const ctx = useRef<HTMLCanvasElement>()

  // const pricePerShareRange = bids.map(getBidPricePerShare).sort((a, b) => a - b)
  // const numberOfSharesRange = bids.map(bid => bid.buyAmount.toNumber()).sort((a, b) => a - b)

  // const [, hiNumberOfShares] = numberOfSharesRange
  // const [, hiPricePerShareRange] = pricePerShareRange

  useEffect(() => {
    const chart = new Chart(ctx.current as HTMLCanvasElement, {
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

    // Build the dataset
    const datasets = bids
      .sort((bidA, bidB) => getBidPricePerShare(bidA) - getBidPricePerShare(bidB))
      .map(bid => {
        return {
          data: [bid.buyAmount.toNumber()],
          backgroundColor: userAddress === bid.address ? 'red' : 'green',
        }
      })

    // Amend data and update
    chart.data = {
      labels: ['Bids'],
      datasets,
    }

    chart.update()
  }, [bids])

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
