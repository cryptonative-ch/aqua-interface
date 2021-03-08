// Externals

import React  from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { AuctionNavBar } from './index'
import { AuctionContext, AuctionStatus, AuctionContextType } from '../../index'


/**
 * test when context changes [x]
 * test  if button changes context []
 */

//clean up

afterEach(cleanup)

// helper function
const wrapper = (auction: AuctionContextType) => {
  return render(
    <AuctionContext.Provider value={auction}>
      <AuctionNavBar />
    </AuctionContext.Provider>
  )
}

describe('testing Auction Navigation Menu', () => {
  test('should display the correct style when AuctionStatus is Live', () => {
    const test: AuctionContextType = {
      AuctionShow: AuctionStatus.LIVE,
      setAuctionShow: jest.fn(),
    }
    const { getByTestId } = wrapper(test)
    expect(getByTestId('Live')).toHaveTextContent('Live')
  })
  test('should display the correct style when AuctionStatus is Upcoming', () => {
    const test: AuctionContextType = {
      AuctionShow: AuctionStatus.UPCOMING,
      setAuctionShow: jest.fn(),
    }
    const { getByTestId } = wrapper(test)
    expect(getByTestId('Upcoming')).toHaveTextContent('Upcoming')
  })
  test('should display the correct style when AuctionStatus is Closed', () => {
    const test: AuctionContextType = {
      AuctionShow: AuctionStatus.CLOSED,
      setAuctionShow: jest.fn(),
    }
    const { getByTestId } = wrapper(test)
    expect(getByTestId('Closed')).toHaveTextContent('Closed')
  })
})
