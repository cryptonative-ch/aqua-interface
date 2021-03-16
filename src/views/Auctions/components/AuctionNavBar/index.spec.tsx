// Externals

import React from 'react'
import { render, cleanup, fireEvent, waitFor, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { AuctionNavBar } from './index'
import { AuctionContext, AuctionStatus, AuctionContextType } from '../../index'

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

describe('testing AuctionNavBar', () => {
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
  }),
    test('button should be called when upcoming is clicked when on closed status', async () => {
      const test: AuctionContextType = {
        AuctionShow: AuctionStatus.CLOSED,
        setAuctionShow: jest.fn(),
      }

      const { getByTestId } = wrapper(test)

      fireEvent.click(getByTestId('closedupcomingclick'))

      expect(test.setAuctionShow).toHaveBeenCalled()
    }),
    test('button should be called when live is clicked when on upcoming status', async () => {
      const test: AuctionContextType = {
        AuctionShow: AuctionStatus.CLOSED,
        setAuctionShow: jest.fn(),
      }

      const { getByTestId } = wrapper(test)

      fireEvent.click(getByTestId('closed live click'))

      expect(test.setAuctionShow).toHaveBeenCalled()
    }),
    test('button should be called when closed is clicked when on live status', async () => {
      const test: AuctionContextType = {
        AuctionShow: AuctionStatus.LIVE,
        setAuctionShow: jest.fn(),
      }

      const { getByTestId } = wrapper(test)

      fireEvent.click(getByTestId('live closed click'))

      expect(test.setAuctionShow).toHaveBeenCalled()
    }),
    test('button should be called when live is clicked when on upcoming status', async () => {
      const test: AuctionContextType = {
        AuctionShow: AuctionStatus.UPCOMING,
        setAuctionShow: jest.fn(),
      }

      const { getByTestId } = wrapper(test)

      fireEvent.click(getByTestId('upcoming live click'))

      expect(test.setAuctionShow).toHaveBeenCalled()
    }),
    test('button should be called when upcoming is clicked when on live status', async () => {
      const test: AuctionContextType = {
        AuctionShow: AuctionStatus.LIVE,
        setAuctionShow: jest.fn(),
      }

      const { getByTestId } = wrapper(test)

      fireEvent.click(getByTestId('live upcoming click'))

      expect(test.setAuctionShow).toHaveBeenCalled()
    }),
    test('button should be called when close is clicked when on upcoming status', async () => {
      const test: AuctionContextType = {
        AuctionShow: AuctionStatus.UPCOMING,
        setAuctionShow: jest.fn(),
      }

      const { getByTestId } = wrapper(test)

      fireEvent.click(getByTestId('upcoming close click'))

      expect(test.setAuctionShow).toHaveBeenCalled()
    })
})
