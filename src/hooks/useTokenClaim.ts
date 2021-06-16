// Externals
import { useState, useEffect } from 'react'
import { ContractTransaction } from 'ethers'
import { useWeb3React } from '@web3-react/core'
// contracts
import { FixedPriceSale__factory } from 'src/contracts'

// interface
import { MetaMaskError } from 'src/interfaces/Sale'

type Claim = 'unclaimed' | 'verify' | 'failed' | 'claimed'

interface useTokenClaimReturns {
  claim: Claim
  transaction: ContractTransaction | undefined
  error: MetaMaskError | undefined
  claimTokens: (saleId: string) => void
  withdrawTokens: (saleId: string) => void
  withdrawError: MetaMaskError | undefined
  claimWithdraw: Claim
}

export function useTokenClaim(): useTokenClaimReturns {
  const [claim, setClaim] = useState<Claim>('unclaimed')
  const [claimWithdraw, setClaimWithdraw] = useState<Claim>('unclaimed')
  const [error, setError] = useState<MetaMaskError>()
  const [withdrawError, setWithdrawError] = useState<MetaMaskError>()
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
        tx.wait(1)
      })
      .catch((error: MetaMaskError) => {
        console.log(error)
        setError(error)
      })
    FixedPriceSale__factory.connect(saleId, signer)
      .claimTokens()
      .then((tx: ContractTransaction) => {
        setClaim('verify')
        tx.wait(1)
        setTransaction(tx)
      })
      .then(receipt => {
        console.log(receipt)
        setClaim('claimed')
      })
      .catch((error: MetaMaskError) => {
        setError(error)
        console.log(error)
        setClaim('failed')
      })
  }
  const withdrawTokens = (saleId: string) => {
    //take this out before production
    FixedPriceSale__factory.connect(saleId, signer)
      .releaseTokens()
      .then((tx: ContractTransaction) => {
        setClaimWithdraw('verify')
        tx.wait(1)
        setTransaction(tx)
      })
      .then(receipt => {
        console.log(receipt)
        setClaimWithdraw('claimed')
      })
      .catch((error: MetaMaskError) => {
        setWithdrawError(error)
        console.log(error)
        setClaimWithdraw('failed')
      })
  }
  return {
    claim,
    transaction,
    error,
    claimTokens,
    withdrawTokens,
    claimWithdraw,
    withdrawError,
  }
}
