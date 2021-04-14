// Externals

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from 'styled-components'
import numeral from 'numeral'
import i18n from 'i18next'

import { calculateClearingPrice } from 'src/mesa/price'

// Component
import { theme } from '../../../../styles/theme'
import { PlaceBidForm } from './index'

//defaults
import { getAuctionDefault } from 'src/utils/Defaults'

describe('PlaceBidForm', () => {
  test('should display texts', () => {
    i18n.init({
      fallbackLng: 'en',
      react: {
        useSuspense: false,
      },
    })
    const auction = getAuctionDefault()
    const { getByText, getByTestId, getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <PlaceBidForm
          onSubmit={() => {
            console.log('Add to Auction')
          }}
          auction={auction}
          currentSettlementPrice={numeral(calculateClearingPrice(auction.bids)).value()}
        />
      </ThemeProvider>
    )
    expect(getByText('Token Price')).toBeInTheDocument()
    expect(getByText(/Enter the price you pay per/)).toBeInTheDocument()
    expect(getByText(/token\./)).toBeInTheDocument()
    expect(getByText('Amount')).toBeInTheDocument()
    expect(getByText(/Enter the amount of/)).toBeInTheDocument()
    expect(getByText(/you would like to trade. You have/)).toBeInTheDocument()
    expect(getByTestId('submit-button')).toHaveAttribute('disabled', '')

    const amountInput = getByLabelText('tokenAmount') as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: 23 } })
    expect(getByTestId('amount-value')).toHaveTextContent('23 DAI')

    const priceInput = getByLabelText('tokenPrice') as HTMLInputElement
    fireEvent.change(priceInput, { target: { value: 25 } })
    expect(getByTestId('price-value')).toHaveTextContent('25 DAI')
  })
})
