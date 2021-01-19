// Icons
import Simulation from 'src/assets/svg/Simulation.svg'
import Compound from 'src/assets/svg/Compound.svg'
import Gelato from 'src/assets/svg/Gelato.svg'
import Omen from 'src/assets/svg/Omen.svg'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

export function generateAuctionData(blockNumber: number): Auction[] {
  return [
    {
      id: '0x141',
      startBlock: blockNumber - 6000,
      endBlock: blockNumber + 18000,
      tokenAddress: '0x',
      tokenAmount: 2000,
      tokenName: 'Omen',
      tokenSymbol: 'DXD',
      tokenIcon: Omen,
      bids: [],
    },
    {
      id: '0x142',
      startBlock: blockNumber - 6000,
      endBlock: blockNumber + 18000,
      tokenAddress: '0x',
      tokenAmount: 2000,
      tokenName: 'Gelato',
      tokenSymbol: 'GEL',
      tokenIcon: Gelato,
      bids: [],
    },
    {
      id: 'simulation',
      startBlock: blockNumber - 18000,
      endBlock: blockNumber + 18000,
      tokenAddress: '0x',
      tokenAmount: 2000,
      tokenName: 'Simulation',
      tokenSymbol: 'SIM',
      tokenIcon: Simulation,
      bids: [],
    },
    // Upcoming
    {
      id: '0x143',
      startBlock: blockNumber + 144000, // Starts in 24 days and runs for 3 days
      endBlock: blockNumber + 18000,
      tokenAddress: '0x',
      tokenAmount: 15000,
      tokenName: 'Compound',
      tokenSymbol: 'COMP',
      tokenIcon: Compound,
      bids: [],
    },
  ]
}
