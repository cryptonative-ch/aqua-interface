// External
import { useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'

// hooks
import { useCPK } from 'src/hooks/useCPK'

// contract interface
import { WXDAI__factory, WETH__factory, FixedPriceSale__factory, FairSale__factory } from 'src/contracts'
import { NumberLike } from 'contract-proxy-kit/lib/cjs/utils/basicTypes'

interface useWrapNativeTokenReturns {
  wrap: () => void
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
  const signer = library.getSigner()

  const WETH = WETH__factory.connect(tokenAddress, signer)
  const WXDAI = WXDAI__factory.connect(tokenAddress, signer)
  const fixedPriceSale = FixedPriceSale__factory.connect(saleAddress, signer)
  const fairSale = FairSale__factory.connect(saleAddress, signer)

  // @TODO: new UI required?

  // fund proxy with  ETH/XDAI before executing transactions
  // deposit into WETH/WXDAI contract
  // approve transfer of value from CPK contract
  // transfer value to Sale contract
  const tx = [
    {
      to: tokenAddress,
      data: WETH.encodeFunctionData('deposit', value),
      value: value,
    },
    {
      to: saleAddress,
      data: WETH.encodeFunctionData('approve', saleAddress, value),
      value: value,
    },
    {
      to: saleAddress,
      data: fixedPriceSale.encodeFunctionData('commitTokens', value),
      value: value,
    },
  ]

  const wrap = useCallback(async () => {
    if (cpk) {
      try {
        setLoading(true)
        await signer.sendTransaction({
          to: cpk.address,
          value: value,
        })
        const { hash } = await cpk.execTransactions(tx)

        if (hash) {
          setLoading(false)
          return setTransactionHash(hash)
        }
      } catch (error) {
        setLoading(false)
        setError(error)
        console.error(error)
      }
    }
  }, [cpk])

  return {
    wrap,
    transactionHash,
    loading,
    error,
  }
}
