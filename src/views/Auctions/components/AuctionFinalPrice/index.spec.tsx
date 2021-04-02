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
  test('should display final price correctly', () => {
    const auction = getAuctionDefault('easyAuction', {
      startDate: addHours(dateUTC, -24).unix(),
      endDate: addHours(dateUTC, +24).unix(),
    })
    const { getByTestId } = wrapper(auction)
    expect(getByTestId('openprice')).toHaveTextContent('10')
  })
})
