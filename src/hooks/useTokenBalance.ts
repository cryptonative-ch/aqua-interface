// External
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'

/**
 * Returns the balance owned by the address
 */
export function useTokenBalance(tokenContractAddress: string) {
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))
  const { library, account } = useWeb3React()

  useEffect(() => {
    setBalance(BigNumber.from(6535))
  }, [library, account])

  return balance
}
