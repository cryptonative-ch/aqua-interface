// External
import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { FormGroup } from 'src/components/FormGroup'
import { Button } from 'src/components/Button'

// Hooks
import { useGenericModal } from 'src/hooks/useGenericModal'

// Mesa Utils
import { isAuctionClosed, isAuctionUpcoming } from 'src/mesa/auction'

// Interfaces
import { Auction } from 'src/interfaces/Auction'
import { BidModalContext } from 'src/contexts'

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
  const {isShown, result, toggleModal, setResult} = useContext(BidModalContext)
  const [formValid, setFormValid] = useState<boolean>(false)
  const [tokenAmount, setTokenAmount] = useState<number>(0)
  const [tokenPrice, setTokenPrice] = useState<number>(0)
  const [t] = useTranslation()


  const validateForm = (values: number[]) => setFormValid(values.every(value => value > 0))

  /**
   * Checks the bids place and warns the user if their bid is below
   * @steps user submits bid,
   * bid is checked if under VSP,
   * toggles state in parent component,
   * modal window pops up,
   * send a state back down to child to
   */

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
  }, [isShown])

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
