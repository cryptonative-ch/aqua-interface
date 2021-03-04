// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BigNumber } from 'ethers'
import dayjs, { Dayjs } from 'dayjs'

// Components

import { AuctionFinalPrice } from './index'

// Icons
import Compound from 'src/assets/svg/Compound.svg'
import Omen from 'src/assets/svg/Omen.svg'

// variables
const addHours = (dayjsInstance: Dayjs, hours: number) => dayjsInstance.clone().add(hours, 'h')
const utcDate = dayjs(new Date().toUTCString())
const dateUTC = dayjs.unix(utcDate.unix())

describe('testing price display', () => {
  test('should display 0 is auction is upcoming', () => {
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

    const { getByText } = render(<AuctionFinalPrice auction={auction} />)
    expect(getByText('N/A')).toBeInTheDocument()
  }),
    test('should display final price correctly', () => {
      const auction = {
        id: '0x141',
        startBlock: addHours(dateUTC, -24).unix(),
        endBlock: addHours(dateUTC, +24).unix(),
        tokenAddress: '0x',
        tokenAmount: 5000,
        tokenName: 'Omen',
        tokenSymbol: 'DXD',
        tokenIcon: Omen,
        bids: [
          {
            address: '0xf1',
            buyAmount: BigNumber.from(30),
            sellAmount: BigNumber.from(100),
          },
        ],
      }
      const { getByTestId } = render(<AuctionFinalPrice auction={auction} />)
      expect(getByTestId('openprice')).not.toHaveTextContent('N/A')
    })
})
