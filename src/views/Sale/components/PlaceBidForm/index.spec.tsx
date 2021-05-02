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
import { getSaleDefault } from 'src/utils/Defaults'

describe('PlaceBidForm', () => {
  test('should display texts', () => {
    i18n.init({
      fallbackLng: 'en',
      react: {
        useSuspense: false,
      },
    })
    const sale = getSaleDefault()
    const { getByText, getByTestId, getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <PlaceBidForm
          onSubmit={() => {
            console.log('Add to Sale')
          }}
          sale={sale}
          currentSettlementPrice={numeral(calculateClearingPrice(sale.bids)).value()}
        />
      </ThemeProvider>
    )
    expect(getByText('Token Price')).toBeInTheDocument()
    expect(getByText('Enter the price you would pay per XYZ token.')).toBeInTheDocument()
    expect(getByText('Amount')).toBeInTheDocument()
    expect(getByText('Enter the amount of DAI you would like to trade. You have 123,456 DAI.')).toBeInTheDocument()
    expect(getByTestId('submit-button')).toHaveAttribute('disabled', '')

    const amountInput = getByLabelText('tokenAmount') as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: 23 } })
    expect(getByTestId('amount-value')).toHaveTextContent('23 DAI')

    const priceInput = getByLabelText('tokenPrice') as HTMLInputElement
    fireEvent.change(priceInput, { target: { value: 25 } })
    expect(getByTestId('price-value')).toHaveTextContent('25 DAI')
  })
})
