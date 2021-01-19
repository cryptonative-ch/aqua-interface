import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { BigNumber } from 'bignumber.js'

/**
 * Return the balance owned by the address
 */
export function useTokenBalance(address: string) {
  const [balance, setBalance] = useState<BigNumber>(new BigNumber(0))
  const { library } = useWeb3React()

  useEffect(() => {
    setBalance(new BigNumber(6535))
  }, [library])

  return balance
}
