// External
import { useState, useEffect, useCallback } from 'react'
import CPK, { EthersAdapter } from 'dxdao-contract-proxy-kit'
import { ethers, providers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { Transaction } from 'dxdao-contract-proxy-kit'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// helpers
import { pipe } from 'src/utils'
import { setup, getTargetSafeImplementation, TransactionOptions } from 'src/CPK'

//interfaces
import { CHAIN_ID, SUPPORTED_CHAINS } from 'src/constants'

interface useCPKReturns {
  cpk: CPK | null
}

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

interface useCPKexecTransactionsReturns {
  CPKpipe: (...functions: any[]) => (params?: any) => void
  transactionHash: Record<string, any> | null
  loading: boolean
  error: Error | null
}

interface CPKexecuteTransactionParams {
  transactions: Transaction[]
  overrides: TransactionOptions
}

export function useCPKexecTransactions(): useCPKexecTransactionsReturns {
  const [t] = useTranslation()
  const { account, library, chainId } = useWeb3React()
  const { cpk } = useCPK(library, chainId)

  const [transactionHash, setTransactionHash] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const CPKexecuteTransaction = async (params: CPKexecuteTransactionParams) => {
    const { transactions, overrides } = params
    if (cpk) {
      try {
        setLoading(true)
        const { transactionResponse } = await cpk.execTransactions(transactions, overrides as any)

        if (transactionResponse) {
          await transactionResponse.wait(1)
          setLoading(false)
          toast.success(t('success.purchase'))
          setTransactionHash(transactionResponse)
        }
      } catch (error) {
        setLoading(false)
        setError(error)
        console.error(error)
        toast.error(t('errors.purchase'))
      }
    }
  }

  const CPKpipe = (...functions: any[]) => (params?: any) => pipe(setup, ...functions, CPKexecuteTransaction)(params)

  useEffect(() => {
    if (!account || !chainId || !library || !cpk) {
      return
    }
  }, [account, chainId, library, cpk])

  return {
    CPKpipe,
    transactionHash,
    loading,
    error,
  }
}
