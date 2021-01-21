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
