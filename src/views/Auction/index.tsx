// External
import React, { useEffect, useRef, useState } from 'react'
import { useWallet } from 'use-wallet'
import { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import WalletConnector from 'cryptowalletconnector'
import numeral from 'numeral'

// Hooks
import { useElementWidth } from 'src/hooks/useElementWidth'
import { useAuction } from 'src/hooks/useAuction'

// Actions
import { setPageTitle } from 'src/redux/page'

// Components
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { BackButton } from './components/BackButton'
import { AuctionHeader } from './components/AuctionHeader'
import { PlaceBidForm } from './components/PlaceBidForm'
import { Container } from 'src/components/Container'
import { CardTitle } from 'src/components/CardTitle'
import { CardBody } from 'src/components/CardBody'
import { BarChart } from './components/BarChart'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'
import { HeaderItem } from './components/HeaderItem'
import { HeaderControl } from './components/HeaderControl'
import { SelfBidList } from './components/SelfBidList'
import { TokenFooter } from './components/TokenFooter'
// Svg
import MetamaskImage from 'src/assets/svg/metamask.svg'
import WalletImage from 'src/assets/svg/wallet_connect.svg'

// Mesa Utils
import { calculateClearingPrice } from 'src/mesa/price'

// Wallet Utils
import { getRandomWallet } from 'src/utils/wallets'

// Views
import { NotFoundView } from 'src/views/NotFound'

// Interfaces
import { AuctionBid } from 'src/interfaces/Auction'

interface AuctionViewParams {
  auctionId: string
}

export function AuctionView() {
  const wallet = useWallet()

  const walletAddress = wallet.account ? `${wallet.account.substr(0, 6)}...${wallet.account.substr(-4)}` : ''
  const [connectModal, setModalVisible] = useState<boolean>(false)
  const [showGraph, setShowGraph] = useState<boolean>(false)
  const [userAddress, setUserAddress] = useState<string>('')
  const [clearingPrice, setClearingPrice] = useState<AuctionBid>()
  const ref = useRef<HTMLElement>()
  const { width: containerWidth, setWidth } = useElementWidth(ref)

  const params = useParams<AuctionViewParams>()
  const { auction } = useAuction(params.auctionId)
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const theme = useTheme()

  const toggleModal = () => {
    setModalVisible(true)
  }

  const toggleGraph = () => {
    setShowGraph(!showGraph)
  }

  useEffect(() => {
    if (!userAddress) {
      setUserAddress(walletAddress || getRandomWallet().address)
    }

    //Calculate the virtual
    if (auction) {
      setClearingPrice(calculateClearingPrice(auction.bids))
    }
    dispatch(setPageTitle(t(auction?.tokenName as string)))
  }, [auction, t, dispatch])

  if (!auction) {
    return <NotFoundView />
  }

  return (
    <Container minHeight="100%" inner={false} noPadding={true} >
      <Header connectWallet={toggleModal} isConnecting={connectModal}></Header>
      <Container noPadding>
        <BackButton />
        <AuctionHeader auction={auction} />
        <Flex flexDirection="row" justifyContent="space-between">
          <Flex flexDirection="column" flex={1}>
            <Card mb={theme.space[4]} border="none">
              <CardBody display="flex" borderBottom="1px dashed #DDDDE3" padding={theme.space[4]}>
                <Flex flexDirection="row" alignItems="center" flex={1}>
                  <HeaderItem title="Current Price" description="0.88 DAI/XYZ" />
                  <HeaderItem title="Amount for Sale" description="2,800 XYZ" />
                </Flex>
              </CardBody>
              <CardBody display="flex" padding={theme.space[4]} border="none">
                <HeaderControl showGraph={showGraph} toggleGraph={toggleGraph} />
              </CardBody>
              {showGraph && (
                <CardBody
                  display="flex"
                  padding="8px 24px 24px"
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
                    data={auction.bids}
                    userAddress={userAddress}
                    vsp={(clearingPrice?.sellAmount.toNumber() || 0) / 5}
                  />
                </CardBody>
              )}
            </Card>
            <Card mb={theme.space[4]} border="none">
              <CardBody display="flex" padding={theme.space[4]} border="none">
                <CardTitle fontSize="16px" lineHeight="19px" color="#000629" fontWeight="500">{t('texts.yourBids')}</CardTitle>
              </CardBody>
              <SelfBidList />
            </Card>
            <TokenFooter />
          </Flex>
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
                  currentSettlementPrice={numeral(calculateClearingPrice(auction.bids)).value()}
                />
              </CardBody>
            </Card>
          </Flex>
        </Flex>
      </Container>
      <WalletConnector isOpen={connectModal} onClose={() => setModalVisible(false)} metamaskImage={MetamaskImage} walletImage={WalletImage}></WalletConnector>
      <Footer />
    </Container>
  )
}
