/* eslint-disable @typescript-eslint/no-explicit-any */

// External
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import { useParams } from 'react-router-dom'
import React, { useState } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

// Hooks
import { useFixedPriceSaleQuery } from 'src/hooks/useSaleQuery'
import { useWindowSize } from 'src/hooks/useWindowSize'

// Components
import { ErrorMesssage } from 'src/components/ErrorMessage'
import { MobileFooter } from 'src/components/MobileFooter'
import { FormButton } from 'src/components/FormButton'
import { BackButton } from 'src/components/BackButton'
import { Container } from 'src/components/Container'
import { CardTitle } from 'src/components/CardTitle'
import { CardBody } from 'src/components/CardBody'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'

import { PurchaseTokensForm } from './components/PurchaseTokensForm'
import { HeaderControl } from './components/HeaderControl'
import { SelfBidList } from './components/SelfBidList'
import { TokenFooter } from './components/TokenFooter'
import { HeaderItem } from './components/HeaderItem'
import { SaleHeader } from './components/SaleHeader'

// Layouts
import { Center } from 'src/layouts/Center'

// Mesa Utils
import { isSaleClosed, isSaleOpen, isSaleUpcoming } from 'src/mesa/sale'
import { timeEnd, secondsTohms } from 'src/views/Sale/components/Timer'
import { formatBigInt } from 'src/utils/Defaults'

// Views
import { NotFoundView } from 'src/views/NotFound'
// Interfaces
import { FixedPriceSalePurchase } from 'src/interfaces/Sale'
import { FIX_LATER } from 'src/interfaces'

//bids
import { useBids } from 'src/hooks/useBids'

const FixedFormMax = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#7B7F93',
})

export interface FixedPriceSaleViewParams {
  saleId: string
}

export function FixedPriceSaleView() {
  const { isMobile } = useWindowSize()
  const [showGraph, setShowGraph] = useState<boolean>(false)
  const params = useParams<FixedPriceSaleViewParams>()
  const { error, loading, sale } = useFixedPriceSaleQuery(params.saleId)
  const [t] = useTranslation()
  const theme = useTheme()
  const { bids, totalBids } = useBids(params.saleId)

  console.log(bids)
  const toggleGraph = () => {
    if (showGraph || (sale && bids && bids.length > 0)) {
      setShowGraph(!showGraph)
    }
  }

  if (loading) {
    return <Center>loading</Center>
  }

  if (error) {
    return (
      <Center>
        <ErrorMesssage error={error} />
      </Center>
    )
  }

  if (!sale) {
    return <NotFoundView />
  }

  return (
    <Container minHeight="100%" inner={false} noPadding={true}>
      <Header />
      <Container noPadding>
        {!isMobile && <BackButton />}
        <SaleHeader sale={sale as any} />
        <Flex flexDirection="row" justifyContent="space-between">
          <Flex flexDirection="column" flex={1}>
            <Card border="none" marginX={isMobile ? '8px' : '0'}>
              <CardBody
                display="flex"
                borderBottom="1px dashed #DDDDE3"
                padding={isMobile ? '16px 16px 0 16px' : theme.space[4]}
              >
                {isMobile ? (
                  <Flex flexDirection="column" flex={1}>
                    <HeaderItem
                      isMobile
                      title="Price"
                      description={`${formatBigInt(sale.tokenPrice, sale.tokenOut.decimals).toFixed(2)} DAI/${
                        sale.tokenOut?.symbol
                      }`}
                    />
                    <HeaderItem
                      isMobile
                      title={isSaleClosed(sale as FIX_LATER) ? 'Amount Sold' : 'Min. - Max. Allocation'}
                      description={`${numeral(formatBigInt(sale.allocationMin, sale.tokenOut.decimals)).format(
                        '0,0'
                      )} - ${numeral(formatBigInt(sale.allocationMax, sale.tokenOut.decimals)).format('0,0')} ${
                        sale.tokenOut?.symbol
                      }`}
                    />
                    {isSaleClosed(sale as FIX_LATER) && (
                      <HeaderItem isMobile title="Closed On" description={timeEnd(sale.endDate)} textAlign="right" />
                    )}
                    {isSaleUpcoming(sale as FIX_LATER) && (
                      <HeaderItem isMobile title="Starts On" description={timeEnd(sale.startDate)} textAlign="right" />
                    )}
                    {isSaleOpen(sale as FIX_LATER) && (
                      <HeaderItem
                        isMobile
                        title="Ends In"
                        description={secondsTohms(sale.endDate)}
                        textAlign="right"
                        saleLive={true}
                        sale={sale as FIX_LATER}
                      />
                    )}
                  </Flex>
                ) : (
                  <Flex flexDirection="row" alignItems="center" flex={1}>
                    <HeaderItem
                      title="Price"
                      description={`${formatBigInt(sale.tokenPrice, sale.tokenOut.decimals).toFixed(2)} DAI/${
                        sale.tokenOut?.symbol
                      }`}
                    />
                    <HeaderItem
                      title={isSaleClosed(sale as FIX_LATER) ? 'Amount Sold' : 'Min. - Max. Allocation'}
                      description={`${numeral(formatBigInt(sale.allocationMin)).format('0,0')} - ${numeral(
                        formatBigInt(sale.allocationMax)
                      ).format('0,0')} ${sale.tokenOut?.symbol}`}
                      flexAmount={1.5}
                    />
                    {(isSaleClosed(sale as FIX_LATER) || isSaleUpcoming(sale as FIX_LATER)) && <Flex flex={0.2} />}
                    {isSaleClosed(sale as FIX_LATER) && (
                      <HeaderItem title="Closed On" description={timeEnd(sale.endDate)} textAlign="right" />
                    )}
                    {isSaleUpcoming(sale as FIX_LATER) && (
                      <HeaderItem title="Starts On" description={timeEnd(sale.startDate)} textAlign="right" />
                    )}
                    {isSaleOpen(sale as FIX_LATER) && (
                      <HeaderItem
                        title="Ends In"
                        description={secondsTohms(sale.endDate)}
                        textAlign="right"
                        saleLive={true}
                        sale={sale as FIX_LATER}
                        flexAmount={1.3}
                      />
                    )}
                  </Flex>
                )}
              </CardBody>
              {isSaleOpen(sale as FIX_LATER) && totalBids && totalBids.length > 0 && (
                <CardBody display="flex" padding={isMobile ? '16px' : theme.space[4]} border="none">
                  <HeaderControl
                    sale={sale as FIX_LATER}
                    showGraph={showGraph}
                    toggleGraph={toggleGraph}
                    isFixed={true}
                    bids={totalBids}
                  />
                </CardBody>
              )}
              {isSaleClosed(sale as FIX_LATER) && (
                <CardBody display="flex" padding={isMobile ? '16px' : theme.space[4]} border="none">
                  <HeaderControl
                    sale={sale as FIX_LATER}
                    showGraph={showGraph}
                    toggleGraph={toggleGraph}
                    isFixed={true}
                    status={isSaleClosed(sale as FIX_LATER) ? 'closed' : 'active'}
                    bids={totalBids}
                  />
                </CardBody>
              )}
            </Card>
            {bids && bids.length > 0 && (
              <Card mt={theme.space[4]} marginX={isMobile ? '8px' : ''} border="none">
                <CardBody
                  display="flex"
                  padding={isMobile ? '16px' : theme.space[4]}
                  border="none"
                  flexDirection="row"
                  alignItems="center"
                >
                  <CardTitle fontSize="16px" lineHeight="19px" color="#000629" fontWeight="500">
                    {t('texts.yourActivity')}
                  </CardTitle>
                  <Flex flex={1} />
                  {isSaleClosed(sale as FIX_LATER) && !isMobile && (
                    <>
                      <FormButton
                        disabled={false}
                        type="button"
                        height="40px"
                        fontWeight="500"
                        padding="0 16px"
                        fontSize="14px"
                        lineHeight="21px"
                        background="#304FFE"
                        color="#fff"
                        mr="16px"
                      >
                        Claim Tokens
                      </FormButton>
                      <FormButton
                        disabled={false}
                        type="button"
                        height="40px"
                        fontWeight="500"
                        padding="0 16px"
                        fontSize="14px"
                        lineHeight="21px"
                        background="#7B7F93"
                        color="#fff"
                      >
                        Withdraw Failed Bids
                      </FormButton>
                    </>
                  )}
                </CardBody>
                <SelfBidList sale={sale as FIX_LATER} isFixed={true} bids={bids as any} />
              </Card>
            )}
            <TokenFooter sale={sale as FIX_LATER} />
          </Flex>
          {!isMobile && isSaleOpen(sale as FIX_LATER) && (
            <Flex flexDirection="column" width="377px" marginLeft="24px">
              <Card border="none">
                <CardBody display="flex" borderBottom="1px dashed #DDDDE3" padding={theme.space[4]}>
                  <Flex flexDirection="row" alignItems="center" flex={1} justifyContent="space-between">
                    <HeaderItem title={`Buy ${sale.tokenOut?.symbol}`} description="" color="#000629" />
                    <FixedFormMax>{`Max. 3,500 ${sale.tokenOut?.symbol}`}</FixedFormMax>
                  </Flex>
                </CardBody>
                <CardBody display="flex" padding={theme.space[4]}>
                  <PurchaseTokensForm saleId={sale.id} />
                </CardBody>
              </Card>
            </Flex>
          )}
        </Flex>
      </Container>
      {!isMobile && <Footer />}
      {isMobile && <MobileFooter />}
    </Container>
  )
}
