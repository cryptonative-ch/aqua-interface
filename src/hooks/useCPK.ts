// External
import { useState, useEffect, useCallback } from 'react'
import CPK, { EthersAdapter } from 'dxdao-contract-proxy-kit'
import { ContractReceipt, ethers, providers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { Transaction } from 'dxdao-contract-proxy-kit'

// helpers
import { pipe } from 'src/utils'
import { setup, getTargetSafeImplementation, TransactionOptions } from 'src/CPK'

//interfaces
import { CHAIN_ID, SUPPORTED_CHAINS } from 'src/constants'
import { TransactionReceipt } from '@ethersproject/abstract-provider'

/**
 *
 * Interfaces
 *
 */
interface useCPKReturns {
  cpk: CPK | null
}
interface useCPKexecTransactionsReturns {
  CPKpipe: (...functions: any[]) => (params?: any) => CPKexecutetransactionReturns
}

interface CPKexecuteTransactionParams {
  transactions: Transaction[]
  overrides: TransactionOptions
}

export interface TransactionResult extends Partial<ContractReceipt> {
  hash?: string
  safeTxHash?: string
}

interface CPKexecutetransactionReturns {
  transactionResult: TransactionResult | null
  loading: boolean
  error: null | Error
}

/**
 * Creates an instance of the contract proxy kit to batch several /
 * transactions together
 * @param library
 * @param chainId
 * @returns CPK
 */

export function useCPK(library: providers.Web3Provider, chainId: number | undefined): useCPKReturns {
  const [cpk, setCPK] = useState<CPK | null>(null)

  const makeCpk = useCallback(async () => {
    const deployed = await cpk?.isProxyDeployed()
    const networks = { [SUPPORTED_CHAINS[chainId as CHAIN_ID].id]: SUPPORTED_CHAINS[chainId as CHAIN_ID].cpk }
    const signer = library.getSigner()
    const ethLibAdapter = new EthersAdapter({ ethers, signer: signer })
    if (!deployed && cpk && chainId) {
      SUPPORTED_CHAINS[chainId as CHAIN_ID].cpk.masterCopyAddress = getTargetSafeImplementation(chainId)
      const service = await CPK.create({ ethLibAdapter, networks })
      await service.init()
      return setCPK(service)
    }
    const service = await CPK.create({ ethLibAdapter, networks })
    await service.init()
    return setCPK(service)
  }, [library])

  useEffect(() => {
    if (!library || !chainId) {
      return
    }
    makeCpk()
  }, [library, chainId])

  return { cpk }
}

export function useCPKexecTransactions(): useCPKexecTransactionsReturns {
  const { account, library, chainId } = useWeb3React()
  const { cpk } = useCPK(library, chainId)

  const [transactionResult, setTransactionHash] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const CPKexecuteTransaction = async (params: CPKexecuteTransactionParams): Promise<CPKexecutetransactionReturns> => {
    const { transactions, overrides } = params
    if (cpk) {
      try {
        setLoading(true)
        const { transactionResponse } = await cpk.execTransactions(transactions, overrides as any)
        console.log(transactionResponse)

        if (transactionResponse) {
          await transactionResponse.wait(1)
          setLoading(false)
          setTransactionHash(transactionResponse)
        }
      } catch (error) {
        setLoading(false)
        setError(error)
      }
    }
    return { transactionResult, loading, error }
  }

  const CPKpipe = (...functions: any[]) => (params?: any) => pipe(setup, ...functions, CPKexecuteTransaction)(params)

  useEffect(() => {
    if (!account || !chainId || !library || !cpk) {
      return
    }
  }, [account, chainId, library, cpk])

  return {
    CPKpipe,
  }
}
