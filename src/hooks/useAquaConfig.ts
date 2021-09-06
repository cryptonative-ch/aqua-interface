// External
import { AquaConfigMap, RINKEBY_CONFIG, XDAI_CONFIG } from '@dxdao/aqua'
import { useWeb3React } from '@web3-react/core'

// Constants
import { CHAIN_ID, SUPPORTED_CHAINS, SUBGRAPH_ENDPOINT } from 'src/constants'

export function useAquaConfig() {
  const { chainId } = useWeb3React()

  // Default: XDAI
  let aquaConfig: AquaConfigMap = {
    ...XDAI_CONFIG,
    subgraph: SUPPORTED_CHAINS[CHAIN_ID.XDAI].subgraph,
  }

  // Use Rinkeby
  if (chainId && chainId === CHAIN_ID.RINKEBY) {
    aquaConfig = { ...RINKEBY_CONFIG, subgraph: SUPPORTED_CHAINS[CHAIN_ID.RINKEBY].subgraph }
  }

  // Mock
  if (SUBGRAPH_ENDPOINT === 'http://localhost:4000/graphql') {
    aquaConfig = {
      ...RINKEBY_CONFIG,
      subgraph: SUBGRAPH_ENDPOINT,
    }
  }

  return aquaConfig
}
