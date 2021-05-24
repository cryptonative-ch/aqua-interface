// Externals

import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { SaleNavBar } from './index'
import { SaleContext, SaleStatus, SaleContextType } from '../../index'

// theme

import { theme } from 'src/styles/theme'
import { ThemeProvider } from 'styled-components'

//clean up

afterEach(cleanup)

// helper function
const wrapper = (sale: SaleContextType) => {
  return render(
    <SaleContext.Provider value={sale}>
      <ThemeProvider theme={theme}>
        <SaleNavBar />
      </ThemeProvider>
    </SaleContext.Provider>
  )
}

describe('testing SaleNavBar', () => {
  test('should display the correct style when SaleStatus is Live', () => {
    const test: SaleContextType = {
      SaleShow: SaleStatus.LIVE,
      setSaleShow: jest.fn(),
    }
    const { getByTestId } = wrapper(test)
    expect(getByTestId('Live')).toHaveTextContent('Live')
  })
  test('should display the correct style when SaleStatus is Upcoming', () => {
    const test: SaleContextType = {
      SaleShow: SaleStatus.UPCOMING,
      setSaleShow: jest.fn(),
    }
    const { getByTestId } = wrapper(test)
    expect(getByTestId('Upcoming')).toHaveTextContent('Upcoming')
  })
  test('should display the correct style when SaleStatus is Closed', () => {
    const test: SaleContextType = {
      SaleShow: SaleStatus.CLOSED,
      setSaleShow: jest.fn(),
    }
    const { getByTestId } = wrapper(test)
    expect(getByTestId('Closed')).toHaveTextContent('Closed')
  }),
    test('button should be called when upcoming is clicked when on closed status', async () => {
      const test: SaleContextType = {
        SaleShow: SaleStatus.CLOSED,
        setSaleShow: jest.fn(),
      }

      const { getByTestId } = wrapper(test)

      fireEvent.click(getByTestId('closedupcomingclick'))

      expect(test.setSaleShow).toHaveBeenCalled()
    }),
    test('button should be called when live is clicked when on upcoming status', async () => {
      const test: SaleContextType = {
        SaleShow: SaleStatus.CLOSED,
        setSaleShow: jest.fn(),
      }

      const { getByTestId } = wrapper(test)

      fireEvent.click(getByTestId('closed live click'))

      expect(test.setSaleShow).toHaveBeenCalled()
    }),
    test('button should be called when closed is clicked when on live status', async () => {
      const test: SaleContextType = {
        SaleShow: SaleStatus.LIVE,
        setSaleShow: jest.fn(),
      }

      const { getByTestId } = wrapper(test)

      fireEvent.click(getByTestId('live closed click'))

      expect(test.setSaleShow).toHaveBeenCalled()
    }),
    test('button should be called when live is clicked when on upcoming status', async () => {
      const test: SaleContextType = {
        SaleShow: SaleStatus.UPCOMING,
        setSaleShow: jest.fn(),
      }

      const { getByTestId } = wrapper(test)

      fireEvent.click(getByTestId('upcoming live click'))

      expect(test.setSaleShow).toHaveBeenCalled()
    }),
    test('button should be called when upcoming is clicked when on live status', async () => {
      const test: SaleContextType = {
        SaleShow: SaleStatus.LIVE,
        setSaleShow: jest.fn(),
      }

      const { getByTestId } = wrapper(test)

      fireEvent.click(getByTestId('live upcoming click'))

      expect(test.setSaleShow).toHaveBeenCalled()
    }),
    test('button should be called when close is clicked when on upcoming status', async () => {
      const test: SaleContextType = {
        SaleShow: SaleStatus.UPCOMING,
        setSaleShow: jest.fn(),
      }

      const { getByTestId } = wrapper(test)

      fireEvent.click(getByTestId('upcoming close click'))

      expect(test.setSaleShow).toHaveBeenCalled()
    })
})
