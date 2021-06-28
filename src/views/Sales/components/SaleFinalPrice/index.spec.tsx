// Externals

import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { SaleFinalPrice } from 'src/views/Sales/components/SaleFinalPrice/index'

// utils
import { getSaleDefault, addHours, dateUTC } from 'src/utils/Defaults'

// theme

import { theme } from 'src/styles/theme'
import { ThemeProvider } from 'styled-components'

// interfaces
import { Sale } from 'src/interfaces/Sale'

//clean up

afterEach(cleanup)

// tests

//wrapper

const wrapper = (sale: Sale) => {
  return render(
    <ThemeProvider theme={theme}>
      <SaleFinalPrice sale={sale} />
    </ThemeProvider>
  )
}

describe('testing SaleFinalPrice', () => {
  test('should display final price correctly', () => {
    const sale = getSaleDefault(
      {
        startDate: addHours(dateUTC, -24).unix(),
        endDate: addHours(dateUTC, +24).unix(),
      },
      'fairSale'
    )
    const { getByTestId } = wrapper(sale)
    expect(getByTestId('openprice')).toHaveTextContent('10')
  })
})
