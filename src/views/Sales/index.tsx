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
import { SaleDate } from 'src/interfaces/Sale'
import { isSaleOpen, isSaleClosed, isSaleUpcoming } from 'src/mesa/sale'

// Hooks
import { useMountEffect } from 'src/hooks/useMountEffect'
import { useSalesQuery } from 'src/hooks/useSalesQuery'
import { useFixedPriceSalePurchasesByBuyerQuery, SummarySales } from 'src/hooks/useFixedPriceSalePurchasesByBuyerId'

// Layouts
import { Center } from 'src/layouts/Center'
import { Divider } from 'src/components/Divider'
import { useWeb3React } from '@web3-react/core'

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
  const [filteredSales, setFilteredSales] = useState<SaleDate[]>()
  const [filteredUserSales, setFilteredUserSales] = useState<SummarySales>()
  const { loading, sales, error } = useSalesQuery()
  const { account } = useWeb3React()
  const { saleIds, sales: userSales } = useFixedPriceSalePurchasesByBuyerQuery(account!)
  console.log(userSales)
  console.log(sales)
  console.log(userSales)

  const setStatus = (status: SaleStatus) => {
    dispatch(setSelectedSaleStatus(status))
  }

  useMountEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.home')))
  })

  const sortByStatus = (unsortedSale: SaleDate[]) => {
    if (saleStatus === SaleStatus.UPCOMING) {
      return unsortedSale.sort((a: SaleDate, b: SaleDate) => b.startDate - a.startDate)
    } else if (saleStatus === SaleStatus.LIVE) {
      return unsortedSale.sort((a: SaleDate, b: SaleDate) => a.endDate - b.endDate)
    } else {
      return unsortedSale.sort((a: SaleDate, b: SaleDate) => b.endDate - a.endDate)
    }
  }

  const tempSortByStatus = (unsortedSale: SummarySales) => {
    if (saleStatus === SaleStatus.UPCOMING) {
      return unsortedSale.sort((a: any, b: any) => b.sale.startDate - a.sale.startDate)
    } else if (saleStatus === SaleStatus.LIVE) {
      return unsortedSale.sort((a: any, b: any) => a.sale.endDate - b.sale.endDate)
    } else {
      return unsortedSale.sort((a: any, b: any) => b.sale.endDate - a.sale.endDate)
    }
  }
  useEffect(() => {
    if (sales || userSales) {
      const tempSales = [...sales].filter(saleFilterMap[saleStatus])
      const userTempSales = [...userSales].filter(x => saleFilterMap[saleStatus](x.sale))
      setFilteredUserSales(tempSortByStatus(userTempSales))
      setFilteredSales(sortByStatus(tempSales))
    }
  }, [saleStatus, loading])

  return (
    <Container minHeight="100%" inner={false} noPadding={true}>
      <Container>
        <Title>Token Sales</Title>
        <SaleNavBar state={saleStatus} setStatus={setStatus} />
        {userSales.length > 0 && (
          <>
            <Divider />
            <GridListSection>
              {filteredUserSales?.map(sale => (
                <SaleSummaryWrapper to={`/sales/${sale.sale.id}`} key={sale.sale.id}>
                  <SaleSummaryCard sale={sale.sale as any} purchaseAmount={sale.amount} />
                </SaleSummaryWrapper>
              ))}
            </GridListSection>
            <Divider />
          </>
        )}
        <GridListSection>
          {error ? (
            <Center>
              <ErrorMessage error={error} />
            </Center>
          ) : loading ? (
            t('texts.loading')
          ) : (
            filteredSales
              ?.filter(x => !saleIds.includes(x.id))
              .map(sale => (
                <SaleSummaryWrapper to={`/sales/${sale.id}`} key={sale.id}>
                  <SaleSummaryCard sale={sale as any} />
                </SaleSummaryWrapper>
              ))
          )}
        </GridListSection>
      </Container>
    </Container>
  )
}
