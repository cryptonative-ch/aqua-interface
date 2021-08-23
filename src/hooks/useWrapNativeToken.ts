// External
import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'

// hooks
import { useCPK } from 'src/hooks/useCPK'

// contract interface
import { WXDAI__factory, WETH__factory, FixedPriceSale__factory, FairSale__factory } from 'src/contracts'
import { NumberLike } from 'contract-proxy-kit/lib/cjs/utils/basicTypes'

interface useWrapNativeTokenReturns {
  transactionHash: string | null
  loading: boolean
  error: Error | null
}

export function useWrapNativeToken(
  tokenAddress: string,
  saleAddress: string,
  value: NumberLike
): useWrapNativeTokenReturns {
  const { library } = useWeb3React()
  const { cpk } = useCPK(library)

  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const WETH = WETH__factory.connect(tokenAddress, library.getSigner())
  const WXDAI = WXDAI__factory.connect(tokenAddress, library.getSigner())

  // @TODO: new UI required?

  // fund proxy with  ETH/XDAI before executing transactions
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
              data: WETH.encodeFunctionData('deposit', value),
              value: value,
            },
            {
              to: saleAddress,
              data: WETH.encodeFunctionData('approve', (saleAddress, value)),
              value: value,
            },
            {
              to: saleAddress,
              data: WETH.encodeFunctionData('transfer', (saleAddress, value)),
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
