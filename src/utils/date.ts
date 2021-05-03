import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import durationTime from 'dayjs/plugin/duration'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)
dayjs.extend(relativeTime)
dayjs.extend(durationTime)

export const convertUtcTimestampToLocal = (utcTimestamp: number) => {
  const utcMinutesOffset = new Date().getTimezoneOffset()
  const dateUTC = dayjs.unix(utcTimestamp).add(utcMinutesOffset, 'minutes')
  return dateUTC.unix()
}

export const faketimer = (utcTimestamp: number) => {
  return dayjs
    .utc(utcTimestamp * 1000)
    .tz(dayjs.tz.guess())
    .format('MMM D, hh:mm z')
}

export const calculatefaketimer = (utcTimestamp: number) => {
  const targetDate = dayjs.utc(utcTimestamp * 1000)
  const durationText = dayjs.duration(targetDate.diff(dayjs())).format('M D H m s').split(' ')
  const units = ['months', 'd', 'h', 'm', 's']
  let targetText = ''
  durationText.forEach((val, index) => {
    if (val !== '0') {
      targetText += `${val}${units[index]} `
    }
  })
  return targetText
}
