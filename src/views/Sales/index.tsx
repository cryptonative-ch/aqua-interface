// External
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

// Redux
import { setPageTitle, setSelectedSaleStatus } from 'src/redux/page'

// Components
import { SaleSummaryCard } from 'src/views/Sales/components/SaleSummaryCard'
import { ErrorMessage } from 'src/components/ErrorMessage'
import { SaleNavBar } from 'src/views/Sales/components/SaleNavBar'
import { Container } from 'src/components/Container'
import { Card } from 'src/components/CardSale'
import { GridListSection } from 'src/components/Grid'

// interface
import { isSaleOpen, isSaleClosed, isSaleUpcoming } from 'src/mesa/sale'

// Hooks
import { useMountEffect } from 'src/hooks/useMountEffect'
import { useSalesQuery } from 'src/hooks/useSalesQuery'

// Layouts
import { Center } from 'src/layouts/Center'
import { Sale } from 'src/interfaces/Sale'

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

const saleFilterMap = {
  [SaleStatus.UPCOMING]: isSaleUpcoming,
  [SaleStatus.CLOSED]: isSaleClosed,
  [SaleStatus.LIVE]: isSaleOpen,
}

export function SalesView() {
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const saleStatus = useSelector(({ page }) => page.selectedSaleStatus)
  const [filteredSales, setFilteredSales] = useState<Sale[]>()
  const { loading, sales, error } = useSalesQuery()

  const setStatus = (status: SaleStatus) => {
    dispatch(setSelectedSaleStatus(status))
  }

  useMountEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.home')))
  })

  const sortByStatus = (unsortedSale: Sale[]) => {
    if (saleStatus === SaleStatus.UPCOMING) {
      return unsortedSale.sort((a: Sale, b: Sale) => b.startDate - a.startDate)
    } else if (saleStatus === SaleStatus.LIVE) {
      return unsortedSale.sort((a: Sale, b: Sale) => a.endDate - b.endDate)
    } else {
      return unsortedSale.sort((a: Sale, b: Sale) => b.endDate - a.endDate)
    }
  }

  useEffect(() => {
    if (sales) {
      const tempSales = [...sales].filter(saleFilterMap[saleStatus])
      setFilteredSales(sortByStatus(tempSales))
    }
  }, [saleStatus, loading])

  return (
    <Container minHeight="100%" inner={false} noPadding={true}>
      <Container>
        <Title>Token Sales</Title>
        <SaleNavBar state={saleStatus} setStatus={setStatus} />
        <GridListSection>
          {error ? (
            <Center>
              <ErrorMessage error={error} />
            </Center>
          ) : loading ? (
            t('texts.loading')
          ) : (
            filteredSales?.map(sale => (
              <SaleSummaryWrapper to={`/sales/${sale.id}`} key={sale.id}>
                <SaleSummaryCard sale={sale} />
              </SaleSummaryWrapper>
            ))
          )}
        </GridListSection>
      </Container>
    </Container>
  )
}
