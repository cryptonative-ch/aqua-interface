import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { AuctionAmount } from './index'

// defaults
import { formatDecimal, getAuctionDefault } from 'src/utils/Defaults'

// theme

import { theme } from 'src/styles/theme'
import { ThemeProvider } from 'styled-components'

// interfaces
import { Auction } from 'src/interfaces/Auction'

//clean up

afterEach(cleanup)

//wrapper

const wrapper = (auction: Auction) => {
  return render(
    <ThemeProvider theme={theme}>
      <AuctionAmount auction={auction} />
    </ThemeProvider>
  )
}

// tests

const auction = getAuctionDefault({ sellAmount: formatDecimal('5000.0e+18') }, 'fixedPriceSale')

describe('AuctionAmount tests', () => {
  test('should display correct Amount', () => {
    const { getByText } = wrapper(auction)
    expect(getByText('5,000')).toBeInTheDocument()
  })
})
