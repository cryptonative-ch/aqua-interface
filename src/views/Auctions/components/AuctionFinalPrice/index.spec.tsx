// Externals

import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { AuctionFinalPrice } from './index'

// utils
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
      <AuctionFinalPrice auction={auction} />
    </ThemeProvider>
  )
}

describe('testing AuctionFinalPrice', () => {
  test('should display 0 is auction is upcoming', () => {
    const auction = getAuctionDefault({
      startBlock: addHours(dateUTC, 14).unix(),
      endBlock: addHours(dateUTC, 114).unix(),
    })

    const { getByText } = wrapper(auction)
    expect(getByText('N/A')).toBeInTheDocument()
  }),
    test('should display final price correctly', () => {
      const auction = getAuctionDefault({
        startBlock: addHours(dateUTC, -24).unix(),
        endBlock: addHours(dateUTC, +24).unix(),
      })

      const { getByTestId } = wrapper(auction)
      expect(getByTestId('openprice')).not.toHaveTextContent('N/A')
    })
})
