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
      factory: '0xa1Bf3bfDbC86Fd6eC7E2d9707609d7fAc0d93EeF',
      saleLauncher: '0x6085eb96659B0e90bc59288750C8306eE390fA99',
      templateLauncher: '0x569DD258D95c8f558AAf6fe808a0cfC00D941565',
    },
    parameters: {
      chainId: '0x4',
      chainName: 'Ethereum',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://rinkeby.infura.io/v3'],
      blockExplorerUrls: ['https://rinkeby.etherscan.com'],
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
export const SALE_INFO_IPFS_HASH_MOCK = 'QmRVKi23YQmXLStgSK5bQS9QyiAeWZmjVNQTbx61NUAhcg'
export const FEEDBACK_FORM_URL = 'https://forms.gle/JSSVTWsM5Yy44ZUi7'
export const GITHUB_BUG_REPORT_URL = 'https://github.com/cryptonative-ch/mesa-interface/issues/new'
