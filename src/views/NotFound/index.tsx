// External
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

// Hooks
import { useMountEffect } from 'src/hooks/useMountEffect'

// Actions
import { setPageTitle } from 'src/redux/page'

// Layout
import { Center } from 'src/layouts/Center'

// Components

import { Button } from 'src/components/Button'
import { Title } from 'src/components/Title'
import { Link } from 'src/components/Link'

export function NotFoundView() {
  const dispatch = useDispatch()
  const [t] = useTranslation()

  useMountEffect(() => {
    dispatch(setPageTitle(t('texts.notFound')))
  })

  return (
    <Center minHeight="calc(100vh - 72px)">
      <Title color="#7B7F93" fontSize={96} fontWeight={700}>
        404
      </Title>
      <Title height={88} marginBottom={56}>
        {t('texts.pageNotFound')}
      </Title>
      <Link to="/">
        <Button
          disabled={false}
          data-testid="submit-button"
          type="button"
          title={t('buttons.goBack')}
          formButton
          width="235px"
          height="48px"
          fontWeight="500"
          padding={false}
          fontSize="14px"
          lineHeight="21px"
          border={true}
          background={'#304FFE'}
          color={'#fff'}
        >
          {t('buttons.goBack')}
        </Button>
      </Link>
    </Center>
  )
}
