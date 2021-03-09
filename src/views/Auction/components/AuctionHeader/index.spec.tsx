// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BigNumber } from 'ethers'
import dayjs, { Dayjs } from 'dayjs'

// Component
import { secondsTohms, AuctionHeader } from './index'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'
import { isAuctionOpen, isAuctionUpcoming } from 'src/mesa/auction'

// Icons
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

// // variables
const addHours = (dayjsInstance: Dayjs, hours: number) => dayjsInstance.clone().add(hours, 'h')
const utcDate = dayjs(new Date().toUTCString())
const dateUTC = dayjs.unix(utcDate.unix())

describe('AuctionHeader', () => {
  test('it should render the correct auction header', async () => {
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
    const time_diff_start: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(auction.startBlock))
    const time_diff_end: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(auction.endBlock))
    let format_time = '';
    if (isAuctionUpcoming(auction)) {
      format_time = secondsTohms(time_diff_start)
    } else if (isAuctionOpen(auction)) {
      format_time = secondsTohms(time_diff_end)
    }
    const { getByText, getByTestId } = render(<AuctionHeader auction={auction} />)
    expect(await getByTestId('format_time')).toHaveTextContent(format_time, {normalizeWhitespace: false})
    expect(getByText('XYZ Initial Auction')).toBeInTheDocument()
    expect(getByText('Private')).toBeInTheDocument()
  })
})
