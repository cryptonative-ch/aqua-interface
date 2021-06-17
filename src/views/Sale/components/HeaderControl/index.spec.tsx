// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'

// Component
import { HeaderControl } from './index'

// Mesa Utils
import { getFixedPriceSales } from 'src/utils/Defaults'

// redux
import { store } from 'src/redux/store'

const mockData = getFixedPriceSales()

const wrapper = (status: string) => {
  return render(
    <Provider store={store}>
      <HeaderControl sale={mockData} status={status} />)
    </Provider>
  )
}

describe('HeaderControl', () => {
  test('should display texts and logo img', () => {
    const { getByText, getByTestId } = wrapper('closed')
    expect(getByText('Missed out on the sale? You can get ERT on')).toBeInTheDocument()
    expect(getByText('Go to Swapr')).toBeInTheDocument()
    expect(getByTestId('logo-img')).toBeInTheDocument()
  }),
    test('should display graph image', () => {
      const { getByTestId } = wrapper('active')
      expect(getByTestId('graph-img')).toBeInTheDocument()
    })
})
