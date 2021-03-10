// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from 'styled-components'
import numeral from 'numeral'
import dayjs, { Dayjs } from 'dayjs'
import i18n from 'i18next'

// Icons
import Compound from 'src/assets/svg/Compound.svg'

import { calculateClearingPrice } from 'src/mesa/price'

// Component
import { theme } from '../../../../styles/theme'
import { PlaceBidForm } from './index'

// variables
const addHours = (dayjsInstance: Dayjs, hours: number) => dayjsInstance.clone().add(hours, 'h')
const utcDate = dayjs(new Date().toUTCString())
const dateUTC = dayjs.unix(utcDate.unix())

describe('PlaceBidForm', () => {
  test('should display texts', () => {
    i18n
      .init({
        fallbackLng: 'en',
        react: {
          useSuspense: false
        }
      })
    const auction = {
      id: '0x143',
      startBlock: addHours(dateUTC, 14).unix(),
      endBlock: addHours(dateUTC, 114).unix(),
      tokenAddress: '0x',
      tokenAmount: 150000,
      tokenName: 'Compound',
      tokenSymbol: 'COMP',
      tokenIcon: Compound,
      bids: [],
    }
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <PlaceBidForm
          onSubmit={() => {
            console.log('Add to Auction')
          }}
          auction={auction}
          currentSettlementPrice={numeral(calculateClearingPrice(auction.bids)).value()}
        />
      </ThemeProvider>
    )
  })
})
