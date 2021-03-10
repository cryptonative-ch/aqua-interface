import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { AuctionClock } from './index'

// defaults
import { getAuctionDefault } from "src/utils/Defaults";

//clean up

afterEach(cleanup)

// tests







describe('Testing AuctionClock', () => {
  test('should display Timeframe when auction is upcoming', () => {

    const auction = getAuctionDefault({
      startBlock: 1646500442,
      endBlock: 1678036442
    })

    const { getByText } = render(<AuctionClock auction={auction} />)
    expect(getByText('Timeframe')).toBeInTheDocument();
  }),
    test('should display closed when auction is Closed', () => {
      const auction = getAuctionDefault({
        startBlock: 1520270042,
        endBlock: 1551806042,
      })


      const { getByText } = render(<AuctionClock auction={auction} />)
      expect(getByText('Closed')).toBeInTheDocument();
    })
    ,
    test('should display Time remaining when auction is open', () => {
      const auction = getAuctionDefault({
        startBlock: 1551806042,
        endBlock: 1646500442,
      })
      const { getByText } = render(<AuctionClock auction={auction} />)
      expect(getByText('Time Remaining')).toBeInTheDocument();
    })



})
