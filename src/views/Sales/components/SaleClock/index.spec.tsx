import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import durationTime from 'dayjs/plugin/duration'
import DayjsRelativeTime from 'dayjs/plugin/relativeTime'

// Components
import { SaleClock } from 'src/views/Sales/components/SaleClock/index'

// defaults
import { getSaleDefault, addHours, dateUTC, resizeWindow } from 'src/utils'

// theme

import { theme } from 'src/styles/theme'
import { ThemeProvider } from 'styled-components'

// interfaces
import { Sale } from 'src/interfaces/Sale'

// Extends dayjs
dayjs.extend(DayjsRelativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)
dayjs.extend(relativeTime)
dayjs.extend(durationTime)

//clean up

afterEach(cleanup)

// tests

//wrapper

const wrapper = (sale: Sale) => {
  return render(
    <ThemeProvider theme={theme}>
      <SaleClock sale={sale} />
    </ThemeProvider>
  )
}

describe('Testing SaleClock', () => {
  test('should display Timeframe when sale is upcoming', () => {
    const sale = getSaleDefault({
      startDate: 1646500442,
      endDate: 1678036442,
    })

    const { getByText } = wrapper(sale)
    expect(getByText('Timeframe')).toBeInTheDocument()
  }),
    test('should display closed when sale is Closed', () => {
      const sale = getSaleDefault({
        startDate: 1520270042,
        endDate: 1551806042,
      })

      const { getByText } = wrapper(sale)
      expect(getByText('Closed')).toBeInTheDocument()
    }),
    test('should display Time remaining when sale is open', () => {
      const sale = getSaleDefault({
        startDate: 1551806042,
        endDate: 1646500442,
      })
      const { getByText } = wrapper(sale)
      expect(getByText('Time Remaining')).toBeInTheDocument()
    }),
    test('should display SVG circle', () => {
      const sale = getSaleDefault({
        startDate: addHours(dateUTC, -1).unix(),
        endDate: addHours(dateUTC, 24).unix(),
      })
      const { container } = wrapper(sale)
      const circle = container.querySelector('circle')
      expect(circle).not.toBe(null)
    }),
    test('should display Starts when on mobile viewport', () => {
      resizeWindow(500, 1000)

      const sale = getSaleDefault({
        startDate: 1646500442,
        endDate: 1678036442,
      })

      const { getByText } = wrapper(sale)
      expect(getByText('Starts')).toBeInTheDocument()
    }),
    test('should display Ends when on mobile viewport', () => {
      resizeWindow(500, 1000)

      const sale = getSaleDefault({
        startDate: 1646500442,
        endDate: 1678036442,
      })

      const { getByText } = wrapper(sale)
      expect(getByText('Ends')).toBeInTheDocument()
    })
})
