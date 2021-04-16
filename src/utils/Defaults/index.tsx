// Externals
import dayjs, { Dayjs } from 'dayjs'

// Interface
import { Auction, auctionType, FairSale, FixedPriceAuction } from 'src/interfaces/Auction'

//svg
import Omen from 'src/assets/svg/Omen.svg'
import Dai from 'src/assets/svg/DAI.svg'
import { BigNumber } from '@ethersproject/bignumber'

// query mocks

const getFairSale = (): FairSale => ({
  id: '0x141',
  createdAt: 1585481341,
  updatedAt: null,
  deletedAt: null,
  status: 'closed',
  startDate: 1585654141,
  endDate: 1617193741,
  tokenAmount: BigNumber.from(5000),
  name: 'Omen',
  tokenIn: {
    id: '0x141',
    name: 'DAI',
    icon: Dai,
    address: '0x',
    decimals: 18,
    symbol: 'DAI',
  },
  tokenOut: {
    id: '0x141',
    name: 'Omen',
    icon: Omen,
    address: '0x',
    decimals: 18,
    symbol: 'DXD',
  },
  minimumBidAmount: 10,
  bids: [],
  type: 'fairSale',
  minFundingThreshold: 100,
})

const getFixedPriceAuction = (): FixedPriceAuction => ({
  id: '0x141',
  createdAt: 1585481341,
  updatedAt: null,
  deletedAt: null,
  status: 'closed',
  startDate: 1585654141,
  endDate: 1617193741,
  name: 'Omen',
  type: 'fixedPriceAuction',
  sellAmount: BigNumber.from('0x2A'),
  minbiddingAmount: 10,
  tokenIn: {
    id: '0x141',
    name: 'DAI',
    icon: Dai,
    address: '0x',
    decimals: 18,
    symbol: 'DAI',
  },
  tokenOut: {
    id: '0x141',
    name: 'Omen',
    icon: Omen,
    address: '0x',
    decimals: 18,
    symbol: 'DXD',
  },
  allocationMin: 2,
  allocationMax: 20,
  bids: [],
})

export const getAuctionDefault = (a?: Partial<Auction>, auctiontype: auctionType = 'fairSale') =>
  auctiontype == 'fixedPriceAuction'
    ? {
        ...getFixedPriceAuction(),
        ...a,
      }
    : {
        ...getFairSale(),
        ...a,
      }

// resize window mock function
export const resizeWindow = (x: number, y: number) => {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: x })
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: y })
  window.dispatchEvent(new Event('resize'))
}

// variables
export const addHours = (dayjsInstance: Dayjs, hours: number) => dayjsInstance.clone().add(hours, 'h')
export const utcDate = dayjs(new Date().toUTCString())
export const dateUTC = dayjs.unix(utcDate.unix())
