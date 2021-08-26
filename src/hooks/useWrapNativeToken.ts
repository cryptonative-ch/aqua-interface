// External
import { useState, useCallback, useMemo, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Transaction } from 'contract-proxy-kit'
import { NumberLike } from 'contract-proxy-kit/lib/cjs/utils/basicTypes'
import { utils } from 'ethers'
import { BigNumber as valueBigNumber } from 'ethers'
import BigNumber from 'bignumber.js'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// hooks
import { useCPK } from 'src/hooks/useCPK'

// contract interface
import { WXDAI__factory, WETH__factory, FixedPriceSale__factory, FairSale__factory } from 'src/contracts'

interface useWrapNativeTokenReturns {
  wrap: () => void
  transactionHash: Record<string, any> | null
  loading: boolean
  error: Error | null
}

export function useWrapNativeToken(
  tokenAddress: string,
  saleAddress: string,
  purchaseValue: NumberLike | undefined
): useWrapNativeTokenReturns {
  const [t] = useTranslation()
  const { library } = useWeb3React()
  const { cpk } = useCPK(library)

  const [transactionHash, setTransactionHash] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const signer = library?.getSigner()

  const WETH = useMemo(() => WETH__factory.connect(tokenAddress, signer).interface, [WETH__factory])
  const WXDAI = useMemo(() => WXDAI__factory.connect(tokenAddress, signer).interface, [WXDAI__factory])
  const fixedPriceSale = useMemo(() => FixedPriceSale__factory.connect(saleAddress, signer).interface, [
    FixedPriceSale__factory,
  ])
  const fairSale = useMemo(() => FairSale__factory.connect(saleAddress, signer), [FairSale__factory])

  let value: valueBigNumber
  let tx: Transaction[]

  useEffect(() => {
    if (!library) {
      return
    }
  }, [library])

  const wrap = useCallback(async () => {
    if (cpk && purchaseValue) {
      value = utils.parseEther(purchaseValue.toString())
      const bignumberValue = new BigNumber(value.toString())

      tx = [
        {
          to: tokenAddress,
          value: value.toString(),
        },
        {
          to: tokenAddress,
          data: WXDAI.encodeFunctionData('approve', [saleAddress, value]),
        },
        {
          to: saleAddress,
          data: fixedPriceSale.encodeFunctionData('commitTokens', [value]),
        },
      ]
      try {
        setLoading(true)

        const { transactionResponse } = await cpk.execTransactions(tx)

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
  }, [cpk, purchaseValue])

  return {
    wrap,
    transactionHash,
    loading,
    error,
  }
}
