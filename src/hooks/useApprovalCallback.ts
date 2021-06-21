// Externals
import { BigNumberish } from '@ethersproject/bignumber'
import { MaxUint256 } from '@ethersproject/constants'
import { useWeb3React } from '@web3-react/core'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { useCallback, useMemo, useState } from 'react'

// Hooks
import { useTokenAllowance } from './useTokenAllowance'
import { useTokenContract } from './useTokenContract'

export enum ApprovalState {
  UNKNOWN = 'UNKNOWN',
  NOT_APPROVED = 'NOT_APPROVED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

interface UseApproveCallbackProps {
  amountToApprove?: BigNumberish
  tokenAddress: string
  spender: string
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback({
  amountToApprove = MaxUint256,
  tokenAddress,
  spender,
}: UseApproveCallbackProps): [ApprovalState, () => Promise<void>] {
  const { account, library } = useWeb3React()
  const [t] = useTranslation()
  const [txPending, setTxPending] = useState(false)
  const currentAllowance = useTokenAllowance(tokenAddress, account || '', spender)
  const tokenContract = useTokenContract(tokenAddress)

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
    /**
     * Comment for now
     * @todo uncomment in future sprint
     */
    // if (amountToApprove.currency.isNative) return ApprovalState.APPROVED
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    // approved if currentAllowance > 0
    if (currentAllowance.gt(0)) {
      // If was previously pending then show success message and stop loading
      if (txPending) {
        setTxPending(false)
        toast.success(t('success.approve'))
      }
      return ApprovalState.APPROVED
    }

    // Use signed tx and waiting
    if (txPending) {
      return ApprovalState.PENDING
    }

    //
    if (currentAllowance.lt(amountToApprove)) {
      return ApprovalState.NOT_APPROVED
    }

    return ApprovalState.NOT_APPROVED
  }, [amountToApprove, currentAllowance, spender])

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!tokenAddress) {
      console.error('no token')
      return
    }

    if (!library || !library.getSigner()) {
      console.error('no signer')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!amountToApprove) {
      console.error('missing amount to approve')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    // Update internal state
    setTxPending(true)

    return tokenContract
      .approve(spender, amountToApprove)
      .then(() => {
        console.log('Approved')
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        toast.error(t('errors.approve'))
        throw error
      })
  }, [approvalState, tokenAddress, amountToApprove, spender, tokenContract])

  return [approvalState, approve]
}
