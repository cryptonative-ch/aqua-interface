import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { AuctionClock, timerPercentage } from './index'

// defaults
import { getAuctionDefault, addHours, dateUTC } from 'src/utils/Defaults'

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

const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x
  window.innerHeight = y
  window.dispatchEvent(new Event('resize'))
}

describe('Testing AuctionClock', () => {
  test('should display Timeframe when auction is upcoming', () => {
    const auction = getAuctionDefault({
      startBlock: 1646500442,
      endBlock: 1678036442,
    })

    const { getByText } = wrapper(auction)
    expect(getByText('Timeframe')).toBeInTheDocument()
  }),
    test('should display closed when auction is Closed', () => {
      const auction = getAuctionDefault({
        startBlock: 1520270042,
        endBlock: 1551806042,
      })

      const { getByText } = wrapper(auction)
      expect(getByText('Closed')).toBeInTheDocument()
    }),
    test('should display Time remaining when auction is open', () => {
      const auction = getAuctionDefault({
        startBlock: 1551806042,
        endBlock: 1646500442,
      })
      const { getByText } = wrapper(auction)
      expect(getByText('Time Remaining')).toBeInTheDocument()
    }),
    test('should display SVG circle', () => {
      const auction = getAuctionDefault({
        startBlock: addHours(dateUTC, -1).unix(),
        endBlock: addHours(dateUTC, 24).unix(),
      })
      const { asFragment } = wrapper(auction)
      expect(asFragment()).toMatchSnapshot()
    }),
    test('should calculate percentage of slice according to timer', () => {
      const auction = getAuctionDefault({
        startBlock: addHours(dateUTC, -1).unix(),
        endBlock: addHours(dateUTC, 24).unix(),
      })
      expect(timerPercentage(auction)).toBe(4.0000000000000036)
    }),
    test('should display Starts when on mobile viewport', () => {
      resizeWindow(500, 1000)

      const auction = getAuctionDefault({
        startBlock: 1646500442,
        endBlock: 1678036442,
      })

      const { getByText } = wrapper(auction)
      expect(getByText('Starts')).toBeInTheDocument()
    }),
    test('should display Ends when on mobile viewport', () => {
      resizeWindow(500, 1000)

      const auction = getAuctionDefault({
        startBlock: 1646500442,
        endBlock: 1678036442,
      })

      const { getByText } = wrapper(auction)
      expect(getByText('Ends')).toBeInTheDocument()
    })
})
