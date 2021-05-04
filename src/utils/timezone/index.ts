// Mesa utils
import Abbreviations from './abbreviations.json'

export const timezoneAbbreviation = (timezoneString: string): string => {
  const timezoneAbbreviations = JSON.parse(JSON.stringify(Abbreviations))
  return timezoneAbbreviations[timezoneString] || timezoneString
}
