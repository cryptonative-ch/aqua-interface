// Externals

import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { BadgeCard } from './index'

// theme

import { theme } from 'src/styles/theme'
import { ThemeProvider } from 'styled-components'

//clean up

afterEach(cleanup)

//wrapper

const wrapper = (saletype: 'private' | 'presale') => {
  return render(
    <ThemeProvider theme={theme}>
      <BadgeCard saleType={saletype} />
    </ThemeProvider>
  )
}

describe('BadgeCard', () => {
  test('should display presale when presale props is input', () => {
    const { getByText } = wrapper('presale')
    expect(getByText('Pre-sale')).toBeInTheDocument()
  }),
    test('should display private when private props is input', () => {
      const { getByText } = wrapper('private')
      expect(getByText('Private')).toBeInTheDocument()
    })
})
