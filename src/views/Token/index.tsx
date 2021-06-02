// External
import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import dayjs from 'dayjs'
import { BigNumber } from 'ethers'
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
import { useWindowSize } from 'src/hooks/useWindowSize'
import { useMesa } from 'src/hooks/useMesa'

// Layouts
import { TokenClaim } from './components/TokenClaim'
import { GridListSection } from 'src/components/Grid'

// interface
import { FixedPriceSalePurchase } from 'src/interfaces/Sale'
import { ErrorMesssage } from 'src/components/ErrorMessage'

const userSalesQuery = (userAddress: string) => `

query getTokenClaims {
  fixedPriceSalePurchases(where:{
    buyer:"${userAddress}"})
  {
    id
    amount
    sale {
        id
      soldAmount
      minimumRaise
      name
      status
      startDate
      endDate
      tokenPrice
      sellAmount
      tokenIn {
        id
        name
        symbol
        decimals
      }
      tokenOut {
          id
        name
        symbol
        decimals
      }
      allocationMin
      allocationMax

    }
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
  let filteredData: FixedPriceSalePurchase[] | undefined

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const signer = provider.getSigner()
    const userAccount = '0x6f736630d86fe714e8ce02c68f431347789f9835' //(window as any).ethereum.selectedAddress
    console.log(userAccount)
    if (userAccount) {
      mesa.subgraph
        .query(userSalesQuery(userAccount))
        .then(({ data }) => {
          const { fixedPriceSalePurchases } = data
          const unixDateNow = dayjs(Date.now()).unix()
          filteredData = fixedPriceSalePurchases.filter(
            (element: FixedPriceSalePurchase) =>
              BigNumber.from(element.sale?.soldAmount) >= BigNumber.from(element.sale?.minimumRaise) &&
              unixDateNow > element.sale!.endDate
          )
          console.log(filteredData)
        })
        .catch(error => {
          setError(error)
        })
        .then(() => {
          setLoading(false)
        })
    }
    dispatch(setPageTitle(t('pagesTitles.tokens')))
  }, [])

  if (loading) {
    return (
      <AbsoluteContainer minHeight="200%" inner={false} noPadding={true}>
        <Header />
        <Container>
          <Title>{t('texts.claimTokens')}</Title>
          <GridListSection>
            <h1>Loading!</h1>
          </GridListSection>
        </Container>
        {!isMobile && <Footer />}
      </AbsoluteContainer>
    )
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
          {filteredData?.map(tokens => <TokenClaim key={tokens.id} purchase={tokens} />) || (
            <h1>No Tokens Available</h1>
          )}
        </GridListSection>
      </Container>
      {!isMobile && <Footer />}
    </AbsoluteContainer>
  )
}
