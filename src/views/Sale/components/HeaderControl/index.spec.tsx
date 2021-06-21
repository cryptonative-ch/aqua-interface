// Externals

import React from 'react'
import dayjs from 'dayjs'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import durationTime from 'dayjs/plugin/duration'
import DayjsRelativeTime from 'dayjs/plugin/relativeTime'

// Extends dayjs
dayjs.extend(DayjsRelativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)
dayjs.extend(relativeTime)
dayjs.extend(durationTime)

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
  test.skip('should display texts and logo img', () => {
    const { getByText, getByTestId } = wrapper('closed')
    expect(getByText('Missed out on the sale? You can get ERT on')).toBeInTheDocument()
    expect(getByText('Go to Swapr')).toBeInTheDocument()
    expect(getByTestId('logo-img')).toBeInTheDocument()
  })
})
