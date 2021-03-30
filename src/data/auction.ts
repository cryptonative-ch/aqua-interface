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
    // Open/running
    {
      id: '0x141',
      startDate: addHours(dateUTC, -24).unix(),
      endDate: addHours(dateUTC, +24).unix(),
      tokenAddress: '0x',
      tokenAmount: 5000,
      tokenName: 'Omen',
      symbol: 'DXD',
      tokenIcon: Omen,
      bids: [
        {
          address: '0xf1',
          tokenOutAmount: BigNumber.from(30),
          tokenInAmount: BigNumber.from(100),
        },
      ],
    },
    {
      id: '0x142',
      startDate: addHours(dateUTC, -10).unix(),
      endDate: addHours(dateUTC, +100).unix(),
      tokenAddress: '0x',
      tokenAmount: 2500,
      tokenName: 'Gelato',
      symbol: 'GEL',
      tokenIcon: Gelato,
      bids: [
        {
          address: '0xf1',
          tokenOutAmount: BigNumber.from(30),
          tokenInAmount: BigNumber.from(100),
        },
      ],
    },
    {
      id: 'simulation',
      startDate: addMinutes(dateUTC, 0).unix(),
      endDate: addMinutes(dateUTC, 5).unix(),
      tokenAddress: '0x',
      tokenAmount: 10000,
      tokenName: 'Mesa',
      symbol: 'MESA',
      tokenIcon: Mesa,
      bids: [
        {
          address: '0xf1',
          tokenOutAmount: BigNumber.from(30),
          tokenInAmount: BigNumber.from(100),
        },
      ],
    },
    // Upcoming
    {
      id: '0x143',
      startDate: addHours(dateUTC, 14).unix(),
      endDate: addHours(dateUTC, 114).unix(),
      tokenAddress: '0x',
      tokenAmount: 150000,
      tokenName: 'Compound',
      symbol: 'COMP',
      tokenIcon: Compound,
      bids: [],
    },
    // Closed
    {
      id: '0x1434',
      startDate: addHours(dateUTC, -140).unix(),
      endDate: addHours(dateUTC, -14).unix(),
      tokenAddress: '0x',
      tokenAmount: 1500,
      tokenName: 'Closed',
      symbol: 'CLOSE',
      tokenIcon: Compound,
      bids: [
        {
          address: '0xf1',
          tokenOutAmount: BigNumber.from(30),
          tokenInAmount: BigNumber.from(100),
        },
      ],
    },
  ]
}
