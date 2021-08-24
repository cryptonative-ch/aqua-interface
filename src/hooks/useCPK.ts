// External
import { useState, useEffect, useCallback } from 'react'
import CPK, { EthersAdapter } from 'contract-proxy-kit'
import { ethers, providers } from 'ethers'

interface useCPKReturns {
  cpk: CPK | null
}

export function useCPK(library: providers.Web3Provider): useCPKReturns {
  const [cpk, setCPK] = useState<CPK | null>(null)

  const makeCpk = useCallback(async () => {
    if (library) {
      const signer = library.getSigner()
      const ethLibAdapter = new EthersAdapter({ ethers, signer: signer })
      const service = await CPK.create({ ethLibAdapter })
      setCPK(service)
    }
  }, [library])

  useEffect(() => {
    makeCpk()
  }, [library])

  return { cpk }
}
