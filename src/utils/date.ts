import dayjs from 'dayjs'

export const convertUtcTimestampToLocal = (utcTimestamp: number) => {
  const utcMinutesOffset = new Date().getTimezoneOffset()
  const dateUTC = dayjs.unix(utcTimestamp).add(utcMinutesOffset, 'minutes')
  return dateUTC.unix()
}
