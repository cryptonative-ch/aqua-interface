// External
import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Transaction } from 'contract-proxy-kit'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { BigNumberish } from '@ethersproject/bignumber'

// hooks
import { useCPK } from 'src/hooks/useCPK'

// helpers
import { pipe } from 'src/utils'
import { setup } from 'src/CPK/helpers'

//interfaces
import {} from 'src/'

interface useCPKexecTransactionsReturns {
  CPKpipe: (functions: any[]) => void
  transactionHash: Record<string, any> | null
  loading: boolean
  error: Error | null
}

export function useCPKexecTransactions(): useCPKexecTransactionsReturns {
  const [t] = useTranslation()
  const { account, library, chainId } = useWeb3React()
  const { cpk } = useCPK(library)

  const [transactionHash, setTransactionHash] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const CPKexecuteTransaction = async (transactions: Transaction[], txOptions: TransactionOptions) => {
    if (cpk) {
      try {
        setLoading(true)

        const { transactionResponse } = await cpk.execTransactions(transactions, txOptions)

        if (transactionResponse) {
          await transactionResponse.wait(1)
          setLoading(false)
          toast.success(t('success.purchase'))
          return setTransactionHash(transactionResponse)
        }
      } catch (error) {
        setLoading(false)
        setError(error)
        console.error(error)
        toast.success(t('fail.purchase'))
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
