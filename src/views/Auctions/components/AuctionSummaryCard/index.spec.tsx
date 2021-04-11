// External
import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '../../../../i18n'
import i18n from 'i18next'


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
      startBlock: 1646500442,
      endBlock: 1678036442,
    })
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <AuctionSummaryCard auction={auction} />
      </ThemeProvider>
    )
    expect(getByText('texts.salesType')).toBeInTheDocument()
    expect(getByText('texts.currentPrice')).toBeInTheDocument()
    expect(getByText('texts.amountForSale')).toBeInTheDocument()
    expect(getByText('Pre-sale')).toBeInTheDocument()
    expect(getByText('Private')).toBeInTheDocument()
  })
})