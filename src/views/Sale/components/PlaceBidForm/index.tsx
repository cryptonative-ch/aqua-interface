// External
import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react'
import styled from 'styled-components'
import { BigNumber, utils } from 'ethers'
import { toast } from 'react-toastify'

// Components
import { FormGroup } from 'src/components/FormGroup'
import { Form } from 'src/components/Form'
import { Center } from 'src/layouts/Center'
import { ErrorMessage } from 'src/components/ErrorMessage'
import { NotFoundView } from 'src/views/NotFound'

// Interfaces
import { Flex } from 'src/components/Flex'
import { useWeb3React } from '@web3-react/core'
import { FairSale__factory } from 'src/contracts'

// Hooks
import { ApprovalState, useApproveCallback } from 'src/hooks/useApprovalCallback'
import { useFairSaleQuery } from 'src/hooks/useSaleQuery'
import { useTokenBalance } from 'src/hooks/useTokenBalance'
import { fixRounding, getProviderOrSigner } from 'src/utils'
import { LinkedButtons } from 'src/components/LinkedButtons'

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

const TokenOutQuantityText = styled.div({
  border: '1px dashed #DDDDE3',
  borderWidth: '1px 0 0 0',
  padding: '16px 0 8px 0',
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: '21px',
  color: '#7B7F93',
  fontWeight: 400,
  margin: '8px 0',
})

const Message = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignSelf: 'center',
  margin: '10px auto',
})

const SuccessMessage = styled(Message)({
  color: '#4B9E98',
})

const PurchaseErrorMessage = styled(Message)({
  color: '#E15F5F',
})

interface PlaceBidComponentProps {
  saleId: string
  currentSettlementPrice?: number
}

export const PlaceBidForm = ({ saleId, currentSettlementPrice }: PlaceBidComponentProps) => {
  const { account, library } = useWeb3React()
  const { loading, sale, error } = useFairSaleQuery(saleId)
  const [txPending, setTxPending] = useState(false)
  const [validationError, setValidationError] = useState<Error>()
  const [tokenInAmount, setTokenInAmount] = useState<number | undefined>()
  const [tokenOutPrice, setTokenOutPrice] = useState<number | undefined>()
  const tokenBalance = useTokenBalance({
    tokenAddress: sale?.tokenIn.id,
    owner: account ?? undefined,
  })
  const [approvalState, approve] = useApproveCallback({
    spender: sale?.id as string,
    tokenAddress: sale?.tokenIn.id as string,
  })

  const parsedTokenBalance = parseFloat(utils.formatUnits(tokenBalance))

  const validateForm = (tokenOutPrice: number | undefined, tokenInAmount: number | undefined) => {
    if (!tokenOutPrice || !tokenInAmount) return

    // TODO: Update validations
    let newValidationError = undefined
    const purchaseMinimumBid = parseFloat(utils.formatUnits(BigNumber.from(sale?.minBidAmount)))
    const currentBid = tokenInAmount / tokenOutPrice

    if (purchaseMinimumBid > currentBid) {
      newValidationError = new Error(
        `Minimum is ${fixRounding(purchaseMinimumBid, 8)} ${
          sale?.tokenOut.symbol
        }. Current bid would only be ${fixRounding(currentBid, 8)} ${sale?.tokenOut.symbol}.`
      )
    }

    setValidationError(newValidationError)
  }

  // Change handlers
  const onTokenPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return setTokenOutPrice(undefined)
    }

    const tokenPrice = parseInt(event.target.value)
    setTokenOutPrice(tokenPrice)
    validateForm(tokenPrice, tokenInAmount)
  }

  const onTokenAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return setTokenInAmount(undefined)
    }

    const tokenAmount = parseInt(event.target.value)
    setTokenInAmount(tokenAmount)
    validateForm(tokenOutPrice, tokenAmount)
  }

  const placeBid = useCallback(() => {
    if (!sale) {
      return console.error('no sale')
    }

    if (!account || !library) {
      return console.error('no connected signer')
    }

    if (!tokenInAmount || !tokenOutPrice) {
      return console.error('purchase amount or price == null')
    }

    const fairSaleContract = FairSale__factory.connect(sale.id, getProviderOrSigner(library, account))

    setTxPending(true)

    // TODO: Use the correct startPosition
    const startPosition = '0x0000000000000000000000000000000000000000000000000000000000000001'

    // TODO: Verify if these are the correct parameters.
    fairSaleContract
      .placeSellOrders(
        [utils.parseEther(tokenOutPrice.toString())],
        [utils.parseEther(tokenInAmount.toString())],
        [startPosition]
      )
      .then(tx => tx.wait(1)) // wait one network confirmation
      .then(() => {
        toast.success('Placed bid!')
      })
      .catch(error => {
        console.error(error)
        toast.error('Failed to place bid!')
      })
      .then(() => {
        setTxPending(false)
      })
  }, [account, library, sale, tokenOutPrice, tokenInAmount])

  // Submission handler
  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!sale || !tokenInAmount || !tokenOutPrice || approvalState !== ApprovalState.APPROVED) return
      if (currentSettlementPrice && tokenOutPrice <= currentSettlementPrice * 0.7) return

      placeBid()
    },
    [sale, tokenInAmount, tokenOutPrice, approvalState, currentSettlementPrice]
  )

  const getMaxPurchase = () => {
    const parsedTokenBalance = parseFloat(utils.formatUnits(tokenBalance))

    // TODO: Consider remaining tokens

    const maxPurchase = parsedTokenBalance
    return maxPurchase
  }

  const onMaxButtonClick = () => {
    const maxPurchase = getMaxPurchase()
    setTokenInAmount(fixRounding(maxPurchase, 8))
  }

  if (loading) {
    return <Center minHeight="100vh">loading</Center>
  }

  if (error) {
    return (
      <Center>
        <ErrorMessage error={error} />
      </Center>
    )
  }

  if (!sale) {
    return <NotFoundView />
  }

  return (
    <FormFull id="createBidForm" noValidate onSubmit={onSubmit}>
      <FormGroup>
        <FormLabel>Token Price</FormLabel>
        <Flex flexDirection="column" flex={1}>
          <FormContainer>
            <FormText data-testid="price-value">{sale.tokenIn?.symbol}</FormText>
            <FormInput
              aria-label="tokenPrice"
              id="tokenPrice"
              type="number"
              placeholder="0.0"
              value={tokenOutPrice}
              onChange={onTokenPriceChange}
            />
          </FormContainer>
          <FormDescription>Enter the price you would pay per {sale.tokenOut?.symbol} token.</FormDescription>
        </Flex>
      </FormGroup>
      <FormGroup>
        <FormLabel>Amount</FormLabel>
        <Flex flexDirection="column" flex={1}>
          <FormContainer>
            <FormText data-testid="amount-value">
              <MaxButton onClick={onMaxButtonClick}>Max</MaxButton>
              {sale.tokenIn?.symbol}
            </FormText>
            <FormInput
              aria-label="tokenAmount"
              id="tokenAmount"
              type="number"
              placeholder="0.0"
              value={tokenInAmount}
              onChange={onTokenAmountChange}
            />
          </FormContainer>
          <FormDescription>
            Enter the amount of {sale.tokenIn?.symbol} you would like to trade. You have {parsedTokenBalance}{' '}
            {sale.tokenIn?.symbol}.
          </FormDescription>
        </Flex>
      </FormGroup>
      <TokenOutQuantityText>
        {validationError ? (
          <PurchaseErrorMessage>{validationError.message}</PurchaseErrorMessage>
        ) : (
          <SuccessMessage>
            You’ll bid for {tokenInAmount && tokenOutPrice ? tokenInAmount / tokenOutPrice : 0} {sale.tokenOut?.symbol}
          </SuccessMessage>
        )}
      </TokenOutQuantityText>
      <LinkedButtons
        buttons={[
          {
            title: `${approvalState == ApprovalState.APPROVED ? 'Approved' : `Approve ${sale.tokenIn.symbol}`} `,
            id: 'approve',
            onClick: approve,
          },
          {
            title: `Place Bid`,
            id: 'purchase',
            typeSubmit: true,
            onClick: () => {
              {
              }
            },
          },
        ]}
        active={approvalState == ApprovalState.APPROVED ? 'purchase' : 'approve'}
        disabled={!!validationError}
        loading={txPending || approvalState == ApprovalState.PENDING}
      />
    </FormFull>
  )
}
