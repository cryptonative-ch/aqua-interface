// Externals
import { BigNumber } from '@ethersproject/bignumber'
import { useEffect, useState } from 'react'

// Hooks
import { useTokenContract } from './useTokenContract'

export function useTokenAllowance(tokenAddress: string, owner: string, spender: string): BigNumber | undefined {
  const [allowance, setAllownace] = useState<BigNumber>(BigNumber.from(0))
  const tokenContract = useTokenContract(tokenAddress)

  useEffect(() => {
    if (!tokenContract) {
      return
    }

    console.log('Calling allowance')
    tokenContract
      .allowance(owner, spender)
      .then(results => {
        console.log({ results })
        setAllownace(results)
      })
      .catch(() => {
        console.log(`Could not get the allowance for ${owner}`)
      })
  }, [tokenContract, tokenAddress, owner, spender])

  return allowance
}
