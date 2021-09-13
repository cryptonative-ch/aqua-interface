export const APP_NAME = process.env.REACT_APP_APP_NAME || 'Aqua'
export const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID || '766514f6bce34bce82d3c32ed423f159'
export const SANCTION_LIST = ['BY', 'CU', 'IR', 'IQ', 'CI', 'LR', 'KP', 'SD', 'SY', 'ZW']
export const SUBGRAPH_ENDPOINT = process.env.REACT_APP_SUBGRAPH_ENDPOINT as string
export const FE_VERSION = '0.1.1'
export const SC_VERSION = '0.1.1'
export const NETWORK_CONTEXT_NAME = 'Network'
export enum CHAIN_ID {
  RINKEBY = 4,
  XDAI = 100,
}
export const SUPPORTED_CHAIN_IDS = [CHAIN_ID.RINKEBY, CHAIN_ID.XDAI]

export const SUPPORTED_CHAINS = {
  [CHAIN_ID.RINKEBY]: {
    id: CHAIN_ID.RINKEBY,
    name: 'Rinkeby Testnet',
    contracts: {
      factory: '0xA4bEdDf001392121a88192a2a2348c9102e8E6B3',
      saleLauncher: '0x248617E4f69E86a727A4e03bA8d6e65A23d12e45',
      templateLauncher: '0xC8Ab9E079D8207fB755953b0C464C8C5313FE83a',
    },
    subgraph: 'https://api.thegraph.com/subgraphs/name/mprasanjith/aqua-rinkeby-next',
    parameters: {
      chainId: '0x4',
      chainName: 'Ethereum',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://rinkeby.infura.io/v3'],
      blockExplorerUrls: ['https://rinkeby.etherscan.io'],
    },
  },
  [CHAIN_ID.XDAI]: {
    id: CHAIN_ID.XDAI,
    name: 'xDai Chain',
    contracts: {
      factory: '0x0f1997E82cd484a54551b54009DdcE39deaE973f',
      saleLauncher: '0xC28c613f0f0b85C745AC58BA78071816Cb52B43A',
      templateLauncher: '0x58c67b46c47f69d63aa09d5f822ede377c479d5f',
    },
    subgraph: 'https://api.thegraph.com/subgraphs/name/dxgraphs/aqua-xdai',
    parameters: {
      chainId: '0x64',
      chainName: 'xDai',
      nativeCurrency: {
        name: 'xDai',
        symbol: 'xDai',
        decimals: 18,
      },
      rpcUrls: ['https://rpc.xdaichain.com/'],
      blockExplorerUrls: ['https://blockscout.com/xdai/mainnet'],
    },
  },
}
export const SHOW_TERMS_AND_CONDITIONS = false
export const IPFS_GATEWAY_URL = 'https://gateway.pinata.cloud'
export const FEEDBACK_FORM_URL = 'https://forms.gle/JSSVTWsM5Yy44ZUi7'
export const GITHUB_BUG_REPORT_URL = 'https://github.com/cryptonative-ch/mesa-interface/issues/new'
