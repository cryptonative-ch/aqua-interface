// External
import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import styled from 'styled-components'

// Components
import { FormGroup } from 'src/components/FormGroup'
import { Form } from 'src/components/Form'

// Aqua Utils
import { isSaleClosed, isSaleUpcoming } from 'src/aqua/sale'

// Contexts
import { BidModalContext } from 'src/contexts'

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
  onSubmit: (BidData: BidData) => void
  currentSettlementPrice?: number
  isFixed?: boolean
}

export const PlaceBidForm = ({ sale, onSubmit, currentSettlementPrice, isFixed }: PlaceBidComponentProps) => {
  const { isShown, result, toggleModal, setResult } = useContext(BidModalContext)
  const [formValid, setFormValid] = useState<boolean>(false)
  const [tokenAmount, setTokenAmount] = useState<number>(0)
  const [tokenPrice, setTokenPrice] = useState<number>(0)
  const [approve] = useState<boolean>(false)

  const validateForm = (values: number[]) => setFormValid(values.every(value => value > 0))

  const checkBidPrice = async (currentSettlementPrice: number | undefined) => {
    if (currentSettlementPrice && tokenPrice <= currentSettlementPrice * 0.7) {
      toggleModal()
      return false
    }

    // Proceed to continue
    return true
  }

  // Change handlers
  const onTokenPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tokenPrice = parseInt(event.target.value || '0')
    setTokenPrice(tokenPrice)
    validateForm([tokenPrice, tokenAmount])
  }

  const onTokenAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tokenAmount = parseInt(event.target.value || '0')
    setTokenAmount(tokenAmount)
    if (isFixed) {
      validateForm([tokenAmount])
    } else {
      validateForm([tokenAmount, tokenPrice])
    }
  }

  // Submission handler
  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if ((await checkBidPrice(currentSettlementPrice)) === true) {
      onSubmit({
        tokenAmount,
        tokenPrice,
      })
    }
  }
  // Listen to the Context value changes to get the modal response
  useEffect(() => {
    if (!isShown && result === true) {
      setResult(false)
      onSubmit({
        tokenAmount,
        tokenPrice,
      })
    }
  }, [isShown, onSubmit, result, setResult, tokenAmount, tokenPrice])

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
    </FormFull>
  )
}

PlaceBidForm.defaultProps = {
  isFixed: false,
}
