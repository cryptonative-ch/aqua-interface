// External
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { FormGroup } from 'src/components/FormGroup'
import { Button } from 'src/components/Button'

// Mesa Utils
import { isAuctionClosed, isAuctionUpcoming } from 'src/mesa/auction'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

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
  const [formValid, setFormValid] = useState<boolean>(false)
  const [tokenAmount, setTokenAmount] = useState<number>(0)
  const [tokenPrice, setTokenPrice] = useState<number>(0)
  const [t] = useTranslation()

  const validateForm = (values: number[]) => setFormValid(values.every(value => value > 0))

  /**
   * Checks the bids place and warns the user if their bid is below
   * @todo repalce `window.confirm` with a modal
   */
  const checkBidPrice = (currentSettlementPrice: number | undefined) => {
    // Request user's confirmation if there is a bid already
    if (currentSettlementPrice && tokenPrice <= currentSettlementPrice * 0.7) {
      return window.confirm(`${t('texts.bidMaybeTooLow')}. ${t('texts.doYouWishToContinue')}`)
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
  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (checkBidPrice(currentSettlementPrice) === true) {
      onSubmit({
        tokenAmount,
        tokenPrice,
      })
    }
  }

  return (
    <form id="createBidForm" onSubmit={onFormSubmit}>
      <FormGroup>
        <label>Amount</label>
        <input id="tokenAmount" type="number" value={tokenAmount} onChange={onTokenAmountChange} />
      </FormGroup>
      <FormGroup>
        <label>Price Per Token</label>
        <input id="tokenPrice" type="number" value={tokenPrice} onChange={onTokenPriceChange} />
      </FormGroup>
      <FormGroup>
        <Button
          disabled={!formValid || isAuctionClosed(auction) || isAuctionUpcoming(auction)}
          type="submit"
          title={t('buttons.placeBid')}
        >
          {t('buttons.placeBid')}
        </Button>
      </FormGroup>
    </form>
  )
}
