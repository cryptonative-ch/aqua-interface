// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { AuctionFinalPrice } from './index'

// utils
import { getAuctionDefault, addHours, dateUTC } from 'src/utils/Defaults'

describe('testing AuctionFinalPrice', () => {
  test('should display 0 is auction is upcoming', () => {
    const auction = getAuctionDefault({
      startDate: addHours(dateUTC, 14).unix(),
      endDate: addHours(dateUTC, 114).unix(),
    })

    const { getByText } = render(<AuctionFinalPrice auction={auction} />)
    expect(getByText('N/A')).toBeInTheDocument()
  }),
    test('should display final price correctly', () => {
      const auction = getAuctionDefault({
        startDate: addHours(dateUTC, -24).unix(),
        endDate: addHours(dateUTC, +24).unix(),
      })

      const { getByTestId } = render(<AuctionFinalPrice auction={auction} />)
      expect(getByTestId('openprice')).not.toHaveTextContent('N/A')
    })
})
