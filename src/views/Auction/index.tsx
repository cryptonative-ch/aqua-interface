// External
import React, { useEffect, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'
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
import { BackComponent } from './components/BackComponent'
import { AuctionHeader } from './components/AuctionHeader'
import { PlaceBidForm } from './components/PlaceBidForm'
import { Container } from 'src/components/Container'
import { CardTitle } from 'src/components/CardTitle'
import { CardBody } from 'src/components/CardBody'
import { BidList } from './components/BidList'
import { Graph } from './components/Graph'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'
import { Timer } from './components/Timer'
// Svg
import MetamaskImage from 'src/assets/svg/metamask.svg'
import WalletImage from 'src/assets/svg/wallet_connect.svg'

// Mesa Utils
import { calculateClearingPrice } from 'src/mesa/price'

// Views
import { NotFoundView } from 'src/views/NotFound'

const FlexGroupColumns = styled(Flex)(props => ({
  gap: props.theme.space[4],
  '& > *': {
    flex: 1,
  },
}))

interface AuctionViewParams {
  auctionId: string
}

export function AuctionView() {
  const [connectModal, setModalVisible] = useState<boolean>(false)
  const ref = useRef<HTMLElement>()
  const { width: containerWidth } = useElementWidth(ref)

  const params = useParams<AuctionViewParams>()
  const { auction } = useAuction(params.auctionId)
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const theme = useTheme()

  const toggleModal = () => {
    setModalVisible(true)
  }

  useEffect(() => {
    dispatch(setPageTitle(t(auction?.tokenName as string)))
  }, [auction, t, dispatch])

  if (!auction) {
    return <NotFoundView />
  }

  return (
    <Container minHeight="100%" inner={false} noPadding={true} >
      <Header connectWallet={toggleModal} isConnecting={connectModal}></Header>
      <Container>
        <BackComponent />
        <AuctionHeader />
        <Card mb={theme.space[4]}>
          <CardBody>
            <Flex flexDirection="row" justifyContent="space-between">
              <strong>
                {numeral(calculateClearingPrice(auction.bids)).format('0,0')} {auction.tokenSymbol} / DAI
              </strong>
              <Timer auction={auction} />
            </Flex>
          </CardBody>
          <CardBody
            ref={e => {
              if (e) {
                ref.current = e
              }
            }}
          >
            <Graph bids={auction.bids} height={400} width={containerWidth} userAddress="0x" />
          </CardBody>
        </Card>
        <FlexGroupColumns>
          <Card mb={theme.space[4]}>
            <CardBody>
              <CardTitle>{t('texts.placeBid')}</CardTitle>
            </CardBody>
            <CardBody>
              <PlaceBidForm
                onSubmit={() => {
                  console.log('Add to Auction')
                }}
                auction={auction}
                currentSettlementPrice={numeral(calculateClearingPrice(auction.bids)).value()}
              />
            </CardBody>
          </Card>
          <Card mb={theme.space[4]}>
            <CardBody>
              <CardTitle>{t('texts.bids')}</CardTitle>
            </CardBody>
            <CardBody>
              <BidList
                bids={auction.bids}
                baseTokenSymbol="DAI"
                quotetokenSmybol={auction.tokenSymbol}
                fullWidth={false}
                currentSettlementPrice={numeral(calculateClearingPrice(auction.bids)).value()}
              />
            </CardBody>
          </Card>
        </FlexGroupColumns>
        <Card mb={theme.space[4]}>
          <CardBody>
            <CardTitle>{t('texts.yourBids')}</CardTitle>
          </CardBody>
        </Card>
      </Container>
      <WalletConnector isOpen={connectModal} onClose={() => setModalVisible(false)} metamaskImage={MetamaskImage} walletImage={WalletImage}></WalletConnector>
      <Footer />
    </Container>
  )
}
