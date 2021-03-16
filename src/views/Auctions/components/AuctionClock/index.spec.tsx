import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { AuctionClock, timerPercentage } from './index'

// defaults
import { getAuctionDefault, addHours, dateUTC } from 'src/utils/Defaults'

//clean up

afterEach(cleanup)

// tests

describe('Testing AuctionClock', () => {
  test('should display Timeframe when auction is upcoming', () => {
    const auction = getAuctionDefault({
      startBlock: 1646500442,
      endBlock: 1678036442,
    })

    const { getByText } = render(<AuctionClock auction={auction} />)
    expect(getByText('Timeframe')).toBeInTheDocument()
  }),
    test('should display closed when auction is Closed', () => {
      const auction = getAuctionDefault({
        startBlock: 1520270042,
        endBlock: 1551806042,
      })

      const { getByText } = render(<AuctionClock auction={auction} />)
      expect(getByText('Closed')).toBeInTheDocument()
    }),
    test('should display Time remaining when auction is open', () => {
      const auction = getAuctionDefault({
        startBlock: 1551806042,
        endBlock: 1646500442,
      })
      const { getByText } = render(<AuctionClock auction={auction} />)
      expect(getByText('Time Remaining')).toBeInTheDocument()
    }),
    test('should display SVG circle', () => {
      const auction = getAuctionDefault({
        startBlock: addHours(dateUTC, -1).unix(),
        endBlock: addHours(dateUTC, 24).unix(),
      })
      const { asFragment } = render(<AuctionClock auction={auction} />)
      expect(asFragment()).toMatchSnapshot()
    }),
    test('should calculate percentage of slice according to timer', () => {
      const auction = getAuctionDefault({
        startBlock: addHours(dateUTC, -1).unix(),
        endBlock: addHours(dateUTC, 24).unix(),
      })
      expect(timerPercentage(auction)).toBe(4.0000000000000036)
    })
})
