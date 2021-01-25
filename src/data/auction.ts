// Externals
import dayjs, { Dayjs } from 'dayjs'
import { BigNumber } from 'ethers'

// Icons
import Simulation from 'src/assets/svg/Simulation.svg'
import Compound from 'src/assets/svg/Compound.svg'
import Gelato from 'src/assets/svg/Gelato.svg'
import Omen from 'src/assets/svg/Omen.svg'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

const addHours = (dayjsInstance: Dayjs, hours: number) => dayjsInstance.clone().add(hours, 'h')

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
        {
          address: '0xf1',
          buyAmount: BigNumber.from(30),
          sellAmount: BigNumber.from(100),
        },
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
      startBlock: addHours(dateUTC, -55).unix(),
      endBlock: addHours(dateUTC, +2).unix(),
      tokenAddress: '0x',
      tokenAmount: 10000,
      tokenName: 'Simulation',
      tokenSymbol: 'SIM',
      tokenIcon: Simulation,
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
      tokenAmount: 15000,
      tokenName: 'Compound',
      tokenSymbol: 'COMP',
      tokenIcon: Compound,
      bids: [],
    },
    // Closed
    {
      id: '0x143',
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
  ]
}
