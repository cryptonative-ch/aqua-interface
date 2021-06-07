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
import { SaleSummaryCard } from './components/SaleSummaryCard'
import { ErrorMesssage } from 'src/components/ErrorMessage'
import { SaleNavBar } from './components/SaleNavBar'
import { Container } from 'src/components/Container'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Card } from 'src/components/CardSale'
import { GridListSection } from 'src/components/Grid'

// interface
import { isSaleOpen, isSaleClosed, isSaleUpcoming } from 'src/mesa/sale'

// Hooks
import { useMountEffect } from 'src/hooks/useMountEffect'
import { useWindowSize } from 'src/hooks/useWindowSize'
import { useSalesQuery } from 'src/hooks/useSalesQuery'

// Layouts
import { Center } from 'src/layouts/Center'

const SaleSummaryWrapper = styled(NavLink)(Card, {
  display: 'block',
})

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

export enum SaleStatus {
  LIVE = 'Live',
  UPCOMING = 'upcoming',
  CLOSED = 'closed',
}

export type SaleContextType = {
  SaleShow: SaleStatus
  setSaleShow: (value: SaleStatus) => void
}

export const SaleContext = createContext<SaleContextType>({} as SaleContextType)
const saleFilterMap = {
  [SaleStatus.UPCOMING]: isSaleUpcoming,
  [SaleStatus.CLOSED]: isSaleClosed,
  [SaleStatus.LIVE]: isSaleOpen,
}

export function SalesView() {
  const { isMobile } = useWindowSize()
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const [SaleShow, setSaleShow] = useState<SaleStatus>(SaleStatus.LIVE)
  const { loading, sales, error } = useSalesQuery()

  useMountEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.home')))
  })

  if (loading) {
    return (
      <Center>
        <Header />
        <Container>
          <Title>Token Sales</Title>
          <GridListSection>Loading!</GridListSection>
        </Container>
      </Center>
    )
  }

  if (error) {
    return (
      <SaleContext.Provider value={{ SaleShow, setSaleShow }}>
        <Center>
          <Header />
          <Container>
            <Title>Token Sales</Title>
            <SaleNavBar />
            <GridListSection>
              <ErrorMesssage error={error} />
            </GridListSection>
          </Container>
        </Center>
      </SaleContext.Provider>
    )
  }

  return (
    <SaleContext.Provider value={{ SaleShow, setSaleShow }}>
      <AbsoluteContainer minHeight="100%" inner={false} noPadding={true}>
        <Header />
        <Container>
          <Title>Token Sales</Title>
          <SaleNavBar />
          <GridListSection>
            {sales.filter(saleFilterMap[SaleShow]).map(sale => (
              <SaleSummaryWrapper to={`/sales/${sale.id}`} key={sale.id}>
                <SaleSummaryCard sale={sale} />
              </SaleSummaryWrapper>
            ))}
          </GridListSection>
        </Container>
        {!isMobile && <Footer />}
      </AbsoluteContainer>
    </SaleContext.Provider>
  )
}
