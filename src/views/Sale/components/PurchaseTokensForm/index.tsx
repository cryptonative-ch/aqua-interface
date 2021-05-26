// External
import React, { useState, ChangeEvent, FormEvent, useEffect, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { sales } from '@dxdao/mesa'

// Components
import { FormGroup } from 'src/components/FormGroup'
import { Button } from 'src/components/Button'
import { Form } from 'src/components/Form'
import { Flex } from 'src/components/Flex'

// Hooks
import { ApprovalState, useApproveCallback } from 'src/hooks/useApprovalCallback'

// Mesa Utils
import { isSaleClosed, isSaleUpcoming } from 'src/mesa/sale'

// Components
import { ErrorMesssage } from 'src/components/ErrorMessage'
import { useSaleQuery } from 'src/hooks/useSaleQuery'

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
  const [approvalState, approve] = useApproveCallback({
    spender: sale?.id as string,
    tokenAddress: sale?.tokenIn.id as string,
  })

  useEffect(() => {
    if (!account || !library || !sale) {
      return
    }

    console.log({ approvalState })

    console.log({ sale })
    // Connect to TokeIn and FixedPriceSale contract
    const fixedPriceSaleContract = sales.FixedPriceSaleFactory.connect(sale.id, library)
  }, [account, library])

  const [validationError, setValidationError] = useState<Error>()
  const [formValid, setFormValid] = useState<boolean>(false)
  const [tokenAmount, setTokenAmount] = useState<number>(0)

  const validateForm = (values: number[]) => setFormValid(values.every(value => value > 0))

  const onTokenAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tokenAmount = parseInt(event.target.value || '0')
    setTokenAmount(tokenAmount)
    validateForm([tokenAmount])
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
      </FormGroup>
      <FixedTerm>{`You'll get 1,000 ${sale.tokenOut.symbol}`}</FixedTerm>
      {approvalState == ApprovalState.APPROVED ? (
        <Button>Purchase {sale.tokenOut.symbol}</Button>
      ) : (
        <Button onClick={approve}>Approve {sale.tokenIn.symbol}</Button>
      )}
    </Form>
  )
}
