// External
import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// Hooks
import { useTokenContract } from 'src/hooks/useTokenContract'

// Interfaces
interface UseTokenBalanceProps {
  tokenAddress?: string
  owner?: string
}

/**
 * Returns the balance owned by the address
 */
export function useTokenBalance({ owner, tokenAddress }: UseTokenBalanceProps) {
  const [t] = useTranslation()
  const [balance, setBalanace] = useState(BigNumber.from(0))
  const tokenContract = useTokenContract(tokenAddress)

  useEffect(() => {
    // Contract is empty or no address
    if (!tokenContract || !owner) {
      return
    }

    tokenContract
      .balanceOf(owner)
      .then(setBalanace)
      .catch((error: any) => {
        console.error(`Could not fetch token balance for ${owner} at ${tokenAddress}`)
        console.error(error)
        toast.error(t('error.fetchBalance'))
      })
  }, [owner, tokenAddress])

  return balance
}
