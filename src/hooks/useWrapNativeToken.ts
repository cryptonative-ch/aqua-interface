// External
import { useState, useCallback, useMemo, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Transaction } from 'contract-proxy-kit'
import { NumberLike } from 'contract-proxy-kit/lib/cjs/utils/basicTypes'
import { utils, BigNumber, BigNumberish } from 'ethers'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// hooks
import { useCPK } from 'src/hooks/useCPK'

interface useCPKexecTransactionsReturns {
  transactionHash: Record<string, any> | null
  loading: boolean
  error: Error | null
}

interface useCPKexecTransactionsParams {
  tokenAddress: string
  saleAddress: string
  purchaseValue: NumberLike | undefined
}

export function useCPKexecTransactions(params: useCPKexecTransactionsParams): useCPKexecTransactionsReturns {
  const [t] = useTranslation()
  const { library } = useWeb3React()
  const { cpk } = useCPK(library)

  const [transactionHash, setTransactionHash] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const signer = library?.getSigner()

  let value: BigNumber
  let transactions: Transaction[]

  useEffect(() => {
    if (!library || !cpk) {
      return
    }
  }, [library, cpk])
  ;async () => {
    if (cpk) {
      try {
        setLoading(true)
        const Dxdai = await signer.sendTransaction({ to: cpk?.address, value: value })
        Dxdai.wait(1)

        const { transactionResponse } = await cpk.execTransactions(transactions)

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
      }
    }
  }
  return {
    transactionHash,
    loading,
    error,
  }
}
