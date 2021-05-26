// Externals
import { BigNumber } from '@ethersproject/bignumber'
import { useMemo, useState } from 'react'

// Hooks
import { useTokenContract } from './useTokenContract'

export function useTokenAllowance(tokenAddress: string, owner: string, spender: string): BigNumber | undefined {
  const [allowance, setAllownace] = useState<BigNumber>(BigNumber.from(0))
  const tokenContract = useTokenContract(tokenAddress)

  return useMemo(() => {
    if (!tokenContract) {
      return allowance
    }

    tokenContract
      .allowance(owner, spender)
      .then(setAllownace)
      .catch(() => {
        console.log(`Could not get the allowance for ${owner}`)
      })

    return allowance
  }, [tokenContract, tokenAddress, owner, spender])
}
