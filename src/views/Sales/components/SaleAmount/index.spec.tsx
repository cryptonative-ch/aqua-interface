import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { SaleAmount } from 'src/views/Sales/components/SaleAmount/index'

// defaults
import { formatDecimal, getSaleDefault } from 'src/utils/Defaults'

// theme

import { theme } from 'src/styles/theme'
import { ThemeProvider } from 'styled-components'

// interfaces
import { Sale } from 'src/interfaces/Sale'

//clean up

afterEach(cleanup)

//wrapper

const wrapper = (sale: Sale) => {
  return render(
    <ThemeProvider theme={theme}>
      <SaleAmount sale={sale} />
    </ThemeProvider>
  )
}

// tests

const sale = getSaleDefault({ sellAmount: formatDecimal('4978.999999999999999999') }, 'FixedPriceSale')

describe.skip('SaleAmount tests', () => {
  test('should display correct Amount', () => {
    const { getByText } = wrapper(sale)
    expect(getByText('4,979')).toBeInTheDocument()
  })
})
