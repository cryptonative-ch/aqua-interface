// Externals
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ContractReceipt, ContractTransaction } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// contracts
import { FixedPriceSale__factory } from 'src/contracts'

//redux
import { setClaimStatus } from 'src/redux/claims'

//interface
import { GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale } from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

export enum ClaimState {
  UNCLAIMED = 'UNCLAIMED',
  VERIFY = 'VERIFY',
  FAILED = 'FAILED',
  CLAIMED = 'CLAIMED',
}

interface useTokenClaimReturns {
  claim: ClaimState | null
  claimTokens: (saleId: string) => void
  transaction: ContractReceipt | null
  error: Error | null
}

export function useTokenClaim(
  sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale
): useTokenClaimReturns {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const { claimToken: claim, error, transaction, amount } = useSelector(
    ({ claims }) =>
      claims.claims.find(claim => claim.sale.id === sale.id) || {
        claimToken: ClaimState.UNCLAIMED,
        sale: sale,
        error: null,
        transaction: null,
        amount: null,
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
          dispatch(
            setClaimStatus({
              sale: sale,
              claimToken: ClaimState.VERIFY,
              error: null,
              transaction: null,
              amount: amount,
            })
          )
          return tx.wait(1)
        })
        .then((tx: ContractReceipt) => {
          toast.success(t('success.claim'))
          console.log(tx)
          return dispatch(
            setClaimStatus({
              sale: sale,
              claimToken: ClaimState.CLAIMED,
              error: null,
              transaction: tx,
              amount: amount,
            })
          )
        })
        .catch((error: Error) => {
          console.error(error)
          toast.error(t('errors.claim'))
          return dispatch(
            setClaimStatus({
              sale: sale,
              claimToken: ClaimState.FAILED,
              error: error,
              transaction: null,
              amount: amount,
            })
          )
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
