// Externals
import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import i18n from 'i18next'

// Components
import { SaleNavBar } from './index'
import { SaleStatus } from '../../index'

//clean up

afterEach(cleanup)
beforeEach(() => {
  i18n.init({
    fallbackLng: 'en',
    react: {
      useSuspense: false,
    },
  })
})

// helper function
const wrapper = (state: SaleStatus, setStatus: (SaleStatus: SaleStatus) => void) => {
  return render(<SaleNavBar state={state} setStatus={setStatus} />)
}

describe('testing SaleNavBar', () => {
  test('should display the correct style when SaleStatus is Live', () => {
    const { getByTestId } = wrapper(SaleStatus.LIVE, jest.fn())
    expect(getByTestId('live')).toHaveTextContent('texts.live')
  })
  test('should display the correct style when SaleStatus is Upcoming', () => {
    const { getByTestId } = wrapper(SaleStatus.UPCOMING, jest.fn())
    expect(getByTestId('upcoming')).toHaveTextContent('texts.upcoming')
  })
  test('should display the correct style when SaleStatus is Closed', () => {
    const { getByTestId } = wrapper(SaleStatus.CLOSED, jest.fn())
    expect(getByTestId('closed')).toHaveTextContent('texts.closed')
  }),
    test('button should be called when upcoming is clicked when on closed status', async () => {
      const mock = jest.fn()
      const { getByTestId } = wrapper(SaleStatus.LIVE, mock)

      fireEvent.click(getByTestId('closed'))

      expect(mock).toHaveBeenCalledWith(SaleStatus.CLOSED)
    }),
    test('button should be called when upcoming is clicked when on closed status', async () => {
      const mock = jest.fn()
      const { getByTestId } = wrapper(SaleStatus.CLOSED, mock)

      fireEvent.click(getByTestId('upcoming'))

      expect(mock).toHaveBeenCalledWith(SaleStatus.UPCOMING)
    }),
    test('button should be called when upcoming is clicked when on closed status', async () => {
      const mock = jest.fn()
      const { getByTestId } = wrapper(SaleStatus.CLOSED, mock)

      fireEvent.click(getByTestId('live'))

      expect(mock).toHaveBeenCalledWith(SaleStatus.LIVE)
    })
})
