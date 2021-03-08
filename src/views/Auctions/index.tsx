// External
import styled from 'styled-components'
import React, { useEffect, useState, createContext } from 'react'
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

// interface
import { isAuctionOpen, isAuctionClosed, isAuctionUpcoming } from 'src/mesa/auction'

const AuctionSummaryWrapper = styled(NavLink)`
  display: 'block'
`



const AuctionListSection = styled.div(({
  margin: '0px',
  display: 'grid',
  maxWidth: '1000px',
  gridTemplateColumns: '478px 478px',
  gap: '24px 24px',
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
export enum AuctionStatus {
  LIVE = 'Live',
  UPCOMING = 'upcoming',
  CLOSED = 'closed',
}

export type AuctionContextType = {
  AuctionShow: AuctionStatus
  setAuctionShow: (value: AuctionStatus) => void
}

export const AuctionContext = createContext<AuctionContextType>({} as AuctionContextType)

export function AuctionsView() {
  const [loading, setLoading] = useState<boolean>(true)
  const [connectModal, setModalVisible] = useState<boolean>(false)
  const [AuctionShow, setAuctionShow] = useState<AuctionStatus>(AuctionStatus.LIVE)
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
    <AuctionContext.Provider value={{ AuctionShow, setAuctionShow }}>
      <Container minHeight="200%" inner={false} noPadding={true} position="absolute">
        <Header connectWallet={toggleModal} isConnecting={connectModal} />
        <Container>
          <Title>Token Sales</Title>
          <AuctionNavBar />
          <AuctionListSection>
            {AuctionShow === AuctionStatus.UPCOMING
              ? auctions
                  .filter(auction => isAuctionUpcoming(auction))
                  .map(auction => (
                    <AuctionSummaryWrapper to={`/auctions/${auction.id}`} key={auction.id}>
                      <AuctionSummaryCard auction={auction} />
                    </AuctionSummaryWrapper>
                  ))
              : AuctionShow === AuctionStatus.CLOSED
              ? auctions
                  .filter(auction => isAuctionClosed(auction))
                  .map(auction => (
                    <AuctionSummaryWrapper to={`/auctions/${auction.id}`} key={auction.id}>
                      <AuctionSummaryCard auction={auction} />
                    </AuctionSummaryWrapper>
                  ))
              : auctions
                  .filter(auction => isAuctionOpen(auction))
                  .map(auction => (
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
    </AuctionContext.Provider>
  )
}
