// Externals
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BigNumber, ContractReceipt, ContractTransaction } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { TransactionResult } from 'dxdao-contract-proxy-kit'

//hooks
import { useCPK } from 'src/hooks/useCPK'

// contracts
import { FixedPriceSale__factory } from 'src/contracts'

//redux
import { setClaimStatus } from 'src/redux/claims'

//interface
import { GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale } from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'
import { ProviderRpcError } from 'src/interfaces/Error'
import { ERC20__factory } from 'src/contracts'

export enum ClaimState {
  UNCLAIMED = 'UNCLAIMED',
  VERIFY = 'VERIFY',
  FAILED = 'FAILED',
  CLAIMED = 'CLAIMED',
  PROCESSED = 'PROCESSED',
}

interface useTokenClaimReturns {
  claim: ClaimState | null
  claimTokens: (saleId: string) => void
  closeSale: (saleId: string, handleClose: (closed: boolean) => void) => void
  transaction: ContractReceipt | null
  error: Error | null
}

export function useTokenClaim(
  sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale
): useTokenClaimReturns {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const { cpk } = useCPK(library, chainId)
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
  const erc20Token = ERC20__factory.connect(sale.tokenOut.id, signer).interface

  useEffect(() => {
    if (!chainId || !library || !account) {
      return
    }
  }, [account, chainId, library])

  const closeSale = (saleId: string, handleClose: (closed: boolean) => void) => {
    if (account) {
      FixedPriceSale__factory.connect(saleId, signer)
        .closeSale()
        .then(tx => tx.wait(1))
        .then(() => {
          toast.success(t('success.saleClosed'))
          handleClose(true)
        })
        .catch((error: Error) => {
          console.error(error)
          toast.error(t('errors.saleClose'))
        })
    }
  }

  const claimTokens = async (saleId: string) => {
    if (cpk?.isProxyDeployed) {
      const balance = await ERC20__factory.connect(sale.tokenOut.id, signer).balanceOf(cpk.address as string)

      const tx = [
        {
          to: saleId,
          data: FixedPriceSale__factory.connect(saleId, signer).interface.encodeFunctionData('withdrawTokens', [
            cpk.address as string,
          ]),
        },
        {
          to: sale.tokenOut.id,
          data: erc20Token.encodeFunctionData('approve', [account as string, balance]),
        },
        {
          to: sale.tokenOut.id,
          data: erc20Token.encodeFunctionData('transfer', [account as string, balance]),
        },
      ]
      cpk
        .execTransactions(tx)
        .then(async (tx: TransactionResult) => {
          dispatch(
            setClaimStatus({
              sale: sale,
              claimToken: ClaimState.VERIFY,
              error: null,
              transaction: null,
              amount: amount,
            })
          )
          await tx.transactionResponse?.wait(1)
          console.log(tx)
          toast.success(t('success.claim'))
          return dispatch(
            setClaimStatus({
              sale: sale,
              claimToken: ClaimState.CLAIMED,
              error: null,
              transaction: tx.transactionResponse as any,
              amount: amount,
            })
          )
        })
        .catch((error: ProviderRpcError) => {
          if (error.code == 4001) {
            toast.error(t('errors.claim'))
            return dispatch(
              setClaimStatus({
                sale: sale,
                claimToken: ClaimState.UNCLAIMED,
                error: error,
                transaction: null,
                amount: amount,
              })
            )
          }
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
    if (account) {
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
        .catch((error: ProviderRpcError) => {
          if (error.code == 4001) {
            return dispatch(
              setClaimStatus({
                sale: sale,
                claimToken: ClaimState.UNCLAIMED,
                error: error,
                transaction: null,
                amount: amount,
              })
            )
          }

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
    closeSale,
    error,
    transaction,
  }
}
