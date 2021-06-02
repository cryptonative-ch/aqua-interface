// External
import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { BigNumber } from 'ethers'
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

// interface
import { FixedPriceSalePurchase } from 'src/interfaces/Sale'
import { ErrorMesssage } from 'src/components/ErrorMessage'

// can only do top level where conditions
// check if user has a purchase for a sale that has ended + threshold reached
const userSalesQuery = (userAddress: string) => gql`
{
  fixedPriceSalePurchases(where:{
    buyer:"${userAddress}"})
  {
    id
    amount
    sale: {
          id
          minimumRaise
          soldAmount
    }
  }
`

// { data: buyer { saleId:.., tokens}}

export function TokenView() {
  const { isMobile } = useWindowSize()
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const userAccount = (window as any).ethereum.selectedAddress
  useEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.tokens')))
  })
  const unixDateNow = dayjs(Date.now()).unix()

  const { loading, data, error } = useQuery(userSalesQuery(userAccount))

  const filteredData: FixedPriceSalePurchase[] = data.fixedPriceSalePurchases.filter(
    (element: FixedPriceSalePurchase) =>
      BigNumber.from(element.sale?.soldAmount) >= BigNumber.from(element.sale?.minimumRaise) &&
      unixDateNow > element.sale?.endDate
  )

  if (loading) {
    return <h1>LOADING!</h1>
  }

  if (error) {
    return (
      <AbsoluteContainer minHeight="200%" inner={false} noPadding={true}>
        <Header />
        <Container>
          <Title>{t('texts.claimTokens')}</Title>
          <GridListSection>
            <ErrorMesssage error={error} />
          </GridListSection>
        </Container>
        {!isMobile && <Footer />}
      </AbsoluteContainer>
    )
  }

  return (
    <AbsoluteContainer minHeight="200%" inner={false} noPadding={true}>
      <Header />
      <Container>
        <Title>{t('texts.claimTokens')}</Title>
        <GridListSection>
          {filteredData.map(tokens => (
            <TokenClaim key={tokens.id} purchase={tokens} />
          ))}
        </GridListSection>
      </Container>
      {!isMobile && <Footer />}
    </AbsoluteContainer>
  )
}
