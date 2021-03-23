// External
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import React from 'react'

// Hooks
import { useMountEffect } from 'src/hooks/useMountEffect'

// Actions
import { setPageTitle } from 'src/redux/page'

// Layout
import { Center } from 'src/layouts/Center'

export function NotFoundView() {
  const dispatch = useDispatch()
  const [t] = useTranslation()

  useMountEffect(() => {
    dispatch(setPageTitle(t('texts.notFound')))
  })

  return (
    <Center minHeight="100%">
      <h1>{t('texts.notFound')}</h1>
    </Center>
  )
}
