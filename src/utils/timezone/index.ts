// Aqua utils
import Abbreviations from 'src/utils/timezone/abbreviations.json'

export const timezoneAbbreviation = (timezoneString: string): string => {
  const timezoneAbbreviations = JSON.parse(JSON.stringify(Abbreviations))
  return timezoneAbbreviations[timezoneString] || timezoneString
}
