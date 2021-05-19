// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
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

// Component
import { secondsTohms, SaleHeader } from './index'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'
import { isSaleOpen, isSaleUpcoming } from 'src/mesa/sale'
import { getSaleDefault, addHours, dateUTC } from 'src/utils/Defaults'

describe('seconds to HMS function', () => {
  describe('convert seconds into different formats', () => {
    test('tests conversion of seconds to minutes', () => {
      expect(secondsTohms(60)).toBe('1m ')
    }),
      test('tests conversion of seconds into days, hours, minutes', () => {
        expect(secondsTohms(20000)).toBe('5h 33m 20s')
      }),
      test('tests negative input', () => {
        expect(() => {
          secondsTohms(-100)
        }).toThrow('seconds cannot be negative')
      })
  })
})

describe('SaleHeader', () => {
  test('it should render the correct sale header', async () => {
    const sale = getSaleDefault({
      startDate: addHours(dateUTC, -24).unix(),
      endDate: addHours(dateUTC, +24).unix(),
    })

    const time_diff_start: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(sale.startDate))
    const time_diff_end: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(sale.endDate))
    let format_time = ''
    if (isSaleUpcoming(sale)) {
      format_time = secondsTohms(time_diff_start)
    } else if (isSaleOpen(sale)) {
      format_time = secondsTohms(time_diff_end)
    }
    const { getByText, getByTestId } = render(<SaleHeader sale={sale} />)
    expect(await getByTestId('format_time')).toHaveTextContent(format_time, { normalizeWhitespace: false })
    expect(getByText('Omen Initial Sale')).toBeInTheDocument()
    expect(getByText('Private')).toBeInTheDocument()
  })
})
