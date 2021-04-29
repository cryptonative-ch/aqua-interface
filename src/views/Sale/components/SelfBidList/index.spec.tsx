// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { getSaleDefault, addHours, dateUTC } from 'src/utils/Defaults'

// Component
import { SelfBidList } from './index'

describe('SelfBidList', () => {
  test('should display texts', () => {
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
