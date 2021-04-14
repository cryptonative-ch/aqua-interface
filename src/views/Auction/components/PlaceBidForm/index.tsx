// External
import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'

// Components
import { FormGroup } from 'src/components/FormGroup'
import { Button } from 'src/components/Button'

// Mesa Utils
import { isAuctionClosed, isAuctionUpcoming } from 'src/mesa/auction'

// Interfaces
import { Auction } from 'src/interfaces/Auction'
import { BidModalContext } from 'src/contexts'
import { Flex } from 'src/components/Flex'

const FormBody = styled.form({
  flex: 1,
})

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

interface BidData {
  tokenAmount: number
  tokenPrice: number
}

interface PlaceBidComponentProps {
  auction: Auction
  onSubmit: (bidData: BidData) => void
  currentSettlementPrice?: number
  isFixed?: boolean
}

export const PlaceBidForm = ({ auction, onSubmit, currentSettlementPrice, isFixed }: PlaceBidComponentProps) => {
  const { isShown, result, toggleModal, setResult } = useContext(BidModalContext)
  const [formValid, setFormValid] = useState<boolean>(false)
  const [tokenAmount, setTokenAmount] = useState<number>(0)
  const [tokenPrice, setTokenPrice] = useState<number>(0)
  const theme = useTheme()
  const [t] = useTranslation()

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

  const isDisabled = !formValid || isAuctionClosed(auction) || isAuctionUpcoming(auction)

  return (
    <FormBody id="createBidForm" onSubmit={onFormSubmit}>
      {!isFixed && (
        <FormGroup theme={theme}>
          <FormLabel>Token Price</FormLabel>
          <Flex flexDirection="column" flex={1}>
            <FormContainer>
              <FormText data-testid="price-value">{`${tokenPrice.toString()} ${auction.tokenIn?.symbol}`}</FormText>
              <FormInput
                aria-label="tokenPrice"
                id="tokenPrice"
                type="number"
                value={Number(tokenPrice).toString()}
                onChange={onTokenPriceChange}
              />
              <MaxButton>Max</MaxButton>
            </FormContainer>
            <FormDescription>
              {isFixed
                ? `You have 123,456 ${auction.tokenIn?.symbol}.`
                : `Enter the amount of ${auction.tokenIn?.symbol} you would like to trade. You have 123,456 ${auction.tokenIn?.symbol}.`}
            </FormDescription>
          </Flex>
        </FormGroup>
      )}
      <FormGroup theme={theme}>
        <FormLabel>Amount</FormLabel>
        <Flex flexDirection="column" flex={1}>
          <FormContainer>
            <FormText data-testid="amount-value">{`${tokenAmount.toString()} ${auction.tokenIn?.symbol}/${
              auction.tokenOut?.symbol
            } `}</FormText>
            <FormInput
              aria-label="tokenAmount"
              id="tokenAmount"
              type="number"
              value={Number(tokenAmount).toString()}
              onChange={onTokenAmountChange}
            />
          </FormContainer>
          <FormDescription>Enter the price you pay per {`${auction.tokenOut?.symbol}`} token.</FormDescription>
        </Flex>
      </FormGroup>
      {isFixed && <FixedTerm>{`You'll get 1,000 ${auction.tokenOut?.symbol}`}</FixedTerm>}
      <Button
        disabled={isDisabled}
        data-testid="submit-button"
        type="submit"
        title={t('buttons.placeBid')}
        formButton
        width="100%"
        height="48px"
        fontWeight="500"
        padding={false}
        fontSize="14px"
        lineHeight="21px"
        border={true}
        background={isDisabled ? '#DDDDE3' : '#304FFE'}
        color={isDisabled ? '#7B7F93' : '#fff'}
      >
        {isFixed ? t('texts.placeBuyOrder') : t('buttons.placeBid')}
      </Button>
    </FormBody>
  )
}

PlaceBidForm.defaultProps = {
  isFixed: false,
}
