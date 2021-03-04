// External
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import WalletConnector from 'cryptowalletconnector'

// Hooks
import { useAuctions } from 'src/hooks/useAuctions'

// Redux Actions
import { setPageTitle } from 'src/redux/page'

// Layouts
import { Center } from 'src/layouts/Center'

// Components
import { AuctionSummaryCard } from './components/AuctionSummaryCard'
import { Container } from 'src/components/Container'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'

import { AuctionNavBar } from './components/AuctionNavBar'

// Svg
import MetamaskImage from 'src/assets/svg/metamask.svg'
import WalletImage from 'src/assets/svg/wallet_connect.svg'

const AuctionSummaryWrapper = styled(NavLink)(props => ({
  display: 'block',
  marginBottom: props.theme.space[3],
}))

const AuctionListSection = styled.div(props => ({
  marginBottom: props.theme.space[4],
  display: 'grid',
  maxWidth: '1000px',
  margin: 'auto',
  gridTemplateColumns: '500px 500px',
}))

const Title = styled.p`
height: 44px;
width: 210px;
font-family: Inter;
font-size: 36px;
font-style: normal;
font-weight: 600;
line-height: 44px;
letter-spacing: 0em;
text-align: left;
color: #000629;
margin-bottom: 32px;
`





export function AuctionsView() {
  const [loading, setLoading] = useState<boolean>(true)
  const [connectModal, setModalVisible] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { auctions } = useAuctions()
  const [t] = useTranslation()
  const [time, setTime] = useState(0)

  const toggleModal = () => {
    setModalVisible(true)
  }

  useEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.home')))

    if (auctions.length) {
      setLoading(false)
    }
    const interval = setInterval(() => setTime(PrevTime => PrevTime + 1), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [auctions, t, dispatch, time])

  if (loading) {
    return <Center minHeight="100%">LOADING</Center>
  }

  return (
    <Container minHeight="200%" inner={false} noPadding={true} position="absolute">
      <Header connectWallet={toggleModal} isConnecting={connectModal}></Header>
      <Container>
        <Title>Token Sales</Title>
        <AuctionNavBar />
        <AuctionListSection>
          {auctions.map(auction => (
            <AuctionSummaryWrapper to={`/auctions/${auction.id}`} key={auction.id}>
              <AuctionSummaryCard auction={auction} />
            </AuctionSummaryWrapper>
          ))}
        </AuctionListSection>
      </Container>
      <WalletConnector
        isOpen={connectModal}
        onClose={() => setModalVisible(false)}
        metamaskImage={MetamaskImage}
        walletImage={WalletImage}
      ></WalletConnector>
      <Footer />
    </Container>
  )
}
