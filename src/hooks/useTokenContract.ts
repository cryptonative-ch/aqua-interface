// Externals
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'

// Contracts
import { ERC20__factory } from 'src/contracts'

export function useTokenContract(tokenAddress?: string) {
  const { library, account } = useWeb3React()

  return useMemo(() => {
    if (!tokenAddress || !library) {
      return null
    }

    return ERC20__factory.connect(tokenAddress, library)
  }, [tokenAddress, account, library])
}
