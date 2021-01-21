// External
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'src/components/Button'
import { FormGroup } from 'src/components/FormGroup'

interface BidData {
  tokenAmount: number
  tokenPrice: number
}

interface PlaceBidComponentProps {
  onSubmit: (bidData: BidData) => void
  reset?: () => void
}

export function PlaceBidForm({ onSubmit, reset }: PlaceBidComponentProps) {
  const [tokenAmount, setTokenAmount] = useState<number>(0)
  const [tokenPrice, setTokenPrice] = useState<number>(0)
  const [t] = useTranslation()

  // Change handlers
  const onTokenPriceChange = (event: ChangeEvent<HTMLInputElement>) => setTokenPrice(parseInt(event.target.value))
  const onTokenAmountChange = (event: ChangeEvent<HTMLInputElement>) => setTokenPrice(parseInt(event.target.value))

  // Submission handler
  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({
      tokenAmount,
      tokenPrice,
    })
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
        <Button title={t('buttons.placeBid')}>{t('buttons.placeBid')}</Button>
      </FormGroup>
    </form>
  )
}
