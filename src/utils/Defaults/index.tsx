// Externals
import dayjs, { Dayjs } from 'dayjs'

// Interface
import { Auction, auctionType, FairSale, FixedPriceSale } from 'src/interfaces/Auction'

//svg
import Omen from 'src/assets/svg/Omen.svg'
import Dai from 'src/assets/svg/DAI.svg'
import { BigNumberish, BigNumber } from 'ethers'
import { formatUnits } from '@ethersproject/units'
formatUnits

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
  minimumBidAmount: BigNumber.from(10),
  bids: [],
  type: 'fairSale',
  minFundingThreshold: 100,
})

const getFixedPriceSales = (): FixedPriceSale => ({
  id: '0x141',
  createdAt: 1585481341,
  updatedAt: null,
  deletedAt: null,
  status: 'closed',
  startDate: 1585654141,
  endDate: 1617193741,
  name: 'Omen',
  type: 'fixedPriceSale',
  tokenPrice: BigNumber.from(100),
  sellAmount: BigNumber.from('0x2A'),
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
  auctiontype == 'fixedPriceSale'
    ? {
        ...getFixedPriceSales(),
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

export const formatBigInt = (number: BigNumberish, decimals = 18): number => {
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

export const fromBigDecimalToBigInt = (input: string): string => {
  // regex split the string between decimals and exponential
  // reform into BigInt string
  // assumes all bigdecimals are all in the smallest unit
  // no decimal numbers

  const number = String(input)
  console.log(number)

  const exponent = number.match(/(?<=e)(.*)/)![1]

  const fraction = number.match(/(?<=\.)(.*)(?=e)/)![1]

  const power = Number(exponent.slice(1))

  const addedZeros = getZeros(power)

  const whole = number.match(/(.*)(?=\.)/)![1]

  const zeros = addedZeros.slice(fraction.length + 1)

  const value = whole + fraction + zeros

  return value
}

export const formatDecimal = (bigDecimal: string): BigNumber => {
  return BigNumber.from(fromBigDecimalToBigInt(bigDecimal))
}
