// Externals
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import durationTime from 'dayjs/plugin/duration'
import DayjsRelativeTime from 'dayjs/plugin/relativeTime'



// Component
import { secondsTohms, timeFrame } from './index'

// Extends dayjs
dayjs.extend(DayjsRelativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)
dayjs.extend(relativeTime)
dayjs.extend(durationTime)

//clean up

afterEach(cleanup)

// tests

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
  test('test negative input', () => {
    expect(() => {
      timeFrame(-100)
    }).toThrow('seconds cannot be negative')
  })
})
