// External
import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'src/i18n'
import i18n from 'i18next'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import durationTime from 'dayjs/plugin/duration'
import DayjsRelativeTime from 'dayjs/plugin/relativeTime'

// Extends dayjs
dayjs.extend(DayjsRelativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)
dayjs.extend(relativeTime)
dayjs.extend(durationTime)

// Components
import { SaleSummaryCard } from 'src/views/Sales/components/SaleSummaryCard/index'

// Theme
import { theme } from 'src/styles/theme'
import { ThemeProvider } from 'styled-components'

// defaults
import { getSaleDefault } from 'src/utils/Defaults'

//clean up

afterEach(cleanup)

// tests

describe.skip('testing Sale Summary Card', () => {
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
    expect(getByText('Public')).toBeInTheDocument()
  })
})
