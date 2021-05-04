// External
import { ethers } from 'ethers'

// use Mainnet addresses
// using local testnet address for now
const CONTRACT_ADDRESS = ''

const filter = {
  address: '',
  topics: [],
}

const provider = new ethers.providers.JsonRpcProvider('localhost:9545')

provider.on(filter, () => {
  // read contract
  // read event
  // dispatch event to redux
})
