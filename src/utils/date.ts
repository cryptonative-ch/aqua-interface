import dayjs from 'dayjs'

export const convertUtcTimestampToLocal = (utcTimestamp: number) => {
  const utcMinutesOffset = dayjs(utcTimestamp).utcOffset()
  const dateUTC = dayjs.unix(utcTimestamp).add(utcMinutesOffset, 'minutes')
  // problem with timezone and offsetting, does not take into place user daylight saving time

  return dateUTC.unix()
}
