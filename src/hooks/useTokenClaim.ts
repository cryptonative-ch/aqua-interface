// Externals
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ContractTransaction } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// contracts
import { FixedPriceSale__factory } from 'src/contracts'

//redux
import { setClaimStatus } from 'src/redux/claims'

export enum ClaimState {
  UNCLAIMED = 'UNCLAIMED',
  VERIFY = 'VERIFY',
  FAILED = 'FAILED',
  CLAIMED = 'CLAIMED',
}

interface useTokenClaimReturns {
  claim: ClaimState | null
  claimTokens: (saleId: string) => void
  transaction: ContractTransaction | null
  error: Error | null
}

export function useTokenClaim(saleId: string): useTokenClaimReturns {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const { ClaimToken: claim, error, transaction } = useSelector(
    ({ claims }) =>
      claims.claims.find(claim => claim.saleId === saleId) || {
        ClaimToken: ClaimState.UNCLAIMED,
        saleId: saleId,
        error: null,
        transaction: null,
      }
  )
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
        .catch((error: Error) => {
          console.error(error)
        })
      // Withdraw tokens - withdraws investment or purchase depending on if successful
      FixedPriceSale__factory.connect(saleId, signer)
        .withdrawTokens(account)
        .then((tx: ContractTransaction) => {
          dispatch(setClaimStatus({ saleId: saleId, ClaimToken: ClaimState.VERIFY, error: null, transaction: null }))
          return tx.wait(1)
        })
        .then(() => {
          toast.success(t('success.claim'))
          dispatch(setClaimStatus({ saleId: saleId, ClaimToken: ClaimState.CLAIMED, error: null, transaction: null }))
        })
        .catch((error: Error) => {
          console.error(error)
          toast.error(t('errors.claim'))
          dispatch(setClaimStatus({ saleId: saleId, ClaimToken: ClaimState.FAILED, error: error, transaction: null }))
        })
    }
  }
  return {
    claim,
    claimTokens,
    error,
    transaction,
  }
}
