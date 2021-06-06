/**
 * @todo remove FIXED_PRICE_SALE_CONTRACT_ADDRESS
 */
export const APP_NAME = process.env.REACT_APP_APP_NAME || 'Mesa'
export const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID || '766514f6bce34bce82d3c32ed423f159'
export const SANCTION_LIST = ['BY', 'CU', 'IR', 'IQ', 'CI', 'LR', 'KP', 'SD', 'SY', 'ZW']
export const FIXED_PRICE_SALE_CONTRACT_ADDRESS = '0x60536376d81d7f3db47231b70b127817ef249027'
export const SUBGRAPH_ENDPOINT = process.env.REACT_APP_SUBGRAPH_ENDPOINT as string
export const FE_VERSION = '0.0.1'
export const SC_VERSION = '0.0.1'
export const NETWORK_CONTEXT_NAME = 'Network'
export const SUPPORTED_CHAIN_IDS = [100]
export enum CHAIN_ID {
  MAINNET = 1,
  RINKEBY = 4,
  XDAI = 100,
}
export const XDAI_CHAIN_PARAMETER = {
  chainId: '0x64',
  chainName: 'xDai',
  nativeCurrency: {
    name: 'xDai',
    symbol: 'xDai',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.xdaichain.com/'],
  blockExplorerUrls: ['https://blockscout.com/xdai/mainnet'],
}
