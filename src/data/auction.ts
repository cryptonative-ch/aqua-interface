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

export function generateAuctionData(unixTimestamp: number): Auction[] {
  const dateUTC = dayjs.unix(unixTimestamp)

  return [
    // Open/running
    {
      id: '0x141',
      startBlock: addHours(dateUTC, -24).unix(),
      endBlock: addHours(dateUTC, +24).unix(),
      tokenAddress: '0x',
      tokenAmount: 5000,
      tokenName: 'Omen',
      tokenSymbol: 'DXD',
      tokenIcon: Omen,
      bids: [
      ],
    },
    {
      id: '0x142',
      startBlock: addHours(dateUTC, -10).unix(),
      endBlock: addHours(dateUTC, +100).unix(),
      tokenAddress: '0x',
      tokenAmount: 2500,
      tokenName: 'Gelato',
      tokenSymbol: 'GEL',
      tokenIcon: Gelato,
      bids: [
        {
          address: '0xf1',
          buyAmount: BigNumber.from(30),
          sellAmount: BigNumber.from(100),
        },
      ],
    },
    {
      id: 'simulation',
      startBlock: addMinutes(dateUTC, 0).unix(),
      endBlock: addMinutes(dateUTC, 5).unix(),
      tokenAddress: '0x',
      tokenAmount: 10000,
      tokenName: 'Mesa',
      tokenSymbol: 'MESA',
      tokenIcon: Mesa,
      bids: [
        {
          address: '0xf1',
          buyAmount: BigNumber.from(30),
          sellAmount: BigNumber.from(100),
        },
      ],
    },
    // Upcoming
    {
      id: '0x143',
      startBlock: addHours(dateUTC, 14).unix(),
      endBlock: addHours(dateUTC, 114).unix(),
      tokenAddress: '0x',
      tokenAmount: 150000,
      tokenName: 'Compound',
      tokenSymbol: 'COMP',
      tokenIcon: Compound,
      bids: [],
    },
    // Closed
    {
      id: '0x1434',
      startBlock: addHours(dateUTC, -140).unix(),
      endBlock: addHours(dateUTC, -14).unix(),
      tokenAddress: '0x',
      tokenAmount: 1500,
      tokenName: 'Closed',
      tokenSymbol: 'CLOSE',
      tokenIcon: Compound,
      bids: [
        {
          address: '0xf1',
          buyAmount: BigNumber.from(30),
          sellAmount: BigNumber.from(100),
        },
      ],
    },
    {
      id: '0x1435',
      startBlock: addHours(dateUTC, -140).unix(),
      endBlock: addHours(dateUTC, -14).unix(),
      tokenAddress: '0x',
      tokenAmount: 1500,
      tokenName: 'ClosedWithout',
      tokenSymbol: 'CLOSE',
      tokenIcon: Compound,
      bids: [
      ],
    },
  ]
}
