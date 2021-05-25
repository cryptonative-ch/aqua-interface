// External
import React, { useEffect, useState, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

// Redux
import { fetchSales } from 'src/redux/sales'
import { setPageTitle } from 'src/redux/page'
import { RootState } from 'src/redux/store'

// Components
import { AbsoluteContainer } from 'src/components/AbsoluteContainer'
import { SaleSummaryCard } from './components/SaleSummaryCard'
import { SaleNavBar } from './components/SaleNavBar'
import { Container } from 'src/components/Container'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Card } from 'src/components/CardSale'

// interface
import { isSaleOpen, isSaleClosed, isSaleUpcoming } from 'src/mesa/sale'
import { Sale } from 'src/interfaces/Sale'

//subgraph
import { salesRequest } from 'src/subgraph/Sales'
import { useWindowSize } from 'src/hooks/useWindowSize'

const SaleSummaryWrapper = styled(NavLink)(Card, {
  display: 'block',
})

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
  const [SaleShow, setSaleShow] = useState<SaleStatus>(SaleStatus.LIVE)
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const fetchData = () => dispatch(fetchSales())

  const sales = useSelector<RootState, Sale[]>(state => {
    return state.sales.sales
  })

  useEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.home')))
    fetchData()
  }, [t])

  return (
    <SaleContext.Provider value={{ SaleShow, setSaleShow }}>
      <AbsoluteContainer minHeight="200%" inner={false} noPadding={true}>
        <Header />
        <Container>
          <Title>Token Sales</Title>
          <SaleNavBar />
          <SaleListSection>
            {sales.filter(saleFilterMap[SaleShow]).map(sale => (
              <SaleSummaryWrapper to={`/sales/${sale.id}`} key={sale.id}>
                <SaleSummaryCard sale={sale} />
              </SaleSummaryWrapper>
            ))}
          </SaleListSection>
        </Container>
        {!isMobile && <Footer />}
      </AbsoluteContainer>
    </SaleContext.Provider>
  )
}
