// External
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

// Redux
import { setPageTitle } from 'src/redux/page'

// Components
import { AbsoluteContainer } from 'src/components/AbsoluteContainer'
import { Container } from 'src/components/Container'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Title } from 'src/components/Title'

// Hooks
import { useMountEffect } from 'src/hooks/useMountEffect'
import { useWindowSize } from 'src/hooks/useWindowSize'

// Layouts
import { TokenClaim } from './components/TokenClaim'
import { GridListSection } from 'src/components/Grid'

export function TokenView() {
  const { isMobile } = useWindowSize()
  const dispatch = useDispatch()
  const [t] = useTranslation()

  useMountEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.tokens')))
  })

  return (
    <AbsoluteContainer minHeight="200%" inner={false} noPadding={true}>
      <Header />
      <Container>
        <Title>{t('texts.claimTokens')}</Title>
        <GridListSection>
          <TokenClaim />
          <TokenClaim />
          <TokenClaim />
          <TokenClaim />
          <TokenClaim />
        </GridListSection>
      </Container>
      {!isMobile && <Footer />}
    </AbsoluteContainer>
  )
}
