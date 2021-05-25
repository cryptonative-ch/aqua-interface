// Externals
import React from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { Button } from '../Button'
import { SVGIcon } from 'src/components/Icon'
// Themes
import { theme } from 'src/styles/theme'

// svg
import vector from 'src/assets/svg/SVGIcon.svg'

export const TokenClaimButton = () => {
  const [t] = useTranslation()
  return (
    <Button
      disabled={false}
      data-testid="tokenClaimButton"
      type="button"
      title={t('tokenClaimed')}
      width="90%"
      height="48px"
      fontWeight="500"
      padding={false}
      fontSize="14px"
      lineHeight="21px"
      border={true}
      background={theme.buttons.tokensClaimed.backgroundColor}
      color={theme.buttons.tokensClaimed.color}
    >
      <SVGIcon src={vector} color={theme.buttons.tokensClaimed.color} />
      {t('tokenClaimed')}
    </Button>
  )
}
