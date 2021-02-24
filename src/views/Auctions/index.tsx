// External
import styled, { useTheme } from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import WalletConnector from 'cryptowalletconnector'

// Mesa Utils
import { isAuctionClosed, isAuctionOpen, isAuctionUpcoming } from 'src/mesa/auction'

// Hooks
import { useAuctions } from 'src/hooks/useAuctions'

// Redux Actions
import { setPageTitle } from 'src/redux/page'

// Layouts
import { Center } from 'src/layouts/Center'

// Components
import { AuctionSummaryCard } from './components/AuctionSummaryCard'
import { Container } from 'src/components/Container'
import { Button } from 'src/components/Button'
import { Flex } from 'src/components/Flex'

const AuctionSummaryWrapper = styled(NavLink)(props => ({
  /**
   * @todo change this to conform to card layout
   */
  display: 'block',
  marginBottom: props.theme.space[3],
}))

const AuctionListSection = styled.div(props => ({
  marginBottom: props.theme.space[4],
  display:'grid',
  maxWidth: '1200px',
  justifyContent:'center',
  gridTemplateColumns: '500px 500px'
  
}))

const Badge = styled.span(props => ({
  border: `1px solid ${props.theme.black}`,
  padding: '6px 12px',
  borderRadius: 32,
}))

const ConnectButton = styled.button`
  font-size: 12px;
  align-items: center;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: flex;
  line-height: 16px;
  font-weight: 400;
  height: 40px;
  justify-content: center;
  letter-spacing: 0.2px;
  outline: none;
  padding: 12px 17px;
  pointer-events: 'none';
  text-align: center;
  transition: all 0.15s ease-out;
  user-select: none;
  white-space: nowrap;
  font-family: Roboto;
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: rgb(92, 107, 192);
  border-color: rgb(92, 107, 192);
  color: rgb(255, 255, 255);

  @media (min-width: 800px) {
    font-size: 14px;
  }
`

export function AuctionsView() {
  const theme = useTheme()
  const [showClosedAuctions, setShowClosedAuctions] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [connectModal, setModalVisible] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { auctions } = useAuctions()
  const [t] = useTranslation()

  useEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.home')))

    if (auctions.length) {
      setLoading(false)
    }
  }, [auctions, t, dispatch])

  if (loading) {
    return <Center minHeight="100%">LOADING</Center>
  }

  return (
    <Center minHeight="100%" py={theme.space[4]}>
      <Container>
        <Flex mb={20} justifyContent="center">
          <Badge>{t('texts.active')}</Badge>
        </Flex>
        <AuctionListSection>
          {auctions
            .filter(auction => isAuctionOpen(auction))
            .map(auction => (
              <AuctionSummaryWrapper to={`/auctions/${auction.id}`} key={auction.id}>
                <AuctionSummaryCard auction={auction} />
              </AuctionSummaryWrapper>
            ))}
        </AuctionListSection>
        <Flex mb={20} justifyContent="center">
          <Badge>{t('texts.upcoming')}</Badge>
        </Flex>
        <AuctionListSection>
          {auctions
            .filter(auction => isAuctionUpcoming(auction))
            .map(auction => (
              <AuctionSummaryWrapper to={`/auctions/${auction.id}`} key={auction.id}>
                <AuctionSummaryCard auction={auction} />
              </AuctionSummaryWrapper>
            ))}
        </AuctionListSection>
        <Flex mb={20} justifyContent="center">
          <Button rounded onClick={() => setShowClosedAuctions(prevState => !prevState)}>
            {showClosedAuctions ? t('buttons.hideClosedAuctions') : t('buttons.showClosedAuctions')}
          </Button>
        </Flex>
        <AuctionListSection>
          {showClosedAuctions &&
            auctions
              .filter(auction => isAuctionClosed(auction))
              .map(auction => (
                <AuctionSummaryWrapper to={`/auctions/${auction.id}`} key={auction.id}>
                  <AuctionSummaryCard auction={auction} />
                </AuctionSummaryWrapper>
              ))}
        </AuctionListSection>
      </Container>
      <WalletConnector isOpen={connectModal} onClose={() => setModalVisible(false)}></WalletConnector>
      <ConnectButton disabled={connectModal} onClick={() => setModalVisible(true)}>
        {connectModal ? 'Connecting...' : 'Connect'}
      </ConnectButton>
    </Center>
  )
}
