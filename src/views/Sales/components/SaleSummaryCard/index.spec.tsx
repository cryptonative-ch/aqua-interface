// External
import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '../../../../i18n'
import i18n from 'i18next'

// Components
import { SaleSummaryCard } from './index'

// Theme
import { theme } from 'src/styles/theme'
import { ThemeProvider } from 'styled-components'

// defaults
import { getSaleDefault } from 'src/utils/Defaults'

//clean up

afterEach(cleanup)

// tests

describe('testing Sale Summary Card', () => {
  test('should display the correct styling', () => {
    i18n.init({
      fallbackLng: 'en',
      react: {
        useSuspense: false,
      },
    })
    const sale = getSaleDefault({
      startDate: 1646500442,
      endDate: 1678036442,
    })
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <SaleSummaryCard sale={sale} />
      </ThemeProvider>
    )
    expect(getByText('texts.salesType')).toBeInTheDocument()
    expect(getByText('texts.currentPrice')).toBeInTheDocument()
    expect(getByText('texts.amountForSale')).toBeInTheDocument()
    expect(getByText('Private')).toBeInTheDocument()
  })
})
