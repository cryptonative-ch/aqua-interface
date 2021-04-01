// Externals
import dayjs, { Dayjs } from 'dayjs'

// Interface
import { Auction } from 'src/interfaces/Auction'

//svg
import Omen from 'src/assets/svg/Omen.svg'

export const getDefaults = (): Auction => ({
  id: '0x141',
  createdAt:1585481341,
  updatedAt: null,
  deletedAt: null,
  status: 'closed',
  startDate: 1585654141,
  endDate: 1617193741,
  tokenAmount: 5000,
  name: 'Omen',
  tokenOut: {
    id: '0x141',
    name:'Omen',
    icon: Omen,
    address: '0x',
    decimals: 18,
    symbol: 'DXD'
  },
  bids: [],
  type: 'easyAuction',
})

export const getAuctionDefault = (a?: Partial<Auction>): Auction => ({
  ...getDefaults(),
  ...a,
})

// variables
export const addHours = (dayjsInstance: Dayjs, hours: number) => dayjsInstance.clone().add(hours, 'h')
export const utcDate = dayjs(new Date().toUTCString())
export const dateUTC = dayjs.unix(utcDate.unix())
