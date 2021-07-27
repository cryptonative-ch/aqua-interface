// Externals
import { useState, useEffect } from 'react'
import { ContractTransaction } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
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
}

export function useTokenClaim(): useTokenClaimReturns {
  const [claim, setClaim] = useState<ClaimState>(ClaimState.UNCLAIMED)
  const [error, setError] = useState<MetaMaskError>()
  const [transaction, setTransaction] = useState<ContractTransaction>()
  const { account, library, chainId } = useWeb3React()
  const [t] = useTranslation()
  const signer = library?.getSigner()

  useEffect(() => {
    if (!chainId || !library || !account) {
      return
    }
  }, [account, chainId, library])

  const claimTokens = (saleId: string) => {
    //take this out before production
    if (account) {
      FixedPriceSale__factory.connect(saleId, signer)
        .closeSale()
        .then((tx: ContractTransaction) => {
          return tx.wait(1)
        })
        .catch((error: MetaMaskError) => {
          console.error(error)
          return setError(error)
        })
      // Withdraw tokens - withdraws investment or purchase depending on if successful
      FixedPriceSale__factory.connect(saleId, signer)
        .withdrawTokens(account)
        .then((tx: ContractTransaction) => {
          setClaim(ClaimState.VERIFY)
          setTransaction(tx)
          return tx.wait(1)
        })
        .then(() => {
          toast.success(t('success.claim'))
          return setClaim(ClaimState.CLAIMED)
        })
        .catch((error: MetaMaskError) => {
          setError(error)
          console.error(error)
          toast.error(t('errors.claim'))
          return setClaim(ClaimState.FAILED)
        })
    }
  }
  return {
    claim,
    transaction,
    error,
    claimTokens,
  }
}
