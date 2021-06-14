// Externals
import { useState, useEffect } from 'react'
import { Signer, ContractTransaction } from 'ethers'
// contracts
import { FixedPriceSale__factory } from 'src/contracts'

type Claim = 'unclaimed' | 'verify' | 'failed' | 'claimed'

interface useTokenClaimReturns {
  claim: Claim
  transaction: ContractTransaction | undefined
  error: Error | undefined
  claimTokens: (saleId: string, signer: Signer) => void
}

export function useTokenClaim(saleId: string, signer: Signer): useTokenClaimReturns {
  const [claim, setClaim] = useState<Claim>('unclaimed')
  const [error, setError] = useState<Error>()
  const [transaction, setTransaction] = useState<ContractTransaction>()
  //take this out before production
  const claimTokens = (saleId: string, signer: Signer) => {
    //take this out before production
    FixedPriceSale__factory.connect(saleId, signer)
      .closeSale()
      .then((tx: ContractTransaction) => {
        tx.wait(1)
      })
      .catch((error: Error) => {
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
      .catch((error: Error) => {
        setError(error)
        console.log(error)
        setClaim('failed')
      })
  }
  useEffect(() => {
    claimTokens(saleId, signer)
  })

  return {
    claim,
    transaction,
    error,
    claimTokens,
  }
}
