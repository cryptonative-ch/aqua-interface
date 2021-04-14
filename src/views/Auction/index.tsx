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
import { AuctionHeader } from './components/AuctionHeader'
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
import { isAuctionClosed, isAuctionOpen, isAuctionUpcoming } from 'src/mesa/auction'
import { convertTimestampWithMoment, calculateTimeDifference } from 'src/utils/date'

// Wallet Utils
import { getRandomWallet } from 'src/utils/wallets'

// Views
import { NotFoundView } from 'src/views/NotFound'

// Interfaces
import { AuctionBid, Auction } from 'src/interfaces/Auction'

//redux
import { RootState } from 'src/redux/store'
import { fetchAuctionBids } from 'src/redux/bidData'
import { ENDPOINT, subgraphCall } from 'src/subgraph'
import { auctionBidsQuery } from 'src/subgraph/AuctionBids'

//subgraph
import { auctionsRequest } from 'src/subgraph/Auctions'
import { fetchAuctions } from 'src/redux/auctionListings'
import { utils } from 'ethers'

const ChartDescription = styled.div({
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '21px',
  color: '#7B7F93',
  margin: '0 16px 16px',
})

interface AuctionViewParams {
  auctionId: string
}

export function AuctionView() {
  const wallet = useWallet()
  const { isMobile } = useWindowSize()

  const walletAddress = wallet.account ? `${wallet.account.substr(0, 6)}...${wallet.account.substr(-4)}` : ''
  const [connectModal, setModalVisible] = useState<boolean>(false)
  const [showGraph, setShowGraph] = useState<boolean>(false)
  const [userAddress, setUserAddress] = useState<string>('')
  const [clearingPrice, setClearingPrice] = useState<AuctionBid>()
  const ref = useRef<HTMLElement>()
  const { width: containerWidth, setWidth } = useElementWidth(ref)

  const params = useParams<AuctionViewParams>()
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const theme = useTheme()

  const fetchData = () => dispatch(fetchAuctions(auctionsRequest))

  const auction = useSelector<RootState, Auction>(state => {
    const auctions = state.AuctionReducer.auctions.filter(auction => auction.id == params.auctionId)[0]
    return auctions
  })

  const toggleModal = () => {
    setModalVisible(true)
  }

  const bids = useSelector<RootState, AuctionBid[]>(state => {
    return state.BidReducer.bids
  })

  useEffect(() => {
    if (!userAddress) {
      setUserAddress(walletAddress || getRandomWallet().address)
    }

    dispatch(setPageTitle(t(auction?.name as string)))

    if (auction) {
      const auctionBidsRequest = subgraphCall(ENDPOINT, auctionBidsQuery(params.auctionId, auction.type))
      const fetchBids = () => dispatch(fetchAuctionBids(params.auctionId, auction.type, auctionBidsRequest))
      fetchBids()
    }

    if (bids.length) {
      setClearingPrice(calculateClearingPrice(bids))
    }
  }, [])

  const toggleGraph = () => {
    if (showGraph || (auction && bids && bids.length > 0)) {
      setShowGraph(!showGraph)
    }
  }

  if (!auction) {
    fetchData()
    if (!auction) {
      return <NotFoundView />
    }
  }

  return (
    <Container minHeight="100%" inner={false} noPadding={true}>
      <Header connectWallet={toggleModal} isConnecting={connectModal}></Header>
      <Container noPadding>
        {!isMobile && <BackButton />}
        <AuctionHeader auction={auction} />
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
                      title={
                        isAuctionUpcoming(auction)
                          ? 'Min. Price'
                          : isAuctionOpen(auction)
                          ? 'Current Price'
                          : 'Final Price'
                      } // toFixed(2)
                      description={
                        clearingPrice
                          ? `${(1 / (Number(utils.formatEther(clearingPrice.tokenIn)) || 0)).toFixed(2)} 
                      ${auction.tokenIn?.symbol}/${auction.tokenOut?.symbol}`
                          : `0 ${auction.tokenIn?.symbol}/${auction.tokenOut?.symbol}`
                      }
                    />
                    <HeaderItem
                      isMobile
                      title={isAuctionClosed(auction) ? 'Amount Sold' : 'Amount for Sale'}
                      description={`${numeral(auction.tokenAmount).format('0,0')} ${auction.tokenOut?.symbol}`}
                    />
                    {isAuctionClosed(auction) && (
                      <HeaderItem
                        isMobile
                        title="Closed On"
                        description={convertTimestampWithMoment(auction.endDate)}
                        textAlign="right"
                      />
                    )}
                    {isAuctionUpcoming(auction) && (
                      <HeaderItem
                        isMobile
                        title="Starts On"
                        description={convertTimestampWithMoment(auction.startDate)}
                        textAlign="right"
                      />
                    )}
                    {isAuctionOpen(auction) && (
                      <HeaderItem
                        isMobile
                        title="Ends In"
                        description={calculateTimeDifference(auction.endDate)}
                        textAlign="right"
                        auctionLive={true}
                        auction={auction}
                      />
                    )}
                  </Flex>
                ) : (
                  <Flex flexDirection="row" alignItems="center" flex={1}>
                    <HeaderItem
                      title={
                        isAuctionUpcoming(auction)
                          ? 'Min. Price'
                          : isAuctionOpen(auction)
                          ? 'Current Price'
                          : 'Final Price'
                      }
                      description={
                        clearingPrice
                          ? `${(1 / (Number(utils.formatEther(clearingPrice.tokenIn)) || 0)).toFixed(2)} 
                      ${auction.tokenIn?.symbol}/${auction.tokenOut?.symbol}`
                          : `0 ${auction.tokenIn?.symbol}/${auction.tokenOut?.symbol}`
                      }
                    />
                    <HeaderItem
                      title={isAuctionClosed(auction) ? 'Amount Sold' : 'Amount for Sale'}
                      description={`${numeral(auction.tokenAmount).format('0,0')} ${auction.tokenOut?.symbol}`}
                    />
                    {(isAuctionClosed(auction) || isAuctionUpcoming(auction)) && <Flex flex={0.2} />}
                    {isAuctionClosed(auction) && (
                      <HeaderItem
                        title="Closed On"
                        description={convertTimestampWithMoment(auction.endDate)}
                        textAlign="right"
                      />
                    )}
                    {isAuctionUpcoming(auction) && (
                      <HeaderItem
                        title="Starts On"
                        description={convertTimestampWithMoment(auction.startDate)}
                        textAlign="right"
                      />
                    )}
                    {isAuctionOpen(auction) && (
                      <HeaderItem
                        title="Ends In"
                        description={calculateTimeDifference(auction.endDate)}
                        textAlign="right"
                        auctionLive={true}
                        auction={auction}
                        flexAmount={1.3}
                      />
                    )}
                  </Flex>
                )}
              </CardBody>
              {isAuctionOpen(auction) && bids && bids.length > 0 && (
                <CardBody display="flex" padding={isMobile ? '16px' : theme.space[4]} border="none">
                  <HeaderControl showGraph={showGraph} toggleGraph={toggleGraph} />
                </CardBody>
              )}
              {isAuctionClosed(auction) && (!bids || bids.length === 0) && (
                <CardBody display="flex" padding={isMobile ? '16px' : theme.space[4]} border="none">
                  <HeaderControl
                    showGraph={showGraph}
                    toggleGraph={toggleGraph}
                    status={isAuctionClosed(auction) ? 'closed' : 'active'}
                  />
                </CardBody>
              )}
              {isMobile && showGraph && (
                <ChartDescription>
                  This can be a concise explanation on how the point dutch auction works and how the Current Price is
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
                    vsp={clearingPrice ? Number(utils.formatEther(clearingPrice.tokenIn)) : 0}
                    auction={auction}
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
                  {isAuctionClosed(auction) && !isMobile && (
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
                <SelfBidList auction={auction} clearingPrice={clearingPrice} bids={bids} />
              </Card>
            )}
            <TokenFooter auction={auction} />
          </Flex>
          {isAuctionOpen(auction) && !isMobile && bids.length && (
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
                      console.log('Add to Auction')
                    }}
                    auction={auction}
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
