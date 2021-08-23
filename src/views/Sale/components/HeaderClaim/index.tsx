// External
import React from 'react'
import { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'

// Components
import { CardTitle } from 'src/components/CardTitle'
import { CardBody } from 'src/components/CardBody'
import { Flex } from 'src/components/Flex'

// Aqua Utils
import { isSaleClosed } from 'src/aqua/sale'

// Interfaces
import { FIX_LATER } from 'src/interfaces'
import { GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale } from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

// Hooks
import { useWindowSize } from 'src/hooks/useWindowSize'
import { ClaimButton } from 'src/views/Sale/components/HeaderClaim/ClaimButton'

interface HeaderClaimProps {
  sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale
}

export function HeaderClaim({ sale }: HeaderClaimProps) {
  const { isMobile } = useWindowSize()
  const theme = useTheme()
  const [t] = useTranslation()

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
      {isSaleClosed(sale as FIX_LATER) && !isMobile && <ClaimButton sale={sale} />}
    </CardBody>
  )
}
