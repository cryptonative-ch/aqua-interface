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
import { Button } from 'src/components/Button'

// Utils
import { convertToBuyerPrice, fixRounding, formatBigInt, isNativeToken } from 'src/utils'

// Hooks
import { ApprovalState, useApproveCallback } from 'src/hooks/useApprovalCallback'
import { useFixedPriceSaleQuery } from 'src/hooks/useSaleQuery'
import { useTokenBalance } from 'src/hooks/useTokenBalance'
import { useModal } from 'src/hooks/useModal'
import { useCPK, useCPKexecTransactions } from 'src/hooks/useCPK'

//helpers
import { aggregatePurchases } from 'src/utils'
import { upgradeProxy, wrap, tokenApproval, commitToken, purchaseTokensCPKParams } from 'src/CPK'

// Layouts
import { Center } from 'src/layouts/Center'
import { FixedPriceSale__factory } from 'src/contracts'
import { getProviderOrSigner } from 'src/utils'
import { LinkedButtons } from 'src/components/LinkedButtons'
import { useSelector } from 'react-redux'
import { CommitmentsState } from 'src/redux/commitments'

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
  const { account, library, chainId } = useWeb3React()
  const { loading, sale, error } = useFixedPriceSaleQuery(saleId)
  const tokenBalance = useTokenBalance({
    tokenAddress: sale?.tokenIn.id,
    owner: account ?? undefined,
  })
  const { isShown: isModalShown, toggle: toggleConfirmation } = useModal()
  const allBids = useSelector(({ commitments }) => (commitments as CommitmentsState).bidsBySaleId[saleId]?.bids)

  const [approvalState, approve] = useApproveCallback({
    spender: sale?.id as string,
    tokenAddress: sale?.tokenIn.id as string,
  })

  const [validationError, setValidationError] = useState<Error>()
  const [purchaseValue, setPurchaseValue] = useState<number | undefined>()
  const [tokenQuantity, setTokenQuantity] = useState<number>(0)
  const { cpk } = useCPK(library, chainId)
  const { CPKpipe } = useCPKexecTransactions()

  const purchaseTokensCPK = async (params: purchaseTokensCPKParams) => {
    try {
      setTxPending(true)
      const { transactionResult } = await CPKpipe(upgradeProxy, wrap, tokenApproval, commitToken)(params)
      if (transactionResult) {
        transactionResult?.wait(1)
        setTxPending(false)
        return toast.success(t('success.purchase'))
      }
    } catch (error) {
      setTxPending(false)
      console.error(error)
      return toast.error(t('errors.purchase'))
    }
  }

  const getMaxPurchase = () => {
    const parsedTokenBalance = parseFloat(utils.formatUnits(tokenBalance))
    const purchaseMaximumCommitment = parseFloat(utils.formatUnits(BigNumber.from(sale?.maxCommitment)))
    const remainingTokens = formatBigInt(sale?.sellAmount) - formatBigInt(sale?.soldAmount)
    const costOfRemainingTokens = remainingTokens * convertToBuyerPrice(formatBigInt(sale?.tokenPrice))
    const maxPurchase =
      parsedTokenBalance < purchaseMaximumCommitment
        ? parsedTokenBalance
        : costOfRemainingTokens < purchaseMaximumCommitment
        ? costOfRemainingTokens
        : purchaseMaximumCommitment
    return maxPurchase
  }

  // A form is valid when
  // 1. purchaseValue >= min commitment
  // 2. purchaseValue <= max commitment (including previous purchases)
  // 3. bidding token balance <= purchaseValue
  const setValidatedPurchaseValue = (value: number) => {
    let newValidationError = undefined
    const parsedTokenBalance = parseFloat(utils.formatUnits(tokenBalance))
    // Convert min max commitments
    // Converting BigNumbers to normal numbers due to lack of decimal support
    const purchaseMinimumCommitment = parseFloat(utils.formatUnits(BigNumber.from(sale?.minCommitment)))
    const purchaseMaximumCommitment = getMaxPurchase()
    const tokenPrice = convertToBuyerPrice(parseFloat(utils.formatUnits(BigNumber.from(sale?.tokenPrice))))

    const quantity = fixRounding(value / tokenPrice, 8)

    // purchaseValue is less than minimum commitment
    if (purchaseMinimumCommitment > value) {
      newValidationError = new Error(
        `Minimum is ${fixRounding(purchaseMinimumCommitment * tokenPrice, 8)} ${
          sale?.tokenOut.symbol
        } / ${utils.formatUnits(sale?.minCommitment)} ${sale?.tokenIn.symbol}`
      )
    }
    if (purchaseMaximumCommitment < value && !cpk) {
      newValidationError = new Error(
        `${parsedTokenBalance < value ? '\nInsufficient funds to process purchase: ' : ''} Maximum is ${fixRounding(
          purchaseMaximumCommitment / tokenPrice,
          8
        )} ${sale?.tokenOut.symbol} / ${purchaseMaximumCommitment} ${sale?.tokenIn.symbol} `
      )
    }
    // // Purchase value is greater than user's tokeIn balance
    else if (parsedTokenBalance < value && !cpk) {
      newValidationError = new Error('Insufficient funds to process purchase')
    }

    // Update Component state and re-render
    setPurchaseValue(value)
    setTokenQuantity(quantity)
    setValidationError(newValidationError)
  }

  const onPurchaseValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (!value) {
      return setPurchaseValue(undefined)
    }

    setValidatedPurchaseValue(parseFloat(value))
  }

  const onMaxButtonClick = () => {
    const maxPurchase = getMaxPurchase()
    const purchaseMinimumCommitment = parseFloat(utils.formatUnits(BigNumber.from(sale?.minCommitment)))
    if (maxPurchase < purchaseMinimumCommitment) return

    setValidatedPurchaseValue(fixRounding(maxPurchase, 8))
  }

  const purchaseTokens = useCallback(() => {
    if (!sale) {
      return console.error('no sale')
    }

    if (!account || !library || !chainId) {
      return console.error('no connected signer')
    }

    if (!purchaseValue || !tokenQuantity) {
      return console.error('purchase amount == null')
    }
    if (isNativeToken(sale?.tokenIn.id as string, chainId as number) && cpk && account && chainId && purchaseValue) {
      const value = utils.parseEther(purchaseValue.toString())
      const params = {
        cpk,
        tokenAddress: sale?.tokenIn.id as string,
        saleAddress: sale?.id as string,
        account: account as string,
        chainId: chainId as number,
        library,
        purchaseValue: value,
      }
      return purchaseTokensCPK(params)
    }

    const fixedPriceSaleContract = FixedPriceSale__factory.connect(sale.id, getProviderOrSigner(library, account))

    // Update state
    setTxPending(true)
    // Convert purchaseValue (number) to 18-decimal BigNumber
    // Sign and send transaction
    fixedPriceSaleContract
      .commitTokens(utils.parseEther(purchaseValue.toString()))
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
  }, [account, library, chainId, sale, tokenQuantity, purchaseValue, t, cpk])

  /**
   * Handles the form submission
   * @param event
   */
  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!sale || !purchaseValue || (!(approvalState === ApprovalState.APPROVED) && !cpk)) return null

      if (sale.minRaise > BigNumber.from(0)) {
        const totalSupply = formatBigInt(sale.sellAmount, sale.tokenOut.decimals)
        const threshold = (formatBigInt(sale.minRaise) * 100) / totalSupply
        const totalAmountPurchased = aggregatePurchases(
          allBids,
          {
            userAddress: account! as string,
            cpkAddress: cpk?.address as string,
          },
          chainId as number
        ).amount
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
    [toggleConfirmation, sale, allBids, aggregatePurchases, purchaseTokens, purchaseValue]
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
            <FormText data-testid="amount-value">
              <MaxButton onClick={onMaxButtonClick}>Max</MaxButton>
              {sale.tokenIn.symbol}
            </FormText>
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
      {isNativeToken(sale.tokenIn.id, chainId as number) ? (
        <Button disabled={!!validationError}>{t('buttons.purchase') + ' ' + sale.tokenOut.symbol}</Button>
      ) : (
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
      )}

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
