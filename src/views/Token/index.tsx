// External
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useQuery, gql } from '@apollo/client'

// Redux
import { setPageTitle } from 'src/redux/page'

// Components
import { AbsoluteContainer } from 'src/components/AbsoluteContainer'
import { Container } from 'src/components/Container'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Title } from 'src/components/Title'

// Hooks
import { useWindowSize } from 'src/hooks/useWindowSize'

// Layouts
import { TokenClaim } from './components/TokenClaim'
import { GridListSection } from 'src/components/Grid'

const userSalesQuery = (userAddress: string) => gql`
{
  fixedPriceSalePurchases(where:{
    buyer:"${userAddress}"})
  {
    id
  }
`

// { data: buyer { saleId:.., tokens}}

export async function TokenView() {
  const { isMobile } = useWindowSize()
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const userAccount = window.ethereum.selectedAddress
  useEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.tokens')))
  })

  const { loading, data, error } = useQuery(userSalesQuery(userAccount))

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
