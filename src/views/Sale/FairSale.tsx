/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'
import styled from 'styled-components'
import numeral from 'numeral'

// Hooks
import { useElementWidth } from 'src/hooks/useElementWidth'
import { useWindowSize } from 'src/hooks/useWindowSize'

// Actions

// Components
import { BackButton } from 'src/components/BackButton'
import { FormButton } from 'src/components/FormButton'
import { Container } from 'src/components/Container'
import { CardTitle } from 'src/components/CardTitle'
import { CardBody } from 'src/components/CardBody'
import { Flex } from 'src/components/Flex'
import { Card } from 'src/components/Card'
// View Components
import { HeaderControl } from 'src/views/Sale/components/HeaderControl'
import { PlaceBidForm } from 'src/views/Sale/components/PlaceBidForm'
// import { SelfBidList } from 'src/views/Sale/components/SelfBidList'
import { TokenFooter } from 'src/views/Sale/components/TokenFooter'
import { HeaderItem } from 'src/views/Sale/components/HeaderItem'
import { SaleHeader } from 'src/views/Sale/components/SaleHeader'
import { BarChart } from 'src/views/Sale/components/BarChart'
import { Center } from 'src/layouts/Center'
import { ErrorMessage } from 'src/components/ErrorMessage'

// Aqua Utils
import { isSaleClosed, isSaleOpen, isSaleUpcoming } from 'src/aqua/sale'
import { timeEnd } from 'src/views/Sale/components/Timer'
import { formatBigInt } from 'src/utils'

// Views
import { NotFoundView } from 'src/views/NotFound'

// Interfaces
import { FairBidPick, SaleDetails } from 'src/interfaces/Sale'
import { FIX_LATER } from 'src/interfaces'

// Hooks
import { useFairSaleQuery } from 'src/hooks/useSaleQuery'
import { useBids } from 'src/hooks/useBids'
import { useIpfsFile } from 'src/hooks/useIpfsFile'

const ChartDescription = styled.div({
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '21px',
  color: '#7B7F93',
  margin: '0 16px 16px',
})

interface SaleViewParams {
  saleId: string
}

export function FairSaleView() {
  const { isMobile } = useWindowSize()
  const [showGraph, setShowGraph] = useState<boolean>(true)
  const [userAddress] = useState<string>('')
  const ref = useRef<HTMLElement>()
  const { width: containerWidth, setWidth } = useElementWidth(ref)

  const params = useParams<SaleViewParams>()
  const [t] = useTranslation()
  const theme = useTheme()

  const { error, loading, sale } = useFairSaleQuery(params.saleId)

  const { allBids, clearingPrice, userBids } = useBids(
    params.saleId,
    formatBigInt(sale?.tokensForSale, sale?.tokenOut.decimals)
  )
  
  const saleDetails = useIpfsFile(sale?.launchedTemplate?.metadataContentHash, true) as SaleDetails

  const toggleGraph = () => {
    if (showGraph || (sale && allBids?.length > 0)) {
      setShowGraph(!showGraph)
    }
  }

  if (loading) {
    return <Center minHeight="100vh">loading</Center>
  }

  if (error) {
    return (
      <Center>
        <ErrorMessage error={error} />
      </Center>
    )
  }

  if (!sale) {
    return <NotFoundView />
  }

  return (
    <Container minHeight="100%" inner={false} noPadding={true}>
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
                      title={isSaleUpcoming(sale) ? 'Min. Price' : isSaleOpen(sale) ? 'Current Price' : 'Final Price'}
                      description={`${(
                        1 / (clearingPrice ? formatBigInt(clearingPrice.price, sale.tokenIn.decimals) : 1)
                      ).toFixed(2)} ${sale.tokenIn?.symbol}/${sale.tokenOut?.symbol}`}
                    />
                    <HeaderItem
                      isMobile
                      title={isSaleClosed(sale) ? 'Amount Sold' : 'Amount for Sale'}
                      description={`${numeral(formatBigInt(sale.tokensForSale)).format('0,0')} ${
                        sale.tokenOut?.symbol
                      }`}
                    />
                    {isSaleClosed(sale) && (
                      <HeaderItem isMobile title="Closed On" description={timeEnd(sale.endDate)} textAlign="right" />
                    )}
                    {isSaleUpcoming(sale) && (
                      <HeaderItem isMobile title="Starts On" description={timeEnd(sale.startDate)} textAlign="right" />
                    )}
                    {isSaleOpen(sale) && (
                      <HeaderItem
                        isMobile
                        title="Ends In"
                        description=""
                        textAlign="right"
                        saleLive={true}
                        sale={sale as FIX_LATER}
                      />
                    )}
                  </Flex>
                ) : (
                  <Flex flexDirection="row" alignItems="center" flex={1}>
                    <HeaderItem
                      title={isSaleUpcoming(sale) ? 'Min. Price' : isSaleOpen(sale) ? 'Current Price' : 'Final Price'}
                      description={`${(1 / (clearingPrice ? clearingPrice.price : 1)).toFixed(2)} ${
                        sale.tokenIn?.symbol
                      }/${sale.tokenOut?.symbol}`}
                    />
                    <HeaderItem
                      title={isSaleClosed(sale) ? 'Amount Sold' : 'Amount for Sale'}
                      description={`${numeral(formatBigInt(sale.tokensForSale, sale.tokenOut.decimals)).format(
                        '0,0'
                      )} ${sale.tokenOut?.symbol}`}
                    />
                    {(isSaleClosed(sale) || isSaleUpcoming(sale)) && <Flex flex={0.2} />}
                    {isSaleClosed(sale) && (
                      <HeaderItem title="Closed On" description={timeEnd(sale.endDate)} textAlign="right" />
                    )}
                    {isSaleUpcoming(sale) && (
                      <HeaderItem title="Starts On" description={timeEnd(sale.startDate)} textAlign="right" />
                    )}
                    {isSaleOpen(sale) && (
                      <HeaderItem
                        title="Ends In"
                        description=""
                        textAlign="right"
                        saleLive={true}
                        sale={sale as FIX_LATER}
                        flexAmount={1.3}
                      />
                    )}
                  </Flex>
                )}
              </CardBody>
              {isSaleOpen(sale) && userBids && userBids.length > 0 && (
                <CardBody display="flex" padding={isMobile ? '16px' : theme.space[4]} border="none">
                  <HeaderControl sale={sale as FIX_LATER} showGraph={showGraph} toggleGraph={toggleGraph} />
                </CardBody>
              )}
              {isSaleClosed(sale) && (!userBids || userBids.length === 0) && (
                <CardBody display="flex" padding={isMobile ? '16px' : theme.space[4]} border="none">
                  <HeaderControl
                    sale={sale as FIX_LATER}
                    showGraph={showGraph}
                    toggleGraph={toggleGraph}
                    status={isSaleClosed(sale) ? 'closed' : 'active'}
                  />
                </CardBody>
              )}
              {isMobile && showGraph && (
                <ChartDescription>
                  This can be a concise explanation on how the point dutch sale works and how the Current Price is
                  calculated.
                </ChartDescription>
              )}
              {showGraph && (
                <CardBody
                  display="flex"
                  padding="0 16px 16px"
                  border="none"
                  ref={e => {
                    if (e) {
                      ref.current = e
                      setWidth(e.clientWidth)
                    }
                  }}
                >
                  <BarChart
                    width={containerWidth}
                    height={400}
                    data={allBids}
                    userAddress={userAddress}
                    vsp={clearingPrice ? clearingPrice.price : 0}
                    sale={sale as FIX_LATER}
                  />
                </CardBody>
              )}
            </Card>
            {userBids && userBids.length > 0 && (
              <Card mt={theme.space[4]} marginX={isMobile ? '8px' : ''} border="none">
                <CardBody
                  display="flex"
                  padding={isMobile ? '16px' : theme.space[4]}
                  border="none"
                  flexDirection="row"
                  alignItems="center"
                >
                  <CardTitle fontSize="16px" lineHeight="19px" color="#000629" fontWeight="500">
                    {t('texts.yourBids')}
                  </CardTitle>
                  <Flex flex={1} />
                  {isSaleClosed(sale) && !isMobile && (
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
                {/* <SelfBidList sale={sale as FIX_LATER} clearingPrice={clearingPrice} userBids={userBids as any} /> */}
              </Card>
            )}
            <TokenFooter sale={sale as FIX_LATER} saleDetails={saleDetails} />
          </Flex>
          {isSaleOpen(sale) && !isMobile && (
            <Flex flexDirection="column" width="377px" marginLeft="24px">
              <Card border="none">
                <CardBody display="flex" borderBottom="1px dashed #DDDDE3" padding={theme.space[4]}>
                  <Flex flexDirection="row" alignItems="center" flex={1}>
                    <HeaderItem title="Place a Bid" description="" color="#000629" />
                  </Flex>
                </CardBody>
                <CardBody display="flex" padding={theme.space[4]}>
                  <PlaceBidForm
                    sale={sale as FIX_LATER}
                    currentSettlementPrice={2}
                  />
                </CardBody>
              </Card>
            </Flex>
          )}
        </Flex>
      </Container>
      {/* {isMobile && <MobileFooter />} */}
    </Container>
  )
}
