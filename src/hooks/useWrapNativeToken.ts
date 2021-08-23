// External
import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'

// hooks
import { useCPK } from 'src/hooks/useCPK'

interface useWrapNativeTokenReturns {
  transactionHash: string | null
  loading: boolean
  error: Error | null
}

export function useWrapNativeToken(
  tokenAddress: string,
  value: BigNumber | number | string
): useWrapNativeTokenReturns {
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [loading, setLoading] = useState<booelan>(false)
  const [error, setError] = useState<Error | null>(null)
  const { library } = useWeb3React()

  const { cpk } = useCPK(library)

  // approve deposit into WETH/WXDAI contract
  // deposit into WETH/WXDAI contract
  // approve transfer of value from CPK contract
  // transfer value to Sale contract

  useEffect(() => {
    if (cpk) {
      const makeSwap = async () => {
        try {
          setLoading(true)
          const { hash } = await cpk.execTransactions([
            {
              to: tokenAddress,
              data: ERC20Interface.interface.functions.transfer.encode(),
              value: value,
            },
          ])
          if (hash) {
            setLoading(false)
            setTransactionHash(hash)
          }
        } catch (error) {
          setLoading(false)
          setError(error)
          console.error(error)
        }
      }
      makeSwap()
    }
  }, [cpk])

  return {
    transactionHash,
    loading,
    error,
  }
}
