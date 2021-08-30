// External
import React, { useState, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'

// Components
import { FormGroup } from 'src/components/FormGroup'
import { Form } from 'src/components/Form'

// Aqua Utils
import { isSaleClosed, isSaleUpcoming } from 'src/aqua/sale'

// Interfaces
import { Sale } from 'src/interfaces/Sale'
import { Flex } from 'src/components/Flex'
import { ApproveButton } from 'src/views/Sale/components/ApproveButton'

const FormFull = styled(Form)`
  width: 100%;
`

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
  background: '#F2F2F2',
  border: 'none',
  color: '#7B7F93',
  fontSize: '14px',
  lineHeight: '48px',
  padding: '0 16px',
  userSelect: 'none',
  right: 0,
  zIndex: 101,
})

const MaxButton = styled.a({
  border: '1px solid #DDDDE3',
  padding: '0 4px',
  fontStyle: 'normal',
  fontSize: '14px',
  lineHeight: '21px',
  textAlign: 'center',
  color: '#7B7F93',
  marginRight: '16px',
  cursor: 'pointer',

  ':hover': {
    borderColor: '#304FFE',
    color: '#304FFE !important',
  },
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

interface PlaceBidComponentProps {
  sale: Sale
  currentSettlementPrice?: number
}

export const PlaceBidForm = ({ sale, currentSettlementPrice }: PlaceBidComponentProps) => {
  const [formValid, setFormValid] = useState<boolean>(false)
  const [tokenAmount, setTokenAmount] = useState<number | undefined>()
  const [tokenPrice, setTokenPrice] = useState<number | undefined>()
  const [approve] = useState<boolean>(false)

  const validateForm = (values: Array<number | undefined>) => setFormValid(values.every(value => !!value))

  const checkBidPrice = async (currentSettlementPrice: number | undefined) => {
    if (currentSettlementPrice && tokenPrice && tokenPrice <= currentSettlementPrice * 0.7) {
      return false
    }

    // Proceed to continue
    return true
  }

  // Change handlers
  const onTokenPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return setTokenPrice(undefined)
    }

    const tokenPrice = parseInt(event.target.value)
    setTokenPrice(tokenPrice)
    validateForm([tokenPrice, tokenAmount])
  }

  const onTokenAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return setTokenAmount(undefined)
    }

    const tokenAmount = parseInt(event.target.value)
    setTokenAmount(tokenAmount)
      validateForm([tokenAmount, tokenPrice])
    
  }

  const placeBid = (tokenAmount: number, tokenPrice: number) => {
    // TODO: Actually place the bid.
    alert({tokenAmount, tokenPrice})
  }

  // Submission handler
  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!tokenAmount || !tokenPrice) return

    if ((await checkBidPrice(currentSettlementPrice)) === true) {
      placeBid(tokenAmount, tokenPrice)
    }
  }

  const isDisabled = !formValid || isSaleClosed(sale) || isSaleUpcoming(sale)

  return (
    <FormFull id="createBidForm" noValidate onSubmit={onFormSubmit}>
        <FormGroup>
          <FormLabel>Token Price</FormLabel>
          <Flex flexDirection="column" flex={1}>
            <FormContainer>
              <FormText data-testid="price-value">DAI</FormText>
              <FormInput
                aria-label="tokenPrice"
                id="tokenPrice"
                type="number"
                placeholder="0.0"
                value={tokenPrice}
                onChange={onTokenPriceChange}
              />
            </FormContainer>
            <FormDescription>Enter the price you would pay per XYZ token.</FormDescription>
          </Flex>
        </FormGroup>
      <FormGroup>
        <FormLabel>Amount</FormLabel>
        <Flex flexDirection="column" flex={1}>
          <FormContainer>
            <FormText data-testid="amount-value">
              <MaxButton>Max</MaxButton>
              DAI
            </FormText>
            <FormInput
              aria-label="tokenAmount"
              id="tokenAmount"
              type="number"
              placeholder="0.0"
              value={tokenAmount}
              onChange={onTokenAmountChange}
            />
          </FormContainer>
          <FormDescription>
            Enter the amount of DAI you would like to trade. You have 123,456 DAI.
          </FormDescription>
        </Flex>
      </FormGroup>
      <ApproveButton isDisabled={isDisabled} isFixed={false} approve={approve}></ApproveButton>
    </FormFull>
  )
}
