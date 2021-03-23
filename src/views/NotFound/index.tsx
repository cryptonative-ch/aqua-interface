// External
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import React from 'react'

// Hooks
import { useMountEffect } from 'src/hooks/useMountEffect'

// Actions
import { setPageTitle } from 'src/redux/page'

// Layout
import { Flex } from 'src/components/Flex'

export function NotFoundView() {
  const dispatch = useDispatch()
  const [t] = useTranslation()

  useMountEffect(() => {
    dispatch(setPageTitle(t('texts.notFound')))
  })

  return (
    <Flex minHeight="100%" flexDirection="column" justifyContent="center" alignItems="center">
      <h1>{t('texts.notFound')}</h1>
    </Flex>
  )
}
