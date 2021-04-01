// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { getAuctionDefault, addHours, dateUTC } from 'src/utils/Defaults'

// Component
import { SelfBidList } from './index'

describe('SelfBidList', () => {
  test('should display texts', () => {
    const auction = getAuctionDefault({
      startDate: addHours(dateUTC, -24).unix(),
      endDate: addHours(dateUTC, +24).unix(),
    })
    const { getByText } = render(<SelfBidList auction={auction} />)
    expect(getByText('Token Price')).toBeInTheDocument()
    expect(getByText('Amount')).toBeInTheDocument()
    expect(getByText('Est. Invested')).toBeInTheDocument()
    expect(getByText('DXD')).toBeInTheDocument()
  })
})
