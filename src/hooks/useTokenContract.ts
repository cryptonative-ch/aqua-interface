// Externals
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'


// ERC20 Factory
import { ERC20__factory } from 'src/contracts'

// Utils
import { getProviderOrSigner } from 'src/utils'

export function useTokenContract(tokenAddress?: string) {

  const { library, account } = useWeb3React()

  return useMemo(() => {
    if (!tokenAddress || !library) {
      return null
    }


    return ERC20__factory.connect(tokenAddress, getProviderOrSigner(library, account))

  }, [tokenAddress, account, library])
}
