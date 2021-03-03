// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BigNumber } from 'ethers'
import dayjs, { Dayjs } from 'dayjs'

// Component
import { secondsTohms, timeFrame, Timer } from './index'

// Icons
import Compound from 'src/assets/svg/Compound.svg'
import Omen from 'src/assets/svg/Omen.svg'

describe('seconds to HMS function', () => {
  describe('convert seconds into different formats', () => {
    test('tests conversion of seconds to minutes', () => {
      expect(secondsTohms(60)).toBe('1m ')
    }),
      test('tests conversion of seconds into days, hours, minutes', () => {
        expect(secondsTohms(20000)).toBe('5h 33m 20s')
      }),
      test('tests negative input', () => {
        expect(() => {
          secondsTohms(-100)
        }).toThrow('seconds cannot be negative')
      })
  })
})

describe('converts unix seconds into local Date time format function', () => {
  test('convert seconds into local time', () => {
    expect(timeFrame(1000)).toBe('Jan 01,  01:16 GMT')
  }),
    test('test negative input', () => {
      expect(() => {
        timeFrame(-100)
      }).toThrow('seconds cannot be negative')
    })
})

// variables
const addHours = (dayjsInstance: Dayjs, hours: number) => dayjsInstance.clone().add(hours, 'h')
const utcDate = dayjs(new Date().toUTCString())
const dateUTC = dayjs.unix(utcDate.unix())

describe('tests Timer react component', () => {
  test('when auction is open it should render the correct display', async () => {
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
    const { getByTestId } = render(<Timer auction={auction} />)

    expect(await getByTestId('open')).toHaveTextContent('1d')
  }),
    test('when auction is upcoming, it displays the correct return', () => {
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
      const { getByText } = render(<Timer auction={auction} />)
      expect(getByText('to')).toBeInTheDocument()
    }),
    test('when auction is closed, it should return the correct display', async () => {
      const auction = {
        id: '0x1434',
        startBlock: addHours(dateUTC, -140).unix(),
        endBlock: addHours(dateUTC, -14).unix(),
        tokenAddress: '0x',
        tokenAmount: 1500,
        tokenName: 'Closed',
        tokenSymbol: 'CLOSE',
        tokenIcon: Compound,
        bids: [
          {
            address: '0xf1',
            buyAmount: BigNumber.from(30),
            sellAmount: BigNumber.from(100),
          },
        ],
      }
      const { getByTestId } = render(<Timer auction={auction} />)
      expect(await getByTestId('closed')).toHaveTextContent('GMT')
    })
})
