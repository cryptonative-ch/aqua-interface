// Externals
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import durationTime from 'dayjs/plugin/duration'
import DayjsRelativeTime from 'dayjs/plugin/relativeTime'
import momentTimeZone from 'moment-timezone'

// Component
import { secondsTohms, timeEnd } from './index'

// Extends dayjs
dayjs.extend(DayjsRelativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)
dayjs.extend(relativeTime)
dayjs.extend(durationTime)

//clean up

// tests
let addHours: (dayjsInstance: Dayjs, hours: number) => dayjs.Dayjs
let utcDate: dayjs.Dayjs
let dateUTC: dayjs.Dayjs

describe('Timer', () => {
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
  }),
    describe('TimeEnd', () => {
      describe('Error checks', () => {
        test('should throw error for negative numbers', () => {
          expect(() => {
            timeEnd(-1)
          }).toThrow('unixtimestamp cannot be negative')
        })
      }),
        describe('Time conversion checks', () => {
          beforeEach(() => {
            jest.useFakeTimers('modern')
            jest.setSystemTime(new Date('2021-05-01 11:00:00'))
            // variables
            addHours = (dayjsInstance: Dayjs, hours: number) => dayjsInstance.clone().add(hours, 'h')
            utcDate = dayjs(Date.now()).utc(true) // UTC
            dateUTC = dayjs.unix(utcDate.unix())
          })

          afterAll(() => {
            jest.useRealTimers()
          })

          test('should display correct time at 0 hours', () => {
            const time = timeEnd(addHours(dateUTC, 0).unix(), 'UTC')
            expect(time).toBe('May 1, 11:00 UTC')
          }),
            test('should display correct time at +4', () => {
              const time = timeEnd(addHours(dateUTC, +4).unix(), 'UTC')
              expect(time).toBe('May 1, 15:00 UTC')
            }),
            test('should display US Pacific timezone at 2021-05-01  11:00:00 UTC', () => {
              const time = timeEnd(addHours(dateUTC, 0).unix(), 'ECT')

              expect(time).toBe('May 1, 13:00 CEST')
            }),
            test('should display Bangladesh Standard Time at 2021-05-01 11:00:00 UTC', () => {
              const time = timeEnd(addHours(dateUTC, 0).unix(), 'BST')

              expect(time).toBe('May 1, 17:00 BST')
            }),
            test('should display Pacific Standard Time at 2021-05-01  11:00:00 UTC', () => {
              const time = timeEnd(addHours(dateUTC, 0).unix(), 'PST')

              expect(time).toBe('May 1, 4:00 PDT')
            })
        })
    })
})
