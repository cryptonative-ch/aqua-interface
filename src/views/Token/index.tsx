// External
import React, { useState, createContext } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

// Redux
import { setPageTitle } from 'src/redux/page'

// Components
import { AbsoluteContainer } from 'src/components/AbsoluteContainer'
import { Container } from 'src/components/Container'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Card } from 'src/components/CardSale'

// Hooks
import { useMountEffect } from 'src/hooks/useMountEffect'
import { useWindowSize } from 'src/hooks/useWindowSize'

// Layouts
import { TokenClaim } from './components/TokenClaim'

const SaleListSection = styled.div(
  props => ({
    margin: '0',
    display: props.theme.grid.display,
    gridTemplateColumns: props.theme.grid.gridTemplateColumns[0],
    gap: props.theme.grid.gap[0],
  }),
  props => `
    @media (max-width: ${props.theme.breakpoints[2]}) {
      grid-template-columns: ${props.theme.grid.gridTemplateColumns[1]};
      row-gap: ${props.theme.grid.gap[1]};
    })`
)

const Title = styled.p({
  height: '44px',
  width: '210px',
  fontFamily: 'Inter',
  fontSize: '36px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '44px',
  letterSpacing: '0',
  textAlign: 'left',
  color: '#000629',
  marginBottom: '32px',
})


export function TokenView() {
  const { isMobile } = useWindowSize()
  const dispatch = useDispatch()
  const [t] = useTranslation()

  useMountEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.home')))
  })

  return (
      <AbsoluteContainer minHeight="200%" inner={false} noPadding={true}>
        <Header />
        <Container>
          <Title>{t('texts.claimToken')}</Title>
          <SaleListSection>
             <TokenClaim sale={sale}/>
          </SaleListSection>
        </Container>
        {!isMobile && <Footer />}
      </AbsoluteContainer>
  )
}
