// External
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { FormGroup } from 'src/components/FormGroup'
import { Button } from 'src/components/Button'

//utils
import { isAuctionClosed, isAuctionOpen, isAuctionUpcoming } from 'src/mesa/auction'

interface BidData {
  tokenAmount: number
  tokenPrice: number
}

interface PlaceBidComponentProps {
  onSubmit: (bidData: BidData) => void
  reset?: () => void
}

export function PlaceBidForm({ onSubmit, reset }: PlaceBidComponentProps) {
  const [formValid, setFormValid] = useState<boolean>(false)
  const [tokenAmount, setTokenAmount] = useState<number>(0)
  const [tokenPrice, setTokenPrice] = useState<number>(0)
  const [t] = useTranslation()

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

  const validateForm = (values: number[]) => setFormValid(values.every(value => value > 0))

  // Submission handler
  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({
      tokenAmount,
      tokenPrice,
    })
    reset && reset()
  }

  return (
    <form id="createBidForm" onSubmit={onFormSubmit}>
      <FormGroup>
        <label>Amount</label>
        <input id="tokenAmount" type="number" value={tokenAmount} onChange={onTokenAmountChange} />
      </FormGroup>
      <FormGroup>
        <label>Price</label>
        <input id="tokenPrice" type="number" value={tokenPrice} onChange={onTokenPriceChange} />
      </FormGroup>
      <FormGroup>
        <Button disabled={!formValid} type="submit" title={t('buttons.placeBid')}>
          {t('buttons.placeBid')}
        </Button>
      </FormGroup>
    </form>
  )
}
