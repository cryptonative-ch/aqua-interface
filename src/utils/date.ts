import dayjs from 'dayjs'

export const convertUtcTimestampToLocal = (utcTimestamp: number) => {
  const dateUTC = dayjs.unix(utcTimestamp).local()
  return dateUTC.unix()
}
