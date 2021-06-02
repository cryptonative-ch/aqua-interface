// External
import React, { useState, useEffect } from 'react'
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
import { useMesa } from 'src/hooks/useMesa'

// Layouts
import { TokenClaim } from './components/TokenClaim'
import { GridListSection } from 'src/components/Grid'

// interface
import { FixedPriceSalePurchase } from 'src/interfaces/Sale'
import { ErrorMesssage } from 'src/components/ErrorMessage'

// can only do top level where conditions
// check if user has a purchase for a sale that has ended + threshold reached
const userSalesQuery = (userAddress: string) => `

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
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error>()
  const mesa = useMesa()
  const userAccount = (window as any).ethereum.selectedAddress
  let fixedPriceSalePurchases: FixedPriceSalePurchase[]
  const fetchData = async () => {
    mesa.subgraph
      .query(userSalesQuery(userAccount))
      .then(({ data }) => {
        ;({ fixedPriceSalePurchases } = data)
      })
      .catch(error => {
        setError(error)
      })
      .then(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchData()
    dispatch(setPageTitle(t('pagesTitles.tokens')))
  })
  const unixDateNow = dayjs(Date.now()).unix()

  const filteredData: FixedPriceSalePurchase[] = fixedPriceSalePurchases.filter(
    (element: FixedPriceSalePurchase) =>
      BigNumber.from(element.sale?.soldAmount) >= BigNumber.from(element.sale?.minimumRaise) &&
      unixDateNow > element.sale!.endDate
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
