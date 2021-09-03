// Externals
import { providers, ethers } from 'ethers'
import { Transaction } from 'contract-proxy-kit'
import { cleanup } from '@testing-library/react'
import CPK, { EthersAdapter } from 'contract-proxy-kit'
// CPK helper functions
import { setup, upgradeProxy, wrap, tokenApproval, commitToken, TransactionOptions } from 'src/CPK/helpers'

// constants
import { SUPPORTED_CHAINS, CHAIN_ID } from 'src/constants'

// hooks
import { useCPK } from 'src/hooks/useCPK'

afterEach(cleanup)

describe('CPK functions test', () => {
  test('should handle setup', async () => {
    const Provider = new providers.JsonRpcProvider()
    const library = new providers.Web3Provider(Provider)
    const signer = library.getSigner()
    const transactions: Transaction[] = []
    const txOptions: TransactionOptions = {}
    expect(await setup({ library })).toMatchObject({ library, transactions, txOptions, signer })
  })
  test('should handle upgradeProxy', async () => {
    const Provider = new providers.JsonRpcProvider()
    const library = new providers.Web3Provider(Provider)
    const chainId = 4
    const networks = { [SUPPORTED_CHAINS[chainId as CHAIN_ID].id]: SUPPORTED_CHAINS[chainId as CHAIN_ID].cpk }
    const signer = library.getSigner()
    const transactions: Transaction[] = []
    const ethLibAdapter = new EthersAdapter({ ethers, signer: signer })
    const cpk = await CPK.create({ ethLibAdapter, networks })
    const contractAddress = '0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F'
    expect(upgradeProxy({ library, chainId, transactions, contractAddress, signer, cpk })).toMatchObject({})
  })
})
