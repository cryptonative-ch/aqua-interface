import { useState, useEffect } from 'react'
import CPK, { EthersAdapter } from 'contract-proxy-kit'
import { ethers, providers } from 'ethers'

interface useCPKReturns {
  cpk: CPK | null
}

export function useCPK(library: providers.Web3Provider): useCPKReturns {
  const [cpk, setCPK] = useState<CPK | null>(null)

  useEffect(() => {
    const makeCpk = async () => {
      if (library) {
        const signer = library.getSigner()
        const ethLibAdapter = new EthersAdapter({ ethers, signer: signer })
        const service = await CPK.create({ ethLibAdapter })
        setCPK(service)
      }
    }
    makeCpk()
  }, [library])

  return { cpk }
}
