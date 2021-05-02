// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { HeaderControl } from './index'

// Mesa utils
import { getSaleDefault } from 'src/utils/Defaults'

describe('HeaderControl', () => {
  test('should display texts and logo img', () => {
    const { getByText, getByTestId } = render(<HeaderControl status="closed" />)
    expect(getByText('Missed out on the sale? You can get ERT on')).toBeInTheDocument()
    expect(getByText('Go to Swapr')).toBeInTheDocument()
    expect(getByTestId('logo-img')).toBeInTheDocument()
  }),
    test('should display graph image', () => {
      const { getByTestId } = render(<HeaderControl status="active" />)
      expect(getByTestId('graph-img')).toBeInTheDocument()
    })
})
