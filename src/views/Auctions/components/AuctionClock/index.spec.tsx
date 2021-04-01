import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { AuctionClock, timerPercentage } from './index'

// defaults
import { getAuctionDefault, addHours, dateUTC, resizeWindow } from 'src/utils/Defaults'

// theme

import { theme } from 'src/styles/theme'
import { ThemeProvider } from 'styled-components'

// interfaces
import { Auction } from 'src/interfaces/Auction'

//clean up

afterEach(cleanup)

// tests

//wrapper

const wrapper = (auction: Auction) => {
  return render(
    <ThemeProvider theme={theme}>
      <AuctionClock auction={auction} />
    </ThemeProvider>
  )
}

describe('Testing AuctionClock', () => {
  test('should display Timeframe when auction is upcoming', () => {
    const auction = getAuctionDefault({
      startDate: 1646500442,
      endDate: 1678036442,
    })

    const { getByText } = wrapper(auction)
    expect(getByText('Timeframe')).toBeInTheDocument()
  }),
    test('should display closed when auction is Closed', () => {
      const auction = getAuctionDefault({
        startDate: 1520270042,
        endDate: 1551806042,
      })

      const { getByText } = wrapper(auction)
      expect(getByText('Closed')).toBeInTheDocument()
    }),
    test('should display Time remaining when auction is open', () => {
      const auction = getAuctionDefault({
        startDate: 1551806042,
        endDate: 1646500442,
      })
      const { getByText } = wrapper(auction)
      expect(getByText('Time Remaining')).toBeInTheDocument()
    }),
    test('should display SVG circle', () => {
      const auction = getAuctionDefault({
        startDate: addHours(dateUTC, -1).unix(),
        endDate: addHours(dateUTC, 24).unix(),
      })
      const { container } = wrapper(auction)
      const circle = container.querySelector('circle')
      expect(circle).not.toBe(null)
    }),
    test('should calculate percentage of slice according to timer', () => {
      const auction = getAuctionDefault({
        startDate: addHours(dateUTC, -1).unix(),
        endDate: addHours(dateUTC, 24).unix(),
      })
      expect(timerPercentage(auction)).toBe(4)
    }),
    test('should display Starts when on mobile viewport', () => {
      resizeWindow(500, 1000)

      const auction = getAuctionDefault({
        startDate: 1646500442,
        endDate: 1678036442,
      })

      const { getByText } = wrapper(auction)
      expect(getByText('Starts')).toBeInTheDocument()
    }),
    test('should display Ends when on mobile viewport', () => {
      resizeWindow(500, 1000)

      const auction = getAuctionDefault({
        startDate: 1646500442,
        endDate: 1678036442,
      })

      const { getByText } = wrapper(auction)
      expect(getByText('Ends')).toBeInTheDocument()
    })
})
