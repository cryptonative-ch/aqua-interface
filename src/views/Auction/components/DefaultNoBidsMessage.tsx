// External
import { useTranslation } from 'react-i18next'
import React from 'react'

// Layouts
import { Center } from 'src/layouts/Center'

export const DefaultNoBidsMessage = () => {
  const [t] = useTranslation()

  return <Center minHeight="100%">{t('texts.noBidsMessage')}</Center>
}
