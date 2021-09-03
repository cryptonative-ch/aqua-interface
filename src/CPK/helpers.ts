// External
import CPK, { Transaction } from 'contract-proxy-kit'
import { providers, BigNumberish } from 'ethers'

// Constants
import { SUPPORTED_CHAINS, CHAIN_ID, SUPPORTED_CHAIN_IDS } from 'src/constants'

// contract Interfaces
import { ERC20__factory, GnosisSafe__factory, FixedPriceSale__factory } from 'src/contracts'

/**
 * interfaces
 *
 */

export interface cpkCommitTokenParams extends SetupParams {
  txOption: TransactionOptions
  contractAddress: string
  tokenAddress: string
  saleAddress: string
}
export interface SetupParams {
  library: providers.Web3Provider
}
export interface TransactionOptions {
  value?: BigNumberish
  gas?: number
}
export interface ContractInstanceParams {
  contractAddress: string
  provider: providers.Web3Provider
}

export interface EncodeChangeMasterCopyParams {
  targetImplementation: string
  signer: providers.JsonRpcSigner
  contractAddress: string
}
export interface UpgradeProxyParams {
  chainId: number
  transactions: Transaction[]
  cpk: CPK
  library: providers.Web3Provider
  contractAddress: string
  signer: providers.JsonRpcSigner
}

export interface WrapParams {
  transactions: Transaction[]
  purchaseValue: string
  tokenAddress: string
}

export interface tokenApprovalParams {
  transactions: Transaction[]
  tokenAddress: string
  saleAddress: string
  purchaseValue: string
  signer: providers.JsonRpcSigner
}

export const encodeChangeMasterCopy = (params: EncodeChangeMasterCopyParams) => {
  const { targetImplementation, contractAddress, signer } = params
  const safeInterface = GnosisSafe__factory.connect(contractAddress, signer).interface
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

export const tokenApproval = async (params: tokenApprovalParams) => {
  const { transactions, tokenAddress, purchaseValue, saleAddress, signer } = params
  const erc20Interface = ERC20__factory.connect(tokenAddress, signer).interface
  transactions.push({
    to: tokenAddress,
    data: erc20Interface.encodeFunctionData('approve', [saleAddress, purchaseValue]),
  })

  return params
}

export const commitToken = async (params: tokenApprovalParams) => {
  const { transactions, purchaseValue, saleAddress, signer } = params
  const fixedPriceSaleInterface = FixedPriceSale__factory.connect(saleAddress, signer).interface
  transactions.push({
    to: saleAddress,
    data: fixedPriceSaleInterface.encodeFunctionData('commitTokens', [purchaseValue]),
  })

  return params
}

export const upgradeProxy = async (params: UpgradeProxyParams) => {
  const { library, chainId, cpk, transactions, contractAddress, signer } = params
  const targetGnosisSafeImplementation = getTargetSafeImplementation(chainId)

  if (!(await isContract(library, targetGnosisSafeImplementation))) {
    throw new Error('Target safe implementation does not exist')
  }
  if (cpk.isProxyDeployed()) {
    transactions.push({
      to: cpk?.address as string,
      data: encodeChangeMasterCopy({
        contractAddress,
        signer,
        targetImplementation: targetGnosisSafeImplementation,
      }),
    })
  }

  return params
}

export const setup = async (params: SetupParams) => {
  const { library } = params
  // cpk empty transaction array
  const transactions: Transaction[] = []

  // cpk empty transaction options
  const txOptions: TransactionOptions = {}

  const signer = library.getSigner()

  return { ...params, transactions, txOptions, signer }
}
