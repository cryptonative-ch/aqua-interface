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
  color: #7B7F93;
  margin-top: 8px;
`

const FormInput = styled.input({
  height: '48px',
  width: '100%',
  background: '#F2F2F2',
  border: 'none',
  padding: '0 16px'
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
    const tokenPrice = parseInt(event.target.value)
    setTokenPrice(tokenPrice)
    validateForm([tokenPrice, tokenAmount])
  }

  const onTokenAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tokenAmount = parseInt(event.target.value)
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

  return (
    <form id="createBidForm" onSubmit={onFormSubmit}>
      <FormGroup>
        <FormLabel>Token Price</FormLabel>
        <Flex flexDirection="column" flex={1}>
          <FormInput id="tokenAmount" type="number" value={tokenAmount} onChange={onTokenAmountChange} />
          <FormDescription>Enter the price you would pay per XYZ token.</FormDescription>
        </Flex>
      </FormGroup>
      <FormGroup>
        <FormLabel>Amount</FormLabel>
        <Flex flexDirection="column" flex={1}>
          <FormInput id="tokenPrice" type="number" value={tokenPrice} onChange={onTokenPriceChange} />
          <FormDescription>Enter the amount of DAI you would like to trade. You have 123,456 DAI.</FormDescription>
        </Flex>
      </FormGroup>
      <Button
        disabled={!formValid || isAuctionClosed(auction) || isAuctionUpcoming(auction)}
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
        background="#DDDDE3"
        color="#7B7F93"
      >
        {t('buttons.placeBid')}
      </Button>
    </form>
  )
}
