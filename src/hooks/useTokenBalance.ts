// External
import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'

// Hooks
import { useTokenContract } from './useTokenContract'

// Interfaces
interface UseTokenBalanceProps {
  tokenAddress?: string
  owner?: string
}

/**
 * Returns the balance owned by the address
 */
export function useTokenBalance({ owner, tokenAddress }: UseTokenBalanceProps) {
  const [balance, setBalanace] = useState(BigNumber.from(0))
  const tokenContract = useTokenContract(tokenAddress)

  useEffect(() => {
    // Contract is empty or no address
    if (!tokenContract || !owner) {
      return
    }

    tokenContract.balanceOf(owner).then(setBalanace)
  }, [owner, tokenAddress])

  return balance
}
