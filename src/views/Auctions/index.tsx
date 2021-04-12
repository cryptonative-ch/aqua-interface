// External
import styled from 'styled-components'
import React, { useEffect, useState, createContext } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import WalletConnector from 'cryptowalletconnector'

// Redux
import { setPageTitle } from 'src/redux/page'
import { fetchAuctions } from 'src/redux/auctionListings'
import { RootState } from 'src/redux/store'

// Layouts
import { Center } from 'src/layouts/Center'

// Components
import { AuctionSummaryCard } from './components/AuctionSummaryCard'
import { Container } from 'src/components/Container'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { AuctionNavBar } from './components/AuctionNavBar'
import { AbsoluteContainer } from 'src/components/AbsoluteContainer'
import { Card } from 'src/components/CardSale'

// Svg
import MetamaskImage from 'src/assets/svg/metamask.svg'
import WalletImage from 'src/assets/svg/wallet_connect.svg'

// interface
import { isAuctionOpen, isAuctionClosed, isAuctionUpcoming } from 'src/mesa/auction'
import { Auction } from 'src/interfaces/Auction'

//subgraph
import { auctionsRequest } from 'src/subgraph/Auctions'
import { useWindowSize } from 'src/hooks/useWindowSize'

const AuctionSummaryWrapper = styled(NavLink)(Card, {
  display: 'block',
})

const AuctionListSection = styled.div(
  props => ({
    margin: '0',
    display: props.theme.grid.display,
    gridTemplateColumns: props.theme.grid.gridTemplateColumns[0],
    gap: props.theme.grid.gap[0],
  }),
  props => `
    @media (max-width: ${props.theme.breakpoints[2]}) {
      grid-template-columns: ${props.theme.grid.gridTemplateColumns[1]};
      row-gap: ${props.theme.grid.gap[1]};
    })`
)

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
  const { isMobile } = useWindowSize()
  const [connectModal, setModalVisible] = useState<boolean>(false)
  const [AuctionShow, setAuctionShow] = useState<AuctionStatus>(AuctionStatus.LIVE)
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const fetchData = () => dispatch(fetchAuctions(auctionsRequest))

  const auctions = useSelector<RootState, Auction[]>(state => {
    return state.AuctionReducer.auctions
  })
  const loading = useSelector<RootState, boolean>(state => {
    return state.AuctionReducer.isLoading
  })

  const toggleModal = () => {
    setModalVisible(true)
  }

  useEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.home')))
    fetchData()
  }, [t])

  if (loading) {
    return <Center minHeight="100%">LOADING</Center>
  }

  return (
    <AuctionContext.Provider value={{ AuctionShow, setAuctionShow }}>
      <AbsoluteContainer minHeight="200%" inner={false} noPadding={true}>
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
        {!isMobile && <Footer />}
      </AbsoluteContainer>
    </AuctionContext.Provider>
  )
}
