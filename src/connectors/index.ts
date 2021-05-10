// Externals
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { CustomNetworkConnector } from './CustomNetworkConnector'
import { UnsupportedChainIdError } from '@web3-react/core'

// Constants
import { CHAIN_ID, INFURA_PROJECT_ID } from 'src/constants'

export const network = new CustomNetworkConnector({
  urls: {
    [CHAIN_ID.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
    [CHAIN_ID.XDAI]: 'https://rpc.xdaichain.com/',
  },
  defaultChainId: CHAIN_ID.XDAI,
})

export const injected = new InjectedConnector({
  supportedChainIds: [CHAIN_ID.RINKEBY, CHAIN_ID.XDAI],
})

export function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}
