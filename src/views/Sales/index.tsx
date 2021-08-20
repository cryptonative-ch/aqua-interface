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
import { isSaleOpen, isSaleClosed, isSaleUpcoming } from 'src/aqua/sale'
import { FIX_LATER } from 'src/interfaces'

//interface
import { GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale } from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

// Hooks
import { useMountEffect } from 'src/hooks/useMountEffect'
import { useSalesQuery } from 'src/hooks/useSalesQuery'
import {
  useFixedPriceSaleCommitmentsByBuyerIdQuery,
  SummarySales,
} from 'src/hooks/useFixedPriceSaleCommitmentsByBuyerId'

// Layouts
import { Center } from 'src/layouts/Center'
import { DividerWithText } from 'src/components/Divider'
import { useWeb3React } from '@web3-react/core'

// sales page
import { TokenView } from 'src/views/Token'

export const SaleSummaryWrapper = styled(NavLink)(Card, {
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
  const [filteredSales, setFilteredSales] = useState<SaleDate[]>([])
  const [filteredUserSales, setFilteredUserSales] = useState<SummarySales[]>([])
  const { loading, sales, error } = useSalesQuery()
  const { account } = useWeb3React()
  const { saleIds, sales: userSales, loading: userLoading } = useFixedPriceSaleCommitmentsByBuyerIdQuery(account)

  const setStatus = (status: SaleStatus) => {
    dispatch(setSelectedSaleStatus(status))
  }

  useMountEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.home')))
  })

  const isSaleDate = (array: SummarySales[] | SaleDate[]): array is SaleDate[] => {
    if (array.length == 0) {
      return false
    }
    return typeof (array[0] as SaleDate).startDate !== 'undefined'
  }

  const sortByStatus = (unsortedSale: SaleDate[] | SummarySales[]) => {
    if (isSaleDate(unsortedSale)) {
      if (saleStatus === SaleStatus.UPCOMING) {
        return unsortedSale.sort((a: SaleDate, b: SaleDate) => b.startDate - a.startDate)
      } else if (saleStatus === SaleStatus.LIVE) {
        return unsortedSale.sort((a: SaleDate, b: SaleDate) => a.endDate - b.endDate)
      } else {
        return unsortedSale.sort((a: SaleDate, b: SaleDate) => b.endDate - a.endDate)
      }
    }

    if (saleStatus === SaleStatus.UPCOMING) {
      return unsortedSale.sort((a: SummarySales, b: SummarySales) => b.sale.startDate - a.sale.startDate)
    } else if (saleStatus === SaleStatus.LIVE) {
      return unsortedSale.sort((a: SummarySales, b: SummarySales) => a.sale.endDate - b.sale.endDate)
    } else {
      return unsortedSale.sort((a: SummarySales, b: SummarySales) => b.sale.endDate - a.sale.endDate)
    }
  }

  useEffect(() => {
    if (sales && userSales) {
      setFilteredUserSales(
        sortByStatus([...userSales].filter(x => saleFilterMap[saleStatus](x.sale as FIX_LATER))) as SummarySales[]
      )
      setFilteredSales(
        sortByStatus([...sales].filter(saleFilterMap[saleStatus]).filter(x => !saleIds.includes(x.id))) as SaleDate[]
      )
    }
  }, [saleStatus, loading, userLoading])

  return (
    <Container minHeight="100%" inner={false} noPadding={true}>
      <Container>
        <Title>Token Sales</Title>
        <SaleNavBar state={saleStatus} setStatus={setStatus} />
        {filteredUserSales.length > 0 && (
          <>
            {saleStatus === SaleStatus.LIVE ? (
              <DividerWithText color="#7B7F93">{t('texts.activeSales')}</DividerWithText>
            ) : saleStatus === SaleStatus.CLOSED ? (
              <DividerWithText color="#7B7F93">{t('texts.bidsWon')}</DividerWithText>
            ) : (
              <DividerWithText color="#7B7F93">{t('texts.participatedSales')}</DividerWithText>
            )}

            {saleStatus === SaleStatus.CLOSED ? (
              <TokenView />
            ) : (
              <GridListSection>
                {filteredUserSales?.map(sale => (
                  <SaleSummaryWrapper to={`/sales/${sale.sale.id}`} key={sale.sale.id}>
                    <SaleSummaryCard sale={sale.sale as any} purchaseAmount={sale.amount} />
                  </SaleSummaryWrapper>
                ))}
              </GridListSection>
            )}
          </>
        )}

        {filteredUserSales.length > 0 && filteredSales.length > 0 && (
          <DividerWithText color="#7B7F93">{t('texts.otherSales')}</DividerWithText>
        )}
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
                <SaleSummaryCard sale={sale as GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale} />
              </SaleSummaryWrapper>
            ))
          )}
        </GridListSection>
      </Container>
    </Container>
  )
}
