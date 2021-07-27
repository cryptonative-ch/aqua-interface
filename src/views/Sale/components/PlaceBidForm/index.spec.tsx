// Externals

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from 'styled-components'
import numeral from 'numeral'
import i18n from 'i18next'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import durationTime from 'dayjs/plugin/duration'
import DayjsRelativeTime from 'dayjs/plugin/relativeTime'

// Component
import { theme } from 'src/styles/theme'
import { PlaceBidForm } from 'src/views/Sale/components/PlaceBidForm/index'
import { calculateClearingPrice } from 'src/aqua/price'
//defaults
import { getSaleDefault } from 'src/utils/Defaults'

// Extends dayjs
dayjs.extend(DayjsRelativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)
dayjs.extend(relativeTime)
dayjs.extend(durationTime)

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
