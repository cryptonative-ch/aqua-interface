// Externals
import { useState } from 'react'
import { Signer, ContractTransaction } from 'ethers'
// contracts
import { FixedPriceSale__factory } from 'src/contracts'

// interface
import { MetaMaskError } from 'src/interfaces/Sale'

type Claim = 'unclaimed' | 'verify' | 'failed' | 'claimed'

interface useTokenClaimReturns {
  claim: Claim
  transaction: ContractTransaction | undefined
  error: MetaMaskError | undefined
  claimTokens: (saleId: string, signer: Signer) => void
}

export function useTokenClaim(saleId: string, signer: Signer): useTokenClaimReturns {
  const [claim, setClaim] = useState<Claim>('unclaimed')
  const [error, setError] = useState<MetaMaskError>()
  const [transaction, setTransaction] = useState<ContractTransaction>()
  //take this out before production
  const claimTokens = (saleId: string, signer: Signer) => {
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
  return {
    claim,
    transaction,
    error,
    claimTokens,
  }
}
