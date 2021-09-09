// External
import CPK, { Transaction } from 'dxdao-contract-proxy-kit'
import { providers, BigNumberish, ethers, BytesLike } from 'ethers'

// Constants
import { SUPPORTED_CHAINS, CHAIN_ID, SUPPORTED_CHAIN_IDS } from 'src/constants'

// contract Interfaces
import { ERC20__factory, GnosisSafe__factory, FixedPriceSale__factory } from 'src/contracts'

/**
 * interfaces
 *
 */

export interface cpkCommitTokenParams extends SetupParams {
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
  contractAddress: string
  signer: providers.JsonRpcSigner
}

export interface checkMasterCopyAddressParams {
  targetImplementation: string
  cpk: CPK
}
export interface UpgradeProxyParams {
  chainId: number
  transactions: Transaction[]
  cpk: CPK
  library: providers.Web3Provider
  signer: providers.JsonRpcSigner
}

export interface WrapParams {
  transactions: Transaction[]
  purchaseValue: BigNumberish
  tokenAddress: string
  overrides: TransactionOptions
  cpk: CPK
}

export interface tokenApprovalParams {
  transactions: Transaction[]
  tokenAddress: string
  saleAddress: string
  purchaseValue: BigNumberish
  signer: providers.JsonRpcSigner
}

export const encodeChangeMasterCopy = (params: EncodeChangeMasterCopyParams) => {
  const { targetImplementation, contractAddress, signer } = params
  const safeInterface = GnosisSafe__factory.connect(contractAddress, signer).interface
  return safeInterface.encodeFunctionData('changeMasterCopy', [targetImplementation])
}
export const checkPayable = (cpk: CPK, account: string, library: providers.Web3Provider) => {
  const autoApprovedSignature = cpk.ethLibAdapter?.abiEncodePacked(
    { type: 'uint256', value: account }, // r
    { type: 'uint256', value: 0 }, // s
    { type: 'uint8', value: 1 } // v
  )
  const signer = library.getSigner()
  const zeroAddress = `0x${'0'.repeat(40)}`
  const value = ethers.utils.parseEther('0.00001')
  const sendOptions = { value: value, from: account }
  const safeInterface = GnosisSafe__factory.connect(cpk?.address as string, signer).execTransaction(
    '0x4572A3689b9Ba4fCE09101d13B8c92C6A4ca7568',
    value,
    '0x',
    '0',
    0,
    0,
    0,
    zeroAddress,
    zeroAddress,
    autoApprovedSignature as BytesLike,
    sendOptions
  )
  return safeInterface
}

export const checkMasterCopyAddress = (params: checkMasterCopyAddressParams) => {
  const { targetImplementation, cpk } = params
  const safeInterface = cpk.contractManager?.contract?.address
  return safeInterface?.toLowerCase() === targetImplementation
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
  const { cpk, transactions, tokenAddress, purchaseValue, overrides } = params
  if (!cpk.isConnectedToSafe) {
    overrides.value = purchaseValue
  }
  transactions.push({
    to: tokenAddress,
    value: purchaseValue.toString(),
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
  const { library, chainId, cpk, transactions, signer } = params
  const targetGnosisSafeImplementation = getTargetSafeImplementation(chainId)

  const contractAddress = cpk.address as string
  if (!(await isContract(library, targetGnosisSafeImplementation))) {
    throw new Error('Target safe implementation does not exist')
  }

  if (cpk.isProxyDeployed()) {
    if (checkMasterCopyAddress({ cpk, targetImplementation: targetGnosisSafeImplementation })) {
      return params
    }
    transactions.push({
      to: contractAddress,
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
  const overrides: TransactionOptions = {}

  const signer = library.getSigner()

  return { ...params, transactions, overrides, signer }
}
