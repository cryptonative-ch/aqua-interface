// External
import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import styled from 'styled-components'
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

const FormLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 48px;
  color: #000629;
  margin-right: 24px;
  width: 80px;
`

const FormDescription = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 140%;
  color: #7b7f93;
  margin-top: 8px;
`

const FormContainer = styled.div`
  height: 48px;
  width: 100%;
  background: #f2f2f2;
  border: none;
  display: flex;
`

const FormText = styled.div`
  position: absolute;
  flex: 1;
  background: transparent;
  border: none;
  color: #7b7f93;
  font-size: 14px;
  line-height: 48px;
  margin: 0 16px;
  user-select: none;
`

const MaxButton = styled.div`
  border: 1px solid #dddde3;
  padding: 0 4px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #7b7f93;
  position: absolute;
  right: 16px;
  top: 13px;
  cursor: pointer;
  z-index: 200;
`

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
}

export function PlaceBidForm({ auction, onSubmit, currentSettlementPrice }: PlaceBidComponentProps) {
  const { isShown, result, toggleModal, setResult } = useContext(BidModalContext)
  const [formValid, setFormValid] = useState<boolean>(false)
  const [tokenAmount, setTokenAmount] = useState<number>(0)
  const [tokenPrice, setTokenPrice] = useState<number>(0)
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
    validateForm([tokenAmount, tokenPrice])
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
    <form id="createBidForm" onSubmit={onFormSubmit}>
      <FormGroup>
        <FormLabel>Token Price</FormLabel>
        <Flex flexDirection="column" flex={1}>
          <FormContainer>
            <FormText>{`${tokenAmount.toString()} DAI`}</FormText>
            <FormInput
              id="tokenAmount"
              type="number"
              value={Number(tokenAmount).toString()}
              onChange={onTokenAmountChange}
            />
          </FormContainer>
          <FormDescription>Enter the price you would pay per XYZ token.</FormDescription>
        </Flex>
      </FormGroup>
      <FormGroup>
        <FormLabel>Amount</FormLabel>
        <Flex flexDirection="column" flex={1}>
          <FormContainer>
            <FormText>{`${tokenPrice.toString()} DAI`}</FormText>
            <FormInput
              id="tokenPrice"
              type="number"
              value={Number(tokenPrice).toString()}
              onChange={onTokenPriceChange}
            />
            <MaxButton>Max</MaxButton>
          </FormContainer>
          <FormDescription>Enter the amount of DAI you would like to trade. You have 123,456 DAI.</FormDescription>
        </Flex>
      </FormGroup>
      <Button
        disabled={isDisabled}
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
        {t('buttons.placeBid')}
      </Button>
    </form>
  )
}
