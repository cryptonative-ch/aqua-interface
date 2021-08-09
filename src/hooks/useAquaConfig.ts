// External
import { AquaConfigMap, RINKEBY_CONFIG, XDAI_CONFIG } from '@dxdao/aqua'
import { useWeb3React } from '@web3-react/core'

// Constants
import { CHAIN_ID, SUBGRAPH_ENDPOINT, SUPPORTED_CHAINS } from 'src/constants'

export function useAquaConfig() {
  const { chainId } = useWeb3React()

  // Default: XDAI
  let aquaConfig: AquaConfigMap = {
    ...XDAI_CONFIG,
    ...SUPPORTED_CHAINS[CHAIN_ID.XDAI].contracts,
  }

  // Development
  if (process.env.NODE_ENV === 'development') {
    aquaConfig = {
      ...RINKEBY_CONFIG,
      ...SUPPORTED_CHAINS[CHAIN_ID.RINKEBY].contracts,
      subgraph: SUBGRAPH_ENDPOINT,
    }
  }

  // Use Rinkeby
  if (chainId && chainId === CHAIN_ID.RINKEBY) {
    aquaConfig = { ...RINKEBY_CONFIG, ...SUPPORTED_CHAINS[CHAIN_ID.RINKEBY].contracts }
  }

  return aquaConfig
}
