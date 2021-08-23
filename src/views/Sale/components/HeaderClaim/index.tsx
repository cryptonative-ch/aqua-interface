// External
import React, { useState } from 'react'
import styled from 'styled-components'
import { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Property } from 'csstype'
import { BigNumber } from '@ethersproject/bignumber'

// Components
import { CardTitle } from 'src/components/CardTitle'
import { CardBody } from 'src/components/CardBody'
import { Flex } from 'src/components/Flex'
import { Spinner } from 'src/components/Spinner'
import { ButtonProps } from 'src/components/FormButton'
import { Button } from 'src/components/Button'
import { Modal } from 'src/components/Modal'

// Aqua Utils
import { isSaleClosed } from 'src/aqua/sale'

// Interfaces
import { FIX_LATER } from 'src/interfaces'
import { GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale } from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

// Hooks
import { ClaimState, useTokenClaim } from 'src/hooks/useTokenClaim'
import { useWindowSize } from 'src/hooks/useWindowSize'
import { SaleStatus } from 'src/subgraph/__generated__/globalTypes'
import { useModal } from 'src/hooks/useModal'

const ClaimButtons = styled(Button)<ButtonProps>(props => ({
  height: '40px',
  fontWeight: '500' as Property.FontWeight,
  padding: '0 16px',
  fontSize: '14px',
  lineHeight: '21px',
  background: (props.background as Property.Background) || '#304FFE',
  color: props.color || '#fff',
}))

interface HeaderClaimProps {
  sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale
}

export function HeaderClaim({ sale }: HeaderClaimProps) {
  const { isMobile } = useWindowSize()
  const theme = useTheme()
  const [t] = useTranslation()
  const [isSaleStatusClosed, setIsSaleStatusClosed] = useState<boolean>(sale.status === SaleStatus.CLOSED)
  const { isShown: isModalShown, toggle: toggleConfirmation } = useModal()
  const { claim, claimTokens, closeSale } = useTokenClaim(sale)
  const threshold = BigNumber.from(sale.minRaise)
  const tokensSold = BigNumber.from(sale.soldAmount)

  const confirmationModalContent = (
    <div>
      <p>{t('texts.saleNotClosedClaim')}</p>
      <p>{t('texts.closeOrWait')}</p>
    </div>
  )

  return (
    <CardBody
      display="flex"
      padding={isMobile ? '16px' : theme.space[4]}
      border="none"
      flexDirection="row"
      alignItems="center"
    >
      <CardTitle fontSize="16px" lineHeight="19px" color="#000629" fontWeight="500">
        {t('texts.yourActivity')}
      </CardTitle>
      <Flex flex={1} />
      {isSaleClosed(sale as FIX_LATER) && !isMobile && (
        <>
          {claim === ClaimState.VERIFY ? (
            <ClaimButtons mr="16px" disabled={false} type="button" background="#304FFE" color="#fff">
              <Spinner />
            </ClaimButtons>
          ) : claim === ClaimState.PROCESSED ? (
            <ClaimButtons disabled mr="16px" type="button">
              {t('buttons.tokensClaimed')}
            </ClaimButtons>
          ) : (
            <ClaimButtons
              type="button"
              onClick={() => {
                if (isSaleStatusClosed) {
                  claimTokens(sale.id)
                } else {
                  toggleConfirmation()
                }
              }}
            >
              {tokensSold.gte(threshold) ? t('buttons.claimTokens') : t('buttons.withdrawFailedCommitments')}
            </ClaimButtons>
          )}
        </>
      )}

      <Modal
        isShown={isModalShown}
        hide={toggleConfirmation}
        modalContent={confirmationModalContent}
        headerText={t('texts.closeSale')}
        onConfirm={() => {
          toggleConfirmation()
          closeSale(sale.id, setIsSaleStatusClosed)
        }}
        confirmText={t('texts.closeSale')}
      />
    </CardBody>
  )
}
