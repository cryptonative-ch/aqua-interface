// Externals
import React from 'react'
import { useTranslation } from 'react-i18next'
import { theme } from 'src/styles/theme'
import { Button } from '../Button'

export const LoadMore = () => {
  const [t] = useTranslation()
  return (
    <Button
      data-testid="submit-button"
      type="submit"
      title={t('buttons.loadMore')}
      width="100%"
      height="48px"
      fontWeight="500"
      padding={false}
      fontSize="14px"
      lineHeight="21px"
      border={true}
      background={theme.buttons.inActive.backgroundColor}
      color={theme.buttons.inActive.color}
    >
      {t('buttons.loadMore')}
    </Button>
  )
}
