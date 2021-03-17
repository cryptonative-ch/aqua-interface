import dayjs from 'dayjs'
import moment from 'moment-timezone'

export const convertUtcTimestampToLocal = (utcTimestamp: number) => {
  const utcMinutesOffset = new Date().getTimezoneOffset()
  const dateUTC = dayjs.unix(utcTimestamp).add(utcMinutesOffset, 'minutes')
  return dateUTC.unix()
}

export const convertTimestampWithMoment = (utcTimestamp: number) => {
  return moment.utc(utcTimestamp * 1000).tz(moment.tz.guess()).format('MMM D, hh:mm z')
}
