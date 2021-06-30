// External
import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { ethers, utils } from 'ethers'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// Components
import { FormGroup } from 'src/components/FormGroup'
import { Form } from 'src/components/Form'
import { Flex } from 'src/components/Flex'
import { Modal } from 'src/components/Modal'

// Components
import { ErrorMessage } from 'src/components/ErrorMessage'

// Utils
import { fixRounding } from 'src/utils/Defaults'

// Hooks
import { ApprovalState, useApproveCallback } from 'src/hooks/useApprovalCallback'
import { useFixedPriceSaleQuery } from 'src/hooks/useSaleQuery'
import { useTokenBalance } from 'src/hooks/useTokenBalance'
import { useModal } from 'src/hooks/useModal'
import { useBids } from 'src/hooks/useBids'

// Layouts
import { Center } from 'src/layouts/Center'
import { FixedPriceSale__factory } from 'src/contracts'
import { getProviderOrSigner } from 'src/utils'
import { LinkedButtons } from 'src/components/LinkedButtons'
import { formatBigInt } from 'src/utils/Defaults'

const FormLabel = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '48px',
  marginRight: '0px',
  width: '80px',
  color: '#000629',
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
  right: 0,
  zIndex: 101,
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

const FormFull = styled(Form)`
  width: 100%;
`

interface PurchaseTokensFormComponentProps {
  saleId: string
}

const w: any = window

w.utils = utils

export const PurchaseTokensForm = ({ saleId }: PurchaseTokensFormComponentProps) => {
  const [t] = useTranslation()
  const [txPending, setTxPending] = useState(false)
  const { account, library } = useWeb3React()
  const { loading, sale, error } = useFixedPriceSaleQuery(saleId)
  const tokenBalance = useTokenBalance({
    tokenAddress: sale?.tokenIn.id,
    owner: account ?? undefined,
  })
  const { isShown: isModalShown, toggle: toggleConfirmation } = useModal()
  const { totalBids, totalPurchased } = useBids(saleId, 'FixedPriceSale')

  const [approvalState, approve] = useApproveCallback({
    spender: sale?.id as string,
    tokenAddress: sale?.tokenIn.id as string,
  })

  const [validationError, setValidationError] = useState<Error>()
  const [purchaseValue, setPurchaseValue] = useState<number | undefined>()
  const [tokenQuantity, setTokenQuantity] = useState<number>(0)

  // A form is valid when
  // 1. purchaseValue >= minimum Allocation
  // 2. purchaseValue <= max allocation (including previous purchases)
  // 3. bidding token balance <= purchaseValue
  const onPurchaseValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return setPurchaseValue(undefined)
    }
    let newValidationError = undefined
    const parsedTokenBalance = parseFloat(utils.formatUnits(tokenBalance))
    // Convert min max allocations
    // Converting BigNumbers to normal numbers due to lack of decimal support
    const purchaseMinimumAllocation = parseFloat(utils.formatUnits(BigNumber.from(sale?.allocationMin)))
    const purchaseMaximumAllocation = parseFloat(utils.formatUnits(BigNumber.from(sale?.allocationMax)))
    const tokenPrice = parseFloat(utils.formatUnits(BigNumber.from(sale?.tokenPrice)))

    const newPurchaseValue = parseFloat(event.target.value)

    const quantity = fixRounding(newPurchaseValue / tokenPrice, 8)

    // purchaseValue is less than minimum allocation
    if (purchaseMinimumAllocation > quantity) {
      newValidationError = new Error(
        `Minimum is ${fixRounding(purchaseMinimumAllocation * tokenPrice, 8)} ${
          sale?.tokenIn.symbol
        } / ${utils.formatUnits(sale?.allocationMin)} ${sale?.tokenOut.symbol}`
      )
    }
    if (purchaseMaximumAllocation < quantity) {
      newValidationError = new Error(
        `Maximum is ${fixRounding(purchaseMaximumAllocation * tokenPrice, 8)} ${
          sale?.tokenIn.symbol
        } / ${utils.formatUnits(sale?.allocationMax)} ${sale?.tokenOut.symbol}`
      )
    }
    // // Purchase value is greater than user's tokeIn balance
    else if (parsedTokenBalance < newPurchaseValue) {
      newValidationError = new Error('Insufficient funds to process purchase')
    }

    // Update Component state and re-render
    setPurchaseValue(newPurchaseValue)
    setTokenQuantity(quantity)
    setValidationError(newValidationError)
  }

  const purchaseTokens = useCallback(() => {
    if (!sale) {
      return console.error('no sale')
    }

    if (!account || !library) {
      return console.error('no connected signer')
    }

    if (!tokenQuantity) {
      return console.error('token amount == null')
    }

    const fixedPriceSaleContract = FixedPriceSale__factory.connect(sale.id, getProviderOrSigner(library, account))

    // Update state
    setTxPending(true)
    // Convert tokenQuantity (number) to 18-decimal BigNumber
    // Sign and send transaction
    fixedPriceSaleContract
      .buyTokens(utils.parseEther(tokenQuantity.toString()))
      .then(tx => tx.wait(1)) // wait one network confirmation
      .then(() => {
        toast.success(t('success.purchase'))
      })
      .catch(error => {
        console.error(error)
        toast.error(t('errors.purchase'))
      })
      .then(() => {
        setTxPending(false)
      })
  }, [account, library, sale, tokenQuantity, t])

  /**
   * Handles the form submission
   * @param event
   */
  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!sale || !purchaseValue || !(approvalState === ApprovalState.APPROVED)) return null

      if (sale.minimumRaise > BigNumber.from(0)) {
        const totalSupply = formatBigInt(sale.sellAmount, sale.tokenOut.decimals)
        const threshold = (formatBigInt(sale.minimumRaise) * 100) / totalSupply
        const totalAmountPurchased = totalPurchased(totalBids)[0].amount
        const amountDisplayed = Number(
          ethers.utils.formatUnits(totalAmountPurchased, sale.tokenOut.decimals).slice(0, 5)
        )
        const percentageSold = (amountDisplayed / totalSupply) * 100

        if (percentageSold < threshold) {
          toggleConfirmation()
          return
        }
      }

      purchaseTokens()
    },
    [toggleConfirmation, sale, totalBids, totalPurchased, purchaseTokens, purchaseValue]
  )

  const confirmationModalContent = (
    <div>
      <p>{t('texts.saleUnderSoftCap')}</p>

      <p>
        {t('texts.softCapReachedResult', {
          tokenQuantity: `${tokenQuantity}`,
          tokenOutSymbol: `${sale?.tokenOut.symbol}`,
        })}
      </p>

      <p>
        {t('texts.softCapNotReachedResult', {
          purchaseValue: `${purchaseValue}`,
          tokenInSymbol: `${sale?.tokenIn.symbol}`,
        })}
      </p>
    </div>
  )

  if (!account) {
    return <Center>{t('texts.connectWallet')}</Center>
  }

  if (loading) {
    return <Center>Loading</Center>
  }

  if (error) {
    return (
      <Center>
        <ErrorMessage error={error as Error} />
      </Center>
    )
  }

  if (!sale) {
    return (
      <Center>
        <ErrorMessage error="Could not fetch sale" />
      </Center>
    )
  }

  return (
    <FormFull id="placePurchaseForm" noValidate onSubmit={onSubmit}>
      <FormGroup>
        <FormLabel>Amount</FormLabel>
        <Flex flexDirection="column" flex={1}>
          <FormContainer>
            <FormText data-testid="amount-value">{sale.tokenIn.symbol}</FormText>
            <FormInput
              aria-label="purchaseValue"
              id="purchaseValue"
              type="number"
              placeholder="0.0"
              value={purchaseValue}
              onChange={onPurchaseValueChange}
            />
          </FormContainer>
        </Flex>
      </FormGroup>

      <FormGroup>
        {validationError ? (
          <PurchaseErrorMessage>{validationError.message}</PurchaseErrorMessage>
        ) : (
          <SuccessMessage>{`You get ${tokenQuantity} ${sale.tokenOut.symbol}`}</SuccessMessage>
        )}
      </FormGroup>
      <LinkedButtons
        buttons={[
          {
            title: `${approvalState == ApprovalState.APPROVED ? 'Approved' : `Approve ${sale.tokenIn.symbol}`} `,
            id: 'approve',
            onClick: approve,
          },
          {
            title: `Purchase ${sale.tokenOut.symbol}`,
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

      <Modal
        isShown={isModalShown}
        hide={toggleConfirmation}
        modalContent={confirmationModalContent}
        headerText={t('texts.confirmation')}
        onConfirm={() => {
          toggleConfirmation()
          purchaseTokens()
        }}
        confirmText={t('texts.continuePurchase')}
      />
    </FormFull>
  )
}
