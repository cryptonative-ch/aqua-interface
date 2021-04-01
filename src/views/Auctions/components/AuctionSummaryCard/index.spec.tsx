// External

import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// Components
import { AuctionSummaryCard } from './index'

// Theme
import { theme } from 'src/styles/theme'
import { ThemeProvider } from 'styled-components'

// defaults
import { getAuctionDefault } from 'src/utils/Defaults'

//clean up

afterEach(cleanup)

// tests

describe('testing Auction Summary Card', () => {
  test('should display the correct styling', () => {
    const auction = getAuctionDefault({
      startDate: 1646500442,
      endDate: 1678036442,
    })
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <AuctionSummaryCard auction={auction} />
      </ThemeProvider>
    )
    expect(getByText('Auction Type')).toBeInTheDocument()
    expect(getByText('Point Dutch')).toBeInTheDocument()
    expect(getByText('Current Price')).toBeInTheDocument()
    expect(getByText('Amount for Sale')).toBeInTheDocument()
    expect(getByText('Pre-sale')).toBeInTheDocument()
    expect(getByText('Private')).toBeInTheDocument()
  })
})
