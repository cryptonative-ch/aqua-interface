// External
import CPK, { Transaction } from 'contract-proxy-kit'
import { providers, BigNumberish } from 'ethers'

/**
 * @Todo TEST PIPES
 */

// Constants
import { SUPPORTED_CHAINS, CHAIN_ID, SUPPORTED_CHAIN_IDS } from 'src/constants'

// general helpers
import { pipe } from 'src/utils'

// contract Interfaces
import { ERC20__factory, GnosisSafe__factory, FixedPriceSale__factory } from 'src/contracts'

/**
 * interfaces
 *
 */

export interface TransactionOptions {
  value?: BigNumberish
  gas?: number
}
export interface ContractInstanceParams {
  contractAddress: string
  provider: providers.Web3Provider
}

export interface EncodeChangeMasterCopyParams extends ContractInstanceParams {
  targetImplementation: string
}
export interface UpgradeProxyParams extends ContractInstanceParams {
  networkId: number
  transactions: Transaction[]
  cpk: CPK
}

export interface WrapParams {
  transactions: Transaction[]
  purchaseValue: string
  tokenAddress: string
}

export interface tokenApprovalParams extends ContractInstanceParams {
  transactions: Transaction[]
  tokenAddress: string
  saleAddress: string
  purchaseValue: string
}
export interface CpkCommitTokenParams {
  transactions: Transaction[]
  tokenAddress: string
  saleAddress: string
}

export const encodeChangeMasterCopy = (params: EncodeChangeMasterCopyParams): string => {
  const { targetImplementation, contractAddress, provider } = params
  const safeInterface = GnosisSafe__factory.connect(contractAddress, provider)
  return safeInterface.encodeFunctionData('changeMasterCopy', [targetImplementation])
}

export const validChainId = (chainId: number): boolean => {
  return SUPPORTED_CHAIN_IDS.includes(chainId)
}

export const getTargetSafeImplementation = (chainId: number): string => {
  if (!validChainId(chainId)) {
    throw new Error(`Unsupported network id: '${chainId}'`)
  }
  return SUPPORTED_CHAINS[chainId as CHAIN_ID].cpk.targetSafeImplementation.toLowerCase()
}

export const isContract = async (provider: providers.Web3Provider, address: string): Promise<boolean> => {
  const code = await provider.getCode(address)
  if (code !== '0x') {
    return true
  }
  return false
}

export const wrap = async (params: WrapParams) => {
  const { transactions, tokenAddress, purchaseValue } = params
  transactions.push({
    to: tokenAddress,
    value: purchaseValue,
  })

  return params
}

export const tokenApproval = (params: tokenApprovalParams) => {
  const { transactions, tokenAddress, purchaseValue, saleAddress, provider } = params
  const erc20Interface = ERC20__factory.connect(tokenAddress, provider).interface
  transactions.push({
    to: tokenAddress,
    data: erc20Interface.encodeFunctionData('approve', [saleAddress, purchaseValue]),
  })

  return params
}

export const commitToken = (params: tokenApprovalParams) => {
  const { transactions, purchaseValue, saleAddress, provider } = params
  const fixedPriceSaleInterface = FixedPriceSale__factory.connect(saleAddress, provider).interface
  transactions.push({
    to: saleAddress,
    data: fixedPriceSaleInterface.encodeFunctionData('commitTokens', [purchaseValue]),
  })

  return params
}

export const upgradeProxy = async (params: UpgradeProxyParams) => {
  const { provider, networkId, cpk, transactions, contractAddress } = params
  const targetGnosisSafeImplementation = getTargetSafeImplementation(networkId)

  if (!(await isContract(provider, targetGnosisSafeImplementation))) {
    throw new Error('Target safe implementation does not exist')
  }

  if (cpk.isProxyDeployed()) {
    transactions.push({
      to: cpk?.address as string,
      data: encodeChangeMasterCopy({
        contractAddress,
        provider,
        targetImplementation: targetGnosisSafeImplementation,
      }),
    })
  }

  return params
}

const cpkCommitToken = (params: CpkCommitTokenParams) => {
  const { transactions } = pipe(upgradeProxy, wrap, tokenApproval, commitToken)(params)
  return transactions
}

interface SetupParams {
  account: string
  library: providers.Web3Provider
  chainId: number
  cpk: CPK
}

export const setup = (params: SetupParams) => {
  // cpk empty transaction array
  const transactions: Transaction[] = []

  // cpk empty transaction options
  const txOptions: TransactionOptions = {}

  return { ...params, transactions, txOptions }
}
