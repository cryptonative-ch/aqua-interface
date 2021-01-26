import dayjs from 'dayjs'

export const convetUtcTimestampToLocal = (utcTimestamp: number) => {
  const utcMinutesOffset = dayjs(utcTimestamp).utcOffset()
  const dateUTC = dayjs.unix(utcTimestamp).add(utcMinutesOffset, 'minutes')

  return dateUTC.unix()
}
