// External

import React from 'react'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { create } from 'react-test-renderer'

// Components
import { AuctionSummaryCard } from './index'

// Interface
import { Auction } from 'src/interfaces/Auction'

// Theme
import { theme } from 'src/styles/theme'
import { ThemeProvider } from 'styled-components'

// defaults
import { getAuctionDefault } from "src/utils/Defaults";

//clean up

afterEach(cleanup)

// tests


describe('testing Auction Summary Card', () => {
  test('should display the correct styling', () => {
    const auction = getAuctionDefault({
      startBlock: 1646500442,
      endBlock: 1678036442,
    })
    const AST = create(
      <ThemeProvider theme={theme}>
        <AuctionSummaryCard auction={auction} />
      </ThemeProvider>
    )
    expect(AST.toJSON()).toMatchSnapshot()
  })
})
