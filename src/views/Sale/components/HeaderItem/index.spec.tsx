// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { HeaderItem } from 'src/views/Sale/components/HeaderItem/index'

describe('HeaderItem', () => {
  test('should display texts', () => {
    const { getByText } = render(<HeaderItem title="Current Price" description="0.88 DAI/XYZ" />)
    expect(getByText('Current Price')).toBeInTheDocument()
    expect(getByText('0.88 DAI/XYZ')).toBeInTheDocument()
  })
})
