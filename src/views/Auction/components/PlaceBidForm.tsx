// External
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { FormGroup } from 'src/components/FormGroup'
import { Button } from 'src/components/Button'

//utils
import { isAuctionClosed, isAuctionUpcoming } from 'src/mesa/auction'

//interfaces
import { Auction } from 'src/interfaces/Auction'

interface BidData {
  tokenAmount: number
  tokenPrice: number
}

interface PlaceBidComponentProps {
  auction: Auction
  onSubmit: (bidData: BidData) => void
  reset?: () => void
  CurrentSettlementPrice?: number
}

export function PlaceBidForm({ auction, onSubmit, reset, CurrentSettlementPrice }: PlaceBidComponentProps) {
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
    if (BidWarning(CurrentSettlementPrice) === true) {
      onSubmit({
        tokenAmount,
        tokenPrice,
      })
      reset && reset()
    }
    reset && reset()
  }

  //  TODO: bidwarning price 
  const BidWarning = (CurrentSettlementPrice: number | undefined) => {
    if (CurrentSettlementPrice) {
      if (tokenPrice <= CurrentSettlementPrice * 0.7) {
        if (window.confirm(t('Warning: Bid may be too low to be included'))) {
          return true
        } else {
          return false
        }
      }
      return true
    }
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
