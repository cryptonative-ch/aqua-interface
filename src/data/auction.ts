// Externals
import dayjs, { Dayjs } from 'dayjs'
import { BigNumber } from 'ethers'

// Icons
import Compound from 'src/assets/svg/Compound.svg'
import Gelato from 'src/assets/svg/Gelato.svg'
import Omen from 'src/assets/svg/Omen.svg'
import Mesa from 'src/assets/svg/Mesa.svg'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

const addHours = (dayjsInstance: Dayjs, hours: number) => dayjsInstance.clone().add(hours, 'h')

const addMinutes = (dayjsInstance: Dayjs, minutes: number) => dayjsInstance.clone().add(minutes, 'm')

export async function generateAuctionData(unixTimestamp: number): Promise<Auction[]> {
  const dateUTC = dayjs.unix(unixTimestamp)

  return [
    //Open/running
    {
      id: '0x141',
      createdAt: 1585481341,
      updatedAt: null,
      deletedAt: null,
      status: 'live',
      startDate: addHours(dateUTC, -24).unix(),
      endDate: addHours(dateUTC, +24).unix(),
      tokenOut: {
        id: '0x141',
        name: 'Omen',
        icon: Omen,
        address: '0x',
        decimals: 18,
        symbol: 'DXD',
      },
      type: 'fairSale',
      tokenAmount: 5000,
      name: 'Omen',
      bids: [
        {
          address: '0xf1',
          tokenOut: BigNumber.from(30),
          tokenIn: BigNumber.from(100),
        },
      ],
    },
    {
      id: '0x142',
      createdAt: 1585481341,
      updatedAt: null,
      deletedAt: null,
      status: 'live',
      startDate: addHours(dateUTC, -10).unix(),
      endDate: addHours(dateUTC, +100).unix(),
      tokenOut: {
        id: '0x141',
        name: 'Gelato',
        icon: Gelato,
        address: '0x',
        decimals: 18,
        symbol: 'GEL',
      },
      type: 'fairSale',
      name: 'Gelato',
      tokenAmount: 2500,
      bids: [
        {
          address: '0xf1',
          tokenOut: BigNumber.from(30),
          tokenIn: BigNumber.from(100),
        },
      ],
    },
    {
      id: 'simulation',
      createdAt: 1585481341,
      updatedAt: null,
      deletedAt: null,
      status: 'live',
      startDate: addMinutes(dateUTC, 0).unix(),
      endDate: addMinutes(dateUTC, 5).unix(),
      tokenOut: {
        id: '0x141',
        name: 'Mesa',
        icon: Mesa,
        address: '0x',
        decimals: 18,
        symbol: 'MESA',
      },
      type: 'fairSale',
      name: 'Mesa',
      tokenAmount: 10000,
      bids: [
        {
          address: '',
          tokenOut: BigNumber.from(30),
          tokenIn: BigNumber.from(100),
        },
      ],
    },
    // Upcoming
    {
      id: '0x143',
      createdAt: 1585481341,
      updatedAt: null,
      deletedAt: null,
      status: 'upcoming',
      startDate: addHours(dateUTC, 14).unix(),
      endDate: addHours(dateUTC, 114).unix(),
      tokenOut: {
        id: '0x141',
        name: 'Compound',
        icon: Compound,
        address: '0x',
        decimals: 18,
        symbol: 'COMP',
      },
      name: 'Compound',
      type: 'fairSale',
      tokenAmount: 150000,
      bids: [],
    },
    // Closed
    {
      id: '0x1434',
      createdAt: 1585481341,
      updatedAt: null,
      deletedAt: null,
      status: 'closed',
      startDate: addHours(dateUTC, -140).unix(),
      endDate: addHours(dateUTC, -14).unix(),
      tokenOut: {
        id: '0x141',
        name: 'Compound',
        icon: Compound,
        address: '0x',
        decimals: 18,
        symbol: 'COMP',
      },
      type: 'fairSale',
      tokenAmount: 1500,
      name: 'Closed',

      bids: [
        {
          address: '0xf1',
          tokenOut: BigNumber.from(30),
          tokenIn: BigNumber.from(100),
        },
      ],
    },
    {
      id: '0x1435',
      createdAt: 1585481341,
      updatedAt: null,
      deletedAt: null,
      status: 'closed',
      startDate: addHours(dateUTC, -140).unix(),
      endDate: addHours(dateUTC, -14).unix(),
      tokenOut: {
        id: '0x141',
        name: 'Compound',
        icon: Compound,
        address: '0x',
        decimals: 18,
        symbol: 'CLOSE',
      },
      type: 'fairSale',
      tokenAmount: 1500,
      name: 'ClosedWithout',
      bids: [],
    },
  ]
}
