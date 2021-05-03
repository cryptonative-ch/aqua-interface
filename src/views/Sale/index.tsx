/* eslint-disable @typescript-eslint/no-explicit-any */

// External
import React, { useEffect, useRef, useState } from 'react'
import { useWallet } from 'use-wallet'
import { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import WalletConnector from 'cryptowalletconnector'
import numeral from 'numeral'
import styled from 'styled-components'

// Hooks
import { useElementWidth } from 'src/hooks/useElementWidth'
import { useWindowSize } from 'src/hooks/useWindowSize'

// Actions
import { setPageTitle } from 'src/redux/page'

// Components
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { BackButton } from 'src/components/BackButton'
import { SaleHeader } from './components/SaleHeader'
import { PlaceBidForm } from './components/PlaceBidForm'
import { Container } from 'src/components/Container'
import { CardTitle } from 'src/components/CardTitle'
import { CardBody } from 'src/components/CardBody'
import { MobileFooter } from 'src/components/MobileFooter'
import { BarChart } from './components/BarChart'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'
import { FormButton } from 'src/components/FormButton'
import { HeaderItem } from './components/HeaderItem'
import { HeaderControl } from './components/HeaderControl'
import { SelfBidList } from './components/SelfBidList'
import { TokenFooter } from './components/TokenFooter'

// Svg
import MetamaskImage from 'src/assets/svg/metamask.svg'
import WalletImage from 'src/assets/svg/wallet_connect.svg'

// Mesa Utils
import { calculateClearingPrice } from 'src/mesa/price'
import { isSaleClosed, isSaleOpen, isSaleUpcoming } from 'src/mesa/sale'
import { timeFrame, secondsTohms } from 'src/views/Sale/components/Timer'
import { formatBigInt } from 'src/utils/Defaults'

// Wallet Utils
import { getRandomWallet } from 'src/utils/wallets'

// Views
import { NotFoundView } from 'src/views/NotFound'

// Interfaces
import { Sale, FairBidPick } from 'src/interfaces/Sale'

//redux
import { RootState } from 'src/redux/store'
import { fetchSaleBids } from 'src/redux/BidData'
import { ENDPOINT, subgraphCall } from 'src/subgraph'
import { saleBidsQuery } from 'src/subgraph/SaleBids'

//subgraph
import { salesRequest } from 'src/subgraph/Sales'
import { fetchSales } from 'src/redux/SaleListings'

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

export function SaleView() {
  const wallet = useWallet()
  const { isMobile } = useWindowSize()

  const walletAddress = wallet.account ? `${wallet.account.substr(0, 6)}...${wallet.account.substr(-4)}` : ''
  const [connectModal, setModalVisible] = useState<boolean>(false)
  const [showGraph, setShowGraph] = useState<boolean>(false)
  const [userAddress, setUserAddress] = useState<string>('')
  const [clearingPrice, setClearingPrice] = useState<FairBidPick>()
  const ref = useRef<HTMLElement>()
  const { width: containerWidth, setWidth } = useElementWidth(ref)

  const params = useParams<SaleViewParams>()
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const theme = useTheme()

  const fetchData = () => dispatch(fetchSales(salesRequest))

  const sale = useSelector<RootState, Sale>(state => {
    const sales = state.SaleReducer.sales.filter(sale => sale.id == params.saleId)[0]
    return sales
  })

  const bidsBySale = useSelector<RootState, any>(state => {
    return state.bidReducer.bidsBySaleId[params.saleId]
  })

  const bids = bidsBySale ? bidsBySale.bids : []

  const toggleModal = () => {
    setModalVisible(true)
  }

  const toggleGraph = () => {
    if (showGraph || (sale && bids && bids.length > 0)) {
      setShowGraph(!showGraph)
    }
  }

  useEffect(() => {
    if (!userAddress) {
      setUserAddress(walletAddress || getRandomWallet().address)
    }

    dispatch(setPageTitle(t(sale?.name as string)))

    if (sale) {
      const FairSaleBidsRequest = subgraphCall(ENDPOINT, saleBidsQuery(params.saleId, sale.type))
      const fetchBids = () => dispatch(fetchSaleBids(params.saleId, sale.type, FairSaleBidsRequest))
      fetchBids()
      setClearingPrice(calculateClearingPrice(bids))
    }
  }, [t, sale, dispatch])

  if (!sale) {
    fetchData()
    if (!sale) {
      return <NotFoundView />
    }
  }

  return (
    <Container minHeight="100%" inner={false} noPadding={true}>
      <Header connectWallet={toggleModal} isConnecting={connectModal}></Header>
      <Container noPadding>
        {!isMobile && <BackButton />}
        <SaleHeader sale={sale} />
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
                        1 / (clearingPrice ? formatBigInt(clearingPrice.tokenIn, sale.tokenIn.decimals) : 1)
                      ).toFixed(2)} DAI/${sale.tokenOut?.symbol}`}
                    />
                    <HeaderItem
                      isMobile
                      title={isSaleClosed(sale) ? 'Amount Sold' : 'Amount for Sale'}
                      description={`${numeral(formatBigInt(sale.tokenAmount)).format('0,0')} ${sale.tokenOut?.symbol}`}
                    />
                    {isSaleClosed(sale) && (
                      <HeaderItem isMobile title="Closed On" description={timeFrame(sale.endDate)} textAlign="right" />
                    )}
                    {isSaleUpcoming(sale) && (
                      <HeaderItem
                        isMobile
                        title="Starts On"
                        description={timeFrame(sale.startDate)}
                        textAlign="right"
                      />
                    )}
                    {isSaleOpen(sale) && (
                      <HeaderItem
                        isMobile
                        title="Ends In"
                        description={secondsTohms(sale.endDate)}
                        textAlign="right"
                        saleLive={true}
                        sale={sale}
                      />
                    )}
                  </Flex>
                ) : (
                  <Flex flexDirection="row" alignItems="center" flex={1}>
                    <HeaderItem
                      title={isSaleUpcoming(sale) ? 'Min. Price' : isSaleOpen(sale) ? 'Current Price' : 'Final Price'}
                      description={`${(
                        1 / (clearingPrice ? formatBigInt(clearingPrice.tokenIn, sale.tokenIn.decimals) : 1)
                      ).toFixed(2)} DAI/${sale.tokenOut?.symbol}`}
                    />
                    <HeaderItem
                      title={isSaleClosed(sale) ? 'Amount Sold' : 'Amount for Sale'}
                      description={`${numeral(formatBigInt(sale.tokenAmount, sale.tokenOut.decimals)).format('0,0')} ${
                        sale.tokenOut?.symbol
                      }`}
                    />
                    {(isSaleClosed(sale) || isSaleUpcoming(sale)) && <Flex flex={0.2} />}
                    {isSaleClosed(sale) && (
                      <HeaderItem title="Closed On" description={timeFrame(sale.endDate)} textAlign="right" />
                    )}
                    {isSaleUpcoming(sale) && (
                      <HeaderItem title="Starts On" description={timeFrame(sale.startDate)} textAlign="right" />
                    )}
                    {isSaleOpen(sale) && (
                      <HeaderItem
                        title="Ends In"
                        description={secondsTohms(sale.endDate)}
                        textAlign="right"
                        saleLive={true}
                        sale={sale}
                        flexAmount={1.3}
                      />
                    )}
                  </Flex>
                )}
              </CardBody>
              {isSaleOpen(sale) && bids && bids.length > 0 && (
                <CardBody display="flex" padding={isMobile ? '16px' : theme.space[4]} border="none">
                  <HeaderControl sale={sale} showGraph={showGraph} toggleGraph={toggleGraph} />
                </CardBody>
              )}
              {isSaleClosed(sale) && (!bids || bids.length === 0) && (
                <CardBody display="flex" padding={isMobile ? '16px' : theme.space[4]} border="none">
                  <HeaderControl
                    sale={sale}
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
                    data={bids}
                    userAddress={userAddress}
                    vsp={clearingPrice ? 1 / formatBigInt(clearingPrice.tokenIn, sale.tokenIn.decimals) : 0}
                    sale={sale}
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
                <SelfBidList sale={sale} clearingPrice={clearingPrice} bids={bids} />
              </Card>
            )}
            <TokenFooter sale={sale} />
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
                    onSubmit={() => {
                      console.log('Add to Sale')
                    }}
                    sale={sale}
                    currentSettlementPrice={numeral(calculateClearingPrice(bids)).value()}
                  />
                </CardBody>
              </Card>
            </Flex>
          )}
        </Flex>
      </Container>
      <WalletConnector
        isOpen={connectModal}
        onClose={() => setModalVisible(false)}
        metamaskImage={MetamaskImage}
        walletImage={WalletImage}
      ></WalletConnector>
      {!isMobile && <Footer />}
      {isMobile && <MobileFooter />}
    </Container>
  )
}
