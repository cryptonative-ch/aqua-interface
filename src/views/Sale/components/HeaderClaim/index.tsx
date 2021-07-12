// External
import React from 'react'
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
import { FormButton, ButtonProps } from 'src/components/FormButton'

// Mesa Utils
import { isSaleClosed } from 'src/mesa/sale'

// Interfaces
import { Sale } from 'src/interfaces/Sale'
import { FIX_LATER } from 'src/interfaces'

// Hooks
import { useTokenClaim } from 'src/hooks/useTokenClaim'
import { useWindowSize } from 'src/hooks/useWindowSize'

const ClaimButtons = styled(FormButton)<ButtonProps>(props => ({
  height: '40px',
  fontWeight: '500' as Property.FontWeight,
  padding: '0 16px',
  fontSize: '14px',
  lineHeight: '21px',
  background: (props.background as Property.Background) || '#304FFE',
  color: props.color || '#fff',
}))

interface HeaderClaimProps {
  sale: Sale
}

export function HeaderClaim({ sale }: HeaderClaimProps) {
  const { isMobile } = useWindowSize()
  const theme = useTheme()
  const [t] = useTranslation()
  const { error: claimError, claim, claimTokens } = useTokenClaim()
  const threshold = BigNumber.from(sale.minimumRaise)
  const tokensSold = BigNumber.from(sale.soldAmount)
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
          {tokensSold.gte(threshold) ? (
            claim == 'verify' ? (
              <ClaimButtons mr="16px" disabled={false} type="button" background="#304FFE" color="#fff">
                <Spinner />
              </ClaimButtons>
            ) : claim === 'failed' ? (
              <ClaimButtons mr="16px" disabled={false} type="button">
                {claimError?.message}
              </ClaimButtons>
            ) : (
              <ClaimButtons disabled={false} mr="16px" type="button" onClick={() => claimTokens(sale.id)}>
                Claim Tokens
              </ClaimButtons>
            )
          ) : claim === 'verify' ? (
            <ClaimButtons disabled={true} type="button" background="#7B7F93" color="#fff">
              <Spinner />
            </ClaimButtons>
          ) : (
            <ClaimButtons
              disabled={claim === 'claimed' ? true : false}
              type="button"
              onClick={() => claimTokens(sale.id)}
              background="#7B7F93"
              color="#fff"
            >
              Withdraw Failed Bids
            </ClaimButtons>
          )}
        </>
      )}
    </CardBody>
  )
}
