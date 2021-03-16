// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { SelfBidList } from './index'

describe('SelfBidList', () => {
  test('should display texts', () => {
    const { getByText } = render(<SelfBidList />)
    expect(getByText('Token Price')).toBeInTheDocument()
    expect(getByText('Amount')).toBeInTheDocument()
    expect(getByText('Est. XYZ')).toBeInTheDocument()
    expect(getByText('0.92 DAI')).toBeInTheDocument()
    expect(getByText('500 DAI')).toBeInTheDocument()
    expect(getByText('562.18 XYZ')).toBeInTheDocument()
  })
})
