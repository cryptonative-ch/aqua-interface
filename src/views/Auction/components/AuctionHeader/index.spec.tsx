// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import dayjs from 'dayjs'

// Component
import { secondsTohms, AuctionHeader } from './index'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'
import { isAuctionOpen, isAuctionUpcoming } from 'src/mesa/auction'
import { getAuctionDefault, addHours, dateUTC } from 'src/utils/Defaults'

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

describe('AuctionHeader', () => {
  test('it should render the correct auction header', async () => {
    const auction = getAuctionDefault({
      startBlock: addHours(dateUTC, -24).unix(),
      endBlock: addHours(dateUTC, +24).unix(),
    })

    const time_diff_start: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(auction.startBlock))
    const time_diff_end: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(auction.endBlock))
    let format_time = ''
    if (isAuctionUpcoming(auction)) {
      format_time = secondsTohms(time_diff_start)
    } else if (isAuctionOpen(auction)) {
      format_time = secondsTohms(time_diff_end)
    }
    const { getByText, getByTestId } = render(<AuctionHeader auction={auction} />)
    expect(await getByTestId('format_time')).toHaveTextContent(format_time, { normalizeWhitespace: false })
    expect(getByText('Omen Initial Auction')).toBeInTheDocument()
    expect(getByText('Private')).toBeInTheDocument()
  })
})
