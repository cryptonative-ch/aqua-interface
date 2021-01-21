import { BigNumber } from 'ethers'

// To use the contract's struct in MVP
export interface Auction {
  id: string // Contract address (Using Factory pattern)
  startBlock: number // Open block
  endBlock: number // Close auction
  tokenIcon: string // Token icon, preferably are URL on the IPFS
  tokenAddress: string // ERC20 Token's contract address
  tokenSymbol: string // Symbol
  tokenAmount: number // Amount auctioned to buyers/bidders
  tokenName: string // Name
  bids: AuctionBid[]
}

export interface AuctionBid {
  sellAmount: BigNumber // Number of tokens the investor wants to buy
  buyAmount: BigNumber // Price at which they wish to buy
  address: string // Their Ethereum address
}
