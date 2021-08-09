// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { getSaleDefault, addHours, dateUTC } from 'src/utils/helpers'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import durationTime from 'dayjs/plugin/duration'
import DayjsRelativeTime from 'dayjs/plugin/relativeTime'

// Component
import { SelfBidList } from 'src/views/Sale/components/SelfBidList/index'

// Extends dayjs
dayjs.extend(DayjsRelativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)
dayjs.extend(relativeTime)
dayjs.extend(durationTime)

describe('SelfBidList', () => {
  test.skip('should display texts', () => {
    const sale = getSaleDefault({
      startDate: addHours(dateUTC, -24).unix(),
      endDate: addHours(dateUTC, +24).unix(),
    })
    const { getByText } = render(<SelfBidList sale={sale} bids={sale.bids} />)
    expect(getByText('Token Price')).toBeInTheDocument()
    expect(getByText('Amount')).toBeInTheDocument()
    expect(getByText('Est. Invested')).toBeInTheDocument()
    expect(getByText('DXD')).toBeInTheDocument()
  })
})
