// Externals
import dayjs, { Dayjs } from 'dayjs'
import { BigNumber, BigNumberish } from 'ethers'

// Interface
import { Auction, auctionType } from 'src/interfaces/Auction'

//svg
import Omen from 'src/assets/svg/Omen.svg'
import Dai from 'src/assets/svg/DAI.svg'

// query mocks

const getFairSale = (): Auction => ({
  id: '0x141',
  createdAt: 1585481341,
  updatedAt: null,
  deletedAt: null,
  status: 'closed',
  startDate: 1585654141,
  endDate: 1617193741,
  tokenAmount: 5000,
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
  gracePeriodStartDate: 100,
  gracePeriodEndDate: 100,
  bids: [],
  type: 'fairSale',
})

const getFixedPriceAuction = (): Auction => ({
  id: '0x141',
  createdAt: 1585481341,
  updatedAt: null,
  deletedAt: null,
  status: 'closed',
  startDate: 1585654141,
  endDate: 1617193741,
  tokenAmount: 5000,
  name: 'Omen',
  type: 'fixedPriceAuction',
  sellAmount: '0x2A',
  minbiddingAmount: 10,
  minFundingThreshold: 1000,
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

export const getAuctionDefault = (a?: Partial<Auction>, auctiontype: auctionType = 'fairSale'): Auction =>
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

// helpers
export const getZeros = (decimals: number) => {
  let zeros = '0'
  while (zeros.length < 256) {
    zeros += zeros
  }
  if (decimals >= 0 && decimals <= 256 && !(decimals % 1)) {
    return '1' + zeros.substring(0, decimals)
  }

  throw new Error('invalid decimal')
}

export const convertToNumber = (number: BigNumberish, decimals = 18): number => {
  // big number checks & convert if not
  let value: BigNumberish = BigNumber.from(number)

  const addedZeros = getZeros(decimals)

  // negative check
  const negative = value.lt(BigNumber.from(0))
  if (negative) {
    value = value.mul(BigNumber.from(-1))
  }

  let fraction = value.mod(addedZeros).toString()
  while (fraction.length < addedZeros.length - 1) {
    fraction = '0' + fraction
  }

  // eslint-disable-next-line
  fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)![1]

  const whole = value.div(addedZeros).toString()

  value = whole + '.' + fraction

  if (negative) {
    value = '-' + value
  }

  return Number(value)
}
