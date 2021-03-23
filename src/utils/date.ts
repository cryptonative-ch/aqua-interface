import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)

export const convertUtcTimestampToLocal = (utcTimestamp: number) => {
  const utcMinutesOffset = new Date().getTimezoneOffset()
  const dateUTC = dayjs.unix(utcTimestamp).add(utcMinutesOffset, 'minutes')
  return dateUTC.unix()
}

export const convertTimestampWithMoment = (utcTimestamp: number) => {
  return dayjs.utc(utcTimestamp * 1000).tz(dayjs.tz.guess()).format('MMM D, hh:mm z')
}
