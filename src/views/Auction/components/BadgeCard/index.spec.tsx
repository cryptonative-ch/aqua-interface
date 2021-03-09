// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { BadgeCard } from './index'

describe('BadgeCard', () => {
  test('should display presale when presale props is input', () => {
    const { getByText } = render(<BadgeCard saleType="presale" />)
    expect(getByText('Pre-sale')).toBeInTheDocument()
  }),
    test('should display private when presale props is input', () => {
      const { getByText } = render(<BadgeCard saleType="private" />)
      expect(getByText('Private')).toBeInTheDocument()
    })
})
