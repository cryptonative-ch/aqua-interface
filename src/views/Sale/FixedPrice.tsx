/* eslint-disable @typescript-eslint/no-explicit-any */

// External
import { useTheme } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useParams } from 'react-router-dom'
import React, { useState } from 'react'
import styled from 'styled-components'
import { utils } from 'ethers'

// Hooks
import { useFixedPriceSaleQuery } from 'src/hooks/useSaleQuery'
import { useWindowSize } from 'src/hooks/useWindowSize'

// Components
import { ErrorMessage } from 'src/components/ErrorMessage'
import { MobileFooter } from 'src/components/MobileFooter'
import { BackButton } from 'src/components/BackButton'
import { Container } from 'src/components/Container'
import { CardBody } from 'src/components/CardBody'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'

import { PurchaseTokensForm } from 'src/views/Sale/components/PurchaseTokensForm'
import { HeaderControl } from 'src/views/Sale/components/HeaderControl'
import { SelfBidList } from 'src/views/Sale/components/SelfBidList'
import { TokenFooter } from 'src/views/Sale/components/TokenFooter'
import { HeaderItem } from 'src/views/Sale/components/HeaderItem'
import { SaleHeader } from 'src/views/Sale/components/SaleHeader'
import { HeaderClaim } from 'src/views/Sale/components/HeaderClaim'

// Layouts
import { Center } from 'src/layouts/Center'

// Mesa Utils
import { isSaleClosed, isSaleOpen, isSaleUpcoming } from 'src/mesa/sale'
import { timeEnd } from 'src/views/Sale/components/Timer'
import { convertToBuyerPrice, formatBigInt } from 'src/utils/Defaults'

// Views
import { NotFoundView } from 'src/views/NotFound'

// Interfaces
import { SaleDetails } from 'src/interfaces/Sale'
import { FIX_LATER } from 'src/interfaces'
import { useIpfsFile } from 'src/hooks/useIpfsFile'
import { SALE_INFO_IPFS_HASH_MOCK } from 'src/constants'

// Hooks
import { useBids, aggregatePurchases } from 'src/hooks/useBids'
import { useTranslation } from 'react-i18next'

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
  const { account } = useWeb3React()
  const [showGraph, setShowGraph] = useState<boolean>(false)
  const params = useParams<FixedPriceSaleViewParams>()
  const { error, loading, sale } = useFixedPriceSaleQuery(params.saleId)
  const theme = useTheme()
  const { bids } = useBids(params.saleId, sale!.__typename)
  const saleDetails = useIpfsFile(SALE_INFO_IPFS_HASH_MOCK, true) as SaleDetails
  const [t] = useTranslation()

  const toggleGraph = () => {
    if (showGraph || (sale && bids && bids.length > 0)) {
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
                      title="Price"
                      description={`${convertToBuyerPrice(
                        formatBigInt(sale.tokenPrice, sale.tokenOut.decimals)
                      ).toFixed(2)} ${sale.tokenIn?.symbol}/${sale.tokenOut?.symbol}`}
                    />
                    <HeaderItem
                      isMobile
                      title={isSaleClosed(sale as FIX_LATER) ? 'Amount Sold' : 'Min. - Max. Allocation'}
                      description={`${formatBigInt(sale.allocationMin, sale.tokenIn.decimals)} - ${formatBigInt(
                        sale.allocationMax,
                        sale.tokenIn.decimals
                      )} ${sale.tokenIn?.symbol}`}
                      tooltip={t('texts.minMaxAllocationInfo')}
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
                      title="Price"
                      description={`${convertToBuyerPrice(
                        formatBigInt(sale.tokenPrice, sale.tokenOut.decimals)
                      ).toFixed(2)} ${sale.tokenIn?.symbol}/${sale.tokenOut?.symbol}`}
                    />
                    {isSaleClosed(sale as FIX_LATER) ? (
                      <HeaderItem
                        title={sale.soldAmount < sale.minimumRaise ? 'Soft Cap not reached' : 'Amount Sold'}
                        description={`${formatBigInt(sale.soldAmount)} ${sale.tokenIn?.symbol}`}
                        error={sale.soldAmount < sale.minimumRaise}
                      />
                    ) : (
                      <HeaderItem
                        title={'Min. - Max. Allocation'}
                        description={`${formatBigInt(sale.allocationMin, sale.tokenIn.decimals)} - ${formatBigInt(
                          sale.allocationMax,
                          sale.tokenIn.decimals
                        )} ${sale.tokenIn?.symbol}`}
                        tooltip={t('texts.minMaxAllocationInfo')}
                      />
                    )}
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
              {isSaleOpen(sale as FIX_LATER) && (
                <CardBody display="flex" padding={isMobile ? '16px' : theme.space[4]} border="none">
                  <HeaderControl
                    sale={sale as FIX_LATER}
                    showGraph={showGraph}
                    toggleGraph={toggleGraph}
                    isFixed={true}
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
                  />
                </CardBody>
              )}
            </Card>
            {bids && bids.length > 0 && (
              <Card mt={theme.space[4]} marginX={isMobile ? '8px' : ''} border="none">
                <HeaderClaim sale={sale as any} />
                <SelfBidList
                  sale={sale as FIX_LATER}
                  isFixed={true}
                  bids={isSaleClosed(sale as FIX_LATER) ? (aggregatePurchases(bids, account) as any) : (bids as any)}
                />
              </Card>
            )}
            <TokenFooter sale={sale as FIX_LATER} saleDetails={saleDetails} />
          </Flex>
          {!isMobile && isSaleOpen(sale as FIX_LATER) && (
            <Flex flexDirection="column" width="377px" marginLeft="24px">
              <Card border="none">
                <CardBody display="flex" borderBottom="1px dashed #DDDDE3" padding={theme.space[4]}>
                  <Flex flexDirection="row" alignItems="center" flex={1} justifyContent="space-between">
                    <HeaderItem title={`Buy ${sale.tokenOut?.symbol}`} description="" color="#000629" />
                    <FixedFormMax>{`Max. ${utils.formatUnits(sale?.allocationMax)} ${
                      sale.tokenIn?.symbol
                    }`}</FixedFormMax>
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
      {isMobile && <MobileFooter />}
    </Container>
  )
}
