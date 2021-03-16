// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { HeaderControl } from './index'

describe('HeaderControl', () => {
  test('should display texts and logo img', () => {
    const { getByText, getByTestId } = render(<HeaderControl status="closed" />)
    expect(getByText('How is the Current Price (CP) calculated?')).toBeInTheDocument()
    expect(getByText('View Live Graph')).toBeInTheDocument()
    expect(getByTestId('logo-img')).toBeInTheDocument()
  }),
    test('should display graph image', () => {
      const { getByTestId } = render(<HeaderControl status="active" />)
      expect(getByTestId('graph-img')).toBeInTheDocument()
    })
})
