// Externals
import dayjs, { Dayjs } from 'dayjs'

// Interface
import { Auction } from 'src/interfaces/Auction'

//svg
import Omen from 'src/assets/svg/Omen.svg'

export const getDefaults = (): Auction => ({
  id: '0x141',
  startBlock: 7656756757,
  endBlock: 7656756757,
  tokenAddress: '0x',
  tokenAmount: 5000,
  tokenName: 'Omen',
  tokenSymbol: 'DXD',
  tokenIcon: Omen,
  bids: [],
})

export const getAuctionDefault = (a?: Partial<Auction>): Auction => ({
  ...getDefaults(),
  ...a,
})

export const resizeWindow = (x: number, y: number) => {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: x })
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: y })
  // window.innerWidth = x
  // window.innerHeight = y
  window.dispatchEvent(new Event('resize'))
}

// variables
export const addHours = (dayjsInstance: Dayjs, hours: number) => dayjsInstance.clone().add(hours, 'h')
export const utcDate = dayjs(new Date().toUTCString())
export const dateUTC = dayjs.unix(utcDate.unix())
