// External
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import React from 'react'

// Components
import { Flex } from 'src/components/Flex'
import { BackButton } from './BackButton'

interface HeaderComponentProps {
  title: string
}

export function Header({ title }: HeaderComponentProps) {
  const [t] = useTranslation()
  const theme = useTheme()

  return (
    <Flex
      py={theme.space[2]}
      mb={theme.space[2]}
      style={{
        gap: theme.space[3],
      }}
      alignItems="center"
    >
      <BackButton title={t('buttons.goBack')} to="/auctions" />
      <PageHeading>{title}</PageHeading>
    </Flex>
  )
}

const PageHeading = styled.h1({
  margin: 0,
})
