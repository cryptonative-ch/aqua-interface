// Externals
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { secondsTohms, timeFrame } from './index'

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
