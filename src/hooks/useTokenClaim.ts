// Externals
import { useState, useEffect } from 'react'
import { ContractTransaction } from 'ethers'
import { useWeb3React } from '@web3-react/core'
// contracts
import { FixedPriceSale__factory } from 'src/contracts'

// interface
import { MetaMaskError } from 'src/interfaces/Error'

enum ClaimState {
  UNCLAIMED = 'unclaimed',
  VERIFY = 'verify',
  FAILED = 'failed',
  CLAIMED = 'claimed',
}

interface useTokenClaimReturns {
  claim: ClaimState
  transaction: ContractTransaction | undefined
  error: MetaMaskError | undefined
  claimTokens: (saleId: string) => void
  withdrawTokens: (saleId: string) => void
}

export function useTokenClaim(): useTokenClaimReturns {
  const [claim, setClaim] = useState<ClaimState>(ClaimState.UNCLAIMED)
  const [error, setError] = useState<MetaMaskError>()
  const [transaction, setTransaction] = useState<ContractTransaction>()
  const { account, library, chainId } = useWeb3React()
  const signer = library?.getSigner()

  useEffect(() => {
    if (!chainId || !library || !account) {
      return
    }
  }, [account, chainId, library])

  const claimTokens = (saleId: string) => {
    //take this out before production
    FixedPriceSale__factory.connect(saleId, signer)
      .closeSale()
      .then((tx: ContractTransaction) => {
        return tx.wait(1)
      })
      .catch((error: MetaMaskError) => {
        console.log(error)
        return setError(error)
      })
    FixedPriceSale__factory.connect(saleId, signer)
      .claimTokens()
      .then((tx: ContractTransaction) => {
        setClaim(ClaimState.VERIFY)
        setTransaction(tx)
        return tx.wait(1)
      })
      .then(receipt => {
        console.log(receipt)
        return setClaim(ClaimState.CLAIMED)
      })
      .catch((error: MetaMaskError) => {
        setError(error)
        console.log(error)
        return setClaim(ClaimState.FAILED)
      })
  }
  const withdrawTokens = (saleId: string) => {
    FixedPriceSale__factory.connect(saleId, signer)
      .releaseTokens()
      .then((tx: ContractTransaction) => {
        setClaim(ClaimState.VERIFY)
        setTransaction(tx)
        return tx.wait(1)
      })
      .then(receipt => {
        console.log(receipt)
        return setClaim(ClaimState.CLAIMED)
      })
      .catch((error: MetaMaskError) => {
        setError(error)
        console.log(error)
        return setClaim(ClaimState.FAILED)
      })
  }
  return {
    claim,
    transaction,
    error,
    claimTokens,
    withdrawTokens,
  }
}
