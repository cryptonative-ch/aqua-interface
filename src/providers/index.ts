// External
import { InfuraProvider } from '@ethersproject/providers'

// Constants
import { INFURA_API_KEY } from 'src/constants'

/**
 * Creates and returns a Infura instance connected to the mainnet
 */
export const getInfuraProvider = () => {
  return new InfuraProvider('homestead', INFURA_API_KEY)
}

let BLOCK_NUMBER = 11699666

setInterval(() => BLOCK_NUMBER++, 15000)

export const getBlockNumber = async () => BLOCK_NUMBER
