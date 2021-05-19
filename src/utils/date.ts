import momentTimeZone from 'moment-timezone'

export const convertUtcTimestampToLocal = (utcTimestamp: number) => {
  const dateUTC = momentTimeZone.unix(utcTimestamp).tz(momentTimeZone.tz.guess())
  return dateUTC.unix()
}
