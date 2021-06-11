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

const wrapper = (saletype: 'public' | 'presale') => {
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
    test('should display public when public props is input', () => {
      const { getByText } = wrapper('public')
      expect(getByText('Public')).toBeInTheDocument()
    })
})
