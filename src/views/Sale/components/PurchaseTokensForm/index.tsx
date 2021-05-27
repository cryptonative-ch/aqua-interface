// External
import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { utils } from 'ethers'

// Components
import { FormGroup } from 'src/components/FormGroup'
import { Button } from 'src/components/Button'
import { Form } from 'src/components/Form'
import { Flex } from 'src/components/Flex'

// Components
import { ErrorMesssage } from 'src/components/ErrorMessage'
import { useSaleQuery } from 'src/hooks/useSaleQuery'

// Hooks
import { ApprovalState, useApproveCallback } from 'src/hooks/useApprovalCallback'
import { useTokenBalance } from 'src/hooks/useTokenBalance'

// Contract factories
import { ERC20__factory } from 'src/contracts'

// Layouts
import { Center } from 'src/layouts/Center'

const FormLabel = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '48px',
  marginRight: '24px',
  width: '80px',
  color: '#000629',
})

const FormDescription = styled.div({
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '12px',
  lineHeight: '17px',
  marginTop: '8px',
  color: '#7B7F93',
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
})

const FixedTerm = styled.div({
  border: '1px dashed #DDDDE3',
  borderWidth: '1px 0 0 0',
  padding: '16px 0 8px 0',
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: '21px',
  color: '#7B7F93',
  fontWeight: 400,
})

const MaxButton = styled.div({
  border: '1px solid #DDDDE3',
  padding: '0 4px',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
  textAlign: 'center',
  color: '#7B7F93',
  position: 'absolute',
  right: '16px',
  top: '13px',
  cursor: 'pointer',
  zIndex: 200,
})

const FormInput = styled.input({
  flex: 1,
  height: 'unset',
  background: 'transparent',
  border: 'none',
  color: 'transparent',
  padding: '0 16px',
  fontSize: '14px',
  lineHeight: '21px',
  zIndex: 100,
  ':focus': {
    backgroundColor: 'transparent',
    color: 'transparent',
  },
})

interface PurchaseTokensFormComponentProps {
  saleId: string
}

export const PurchaseTokensForm = ({ saleId }: PurchaseTokensFormComponentProps) => {
  const { account, library } = useWeb3React()
  const { loading, sale, error } = useSaleQuery(saleId)
  const tokenBalance = useTokenBalance({
    tokenAddress: sale?.tokenIn.id,
    owner: account ?? undefined,
  })
  const [approvalState, approve] = useApproveCallback({
    spender: sale?.id as string,
    tokenAddress: sale?.tokenIn.id as string,
  })

  const [validationError, setValidationError] = useState<Error>()
  const [formValid, setFormValid] = useState<boolean>(false)
  const [tokenAmount, setTokenAmount] = useState(BigNumber.from(0))

  // A form is valid when
  // 1. purchaseValue >= minimum Allocation
  // 2. purchaseValue <= max allocation (including previous purchases)
  // 3. bidding token balance <= purchaseValue
  const validateForm = () => {
    if (tokenBalance.eq(0)) {
      return setValidationError(new Error('Insufficient funds'))
    }

    // Calculate the purchase value
    const purchaseValue = tokenAmount.mul(sale?.tokenPrice || '0')

    if (purchaseValue.gt(tokenBalance)) {
      return setValidationError(new Error('Insufficient funds'))
    }

    return setValidationError(undefined)
  }

  const onTokenAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTokenAmount(utils.parseUnits(event.target.value || '0'))
    validateForm()
  }

  /**
   * Handles the form submission
   * @param event
   */
  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }, [])

  if (loading) {
    return <Center>Loading</Center>
  }

  if (error) {
    return (
      <Center>
        <ErrorMesssage error={error as Error} />
      </Center>
    )
  }

  if (!sale) {
    return (
      <Center>
        <ErrorMesssage error="Could not fetch sale" />
      </Center>
    )
  }

  return (
    <Form id="placePurchaseForm" onSubmit={onSubmit}>
      <FormGroup>
        <FormLabel>Amount</FormLabel>
        <Flex flexDirection="column" flex={1}>
          <FormContainer>
            <FormText data-testid="amount-value">
              {tokenAmount.toString()} {sale.tokenOut.symbol}
            </FormText>
            <FormInput
              aria-label="tokenAmount"
              id="tokenAmount"
              type="number"
              value={Number(tokenAmount).toString()}
              onChange={onTokenAmountChange}
            />
          </FormContainer>
        </Flex>
        {validationError && <ErrorMesssage error={validationError} />}
      </FormGroup>
      {approvalState == ApprovalState.APPROVED ? (
        <Button disabled={!(validationError instanceof Error)}>Purchase {sale.tokenOut.symbol}</Button>
      ) : (
        <Button onClick={approve}>Approve {sale.tokenIn.symbol}</Button>
      )}
    </Form>
  )
}
