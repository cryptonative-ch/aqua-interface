// External
import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { utils } from 'ethers'
import { useTranslation } from 'react-i18next'

// Components
import { FormGroup } from 'src/components/FormGroup'
import { Form } from 'src/components/Form'
import { Flex } from 'src/components/Flex'

// Components
import { ErrorMessage } from 'src/components/ErrorMessage'

// Hooks
import { ApprovalState, useApproveCallback } from 'src/hooks/useApprovalCallback'
import { useFixedPriceSaleQuery } from 'src/hooks/useSaleQuery'
import { useTokenBalance } from 'src/hooks/useTokenBalance'

// Layouts
import { Center } from 'src/layouts/Center'
import { FixedPriceSale__factory } from 'src/contracts'
import { getProviderOrSigner } from 'src/utils'
import { LinkedButtons } from 'src/components/LinkedButtons'
import { formatBigInt, formatDecimal, fromBigDecimalToBigInt } from 'src/utils/Defaults'

const FormLabel = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '48px',
  marginRight: '0px',
  width: '80px',
  color: '#000629',
})

const FormContainer = styled.div({
  height: '48px',
  width: '100%',
  background: '#F2F2F2',
  border: 'none',
  display: 'flex',
})

const FormText = styled.div({
  position: 'absolute',
  flex: 1,
  background: 'transparent',
  border: 'none',
  color: '#7B7F93',
  fontSize: '14px',
  lineHeight: '48px',
  margin: '0 16px',
  userSelect: 'none',
  right: 0,
  zIndex: 999,
})

const FormInput = styled.input({
  flex: 1,
  height: 'unset',
  background: '#F2F2F2',
  border: 'none',
  color: '#7B7F93',
  padding: '0 16px',
  fontSize: '14px',
  lineHeight: '21px',
  zIndex: 100,
  ':focus': {
    background: '#F2F2F2',
    color: '#7B7F93',
  },
})
const FormFull = styled(Form)`
  width: 100%;
`

interface PurchaseTokensFormComponentProps {
  saleId: string
}

const w: any = window

w.utils = utils

export const PurchaseTokensForm = ({ saleId }: PurchaseTokensFormComponentProps) => {
  const [t] = useTranslation()
  const [txPending, setTxPending] = useState(false)
  const { account, library } = useWeb3React()
  const { loading, sale, error } = useFixedPriceSaleQuery(saleId)
  const tokenBalance = useTokenBalance({
    tokenAddress: sale?.tokenIn.id,
    owner: account ?? undefined,
  })

  const [approvalState, approve] = useApproveCallback({
    spender: sale?.id as string,
    tokenAddress: sale?.tokenIn.id as string,
  })

  const [validationError, setValidationError] = useState<Error>()
  // Store tokens as 18 decimal BigNumber
  const [tokenAmount, setTokenAmount] = useState<number | undefined>()

  // A form is valid when
  // 1. tokenAmount >= minimum Allocation
  // 2. tokenAmount <= max allocation (including previous purchases)
  // 3. bidding token balance <= purchaseValue
  const onTokenAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return setTokenAmount(undefined)
    }
    // Assume that there are no validation errors
    let newValidationError = undefined
    // Convert minimum allocation
    const purchaseMinimumAllocation = BigNumber.from(sale?.allocationMin)
    const purchaseMaximumAllocation = BigNumber.from(sale?.allocationMax)
    // Convert sale.tokenPrice to BigNumber for accurate math operations
    // It also avoids dealing with native JavaScript operations
    const tokenPrice = BigNumber.from(sale?.tokenPrice)

    const newTokenAmount = parseFloat(event.target.value)
    const bigTokenAmount = fromBigDecimalToBigInt(event.target.value)
    // Calcualte purchase value = tokenPrice (BigNumber) * tokenAmount
    // Currently a slightly complex solution to multiply BigNumbers by fractional token amounts
    // If you have a better solution please improve
    let purchaseValue
    if (newTokenAmount % 1 != 0) {
      const int = Math.trunc(newTokenAmount)
      const remainder = newTokenAmount - int
      purchaseValue = tokenPrice.div(Math.round(1 / remainder)).add(int ? tokenPrice.mul(int) : 0)
    } else {
      purchaseValue = tokenPrice.mul(newTokenAmount)
    }

    // tokeAmount is less than minimum allocation
    if (purchaseMinimumAllocation.gt(bigTokenAmount)) {
      newValidationError = new Error(`Token amount is less than ${utils.formatUnits(sale?.allocationMin)}`)
    }
    if (purchaseMaximumAllocation.lt(bigTokenAmount)) {
      newValidationError = new Error(`Token amount is more than ${utils.formatUnits(sale?.allocationMax)}`)
    }
    // User's tokenIn (i.e. USDC, DAI) balance is zero
    else if (tokenBalance.isZero()) {
      newValidationError = new Error('Insufficient funds')
    }
    // Purchase value is greater than user's tokeIn balance
    else if (purchaseValue.gt(tokenBalance)) {
      newValidationError = new Error('Insufficient funds to process purchase')
    }

    // Update Component state and re-render
    setTokenAmount(parseFloat(event.target.value)) // Convert back to number
    setValidationError(newValidationError)
  }

  /**
   * Handles the form submission
   * @param event
   */

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      console.log('Buying tokens')

      if (!sale) {
        return console.error('no sale')
      }

      if (!account || !library) {
        return console.error('no connected signer')
      }

      if (!tokenAmount) {
        return console.error('token amount == null')
      }

      const fixedPriceSaleContract = FixedPriceSale__factory.connect(sale.id, getProviderOrSigner(library, account))

      // Update state
      setTxPending(true)
      // Convert tokenAmount (number) to 18-decimal BigNumber
      // Sign and send transaction
      fixedPriceSaleContract
        .buyTokens(utils.parseEther(tokenAmount.toString()))
        .then(tx => tx.wait(1)) // wait one network confirmation
        .then(receipt => {
          console.log(receipt)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => setTxPending(false))
    },
    [sale, library, account]
  )

  if (!account) {
    return <Center>{t('texts.connectWallet')}</Center>
  }

  if (loading) {
    return <Center>Loading</Center>
  }

  if (error) {
    return (
      <Center>
        <ErrorMessage error={error as Error} />
      </Center>
    )
  }

  if (!sale) {
    return (
      <Center>
        <ErrorMessage error="Could not fetch sale" />
      </Center>
    )
  }

  return (
    <FormFull id="placePurchaseForm" onSubmit={onSubmit}>
      <FormGroup>
        <FormLabel>Amount</FormLabel>
        <Flex flexDirection="column" flex={1}>
          <FormContainer>
            <FormText data-testid="amount-value">{sale.tokenOut.symbol}</FormText>
            <FormInput
              aria-label="tokenAmount"
              id="tokenAmount"
              type="number"
              step="0.01"
              placeholder="0.0"
              value={tokenAmount}
              onChange={onTokenAmountChange}
            />
          </FormContainer>
        </Flex>
      </FormGroup>

      {validationError && (
        <FormGroup>
          <ErrorMessage error={validationError} />
        </FormGroup>
      )}
      <LinkedButtons
        buttons={[
          {
            title: `Approve ${sale.tokenIn.symbol}`,
            id: 'approve',
            onClick: approve,
          },
          {
            title: `Purchase ${sale.tokenOut.symbol}`,
            id: 'purchase',
            onClick: () => {
              console.log('purchase')
            },
          },
        ]}
        active={approvalState == ApprovalState.APPROVED ? 'purchase' : 'approve'}
        loading={txPending || approvalState == ApprovalState.PENDING}
      />
    </FormFull>
  )
}
