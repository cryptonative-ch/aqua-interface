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
import { SaleHeader } from 'src/views/Sale/components/SaleHeader/index'
import { secondsTohms } from 'src/views/Sale/components/Timer'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'
import { isSaleOpen, isSaleUpcoming } from 'src/aqua/sale'
import { getSaleDefault, addHours, dateUTC } from 'src/utils/helpers'

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
    expect(getByText('Omen')).toBeInTheDocument()
    expect(getByText('Public')).toBeInTheDocument()
  })
})
