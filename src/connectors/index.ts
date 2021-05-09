import { InjectedConnector } from '@web3-react/injected-connector'
import { CustomNetworkConnector } from './CustomNetworkConnector'
import { ChainId, INFURA_PROJECT_ID } from 'src/constants'

export const network = new CustomNetworkConnector({
  urls: {
    [ChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
    [ChainId.XDAI]: 'https://rpc.xdaichain.com/',
  },
  defaultChainId: ChainId.XDAI,
})

export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.RINKEBY, ChainId.XDAI],
})
