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
  display: 'block',
  marginBottom: props.theme.space[3],
}))

const AuctionListSection = styled.div(props => ({
  marginBottom: props.theme.space[4],
}))

const Badge = styled.span(props => ({
  border: `1px solid ${props.theme.black}`,
  padding: '6px 12px',
  borderRadius: 32,
}))

export function AuctionsView() {
  const theme = useTheme()
  const [showClosedAuctions, setShowClosedAuctions] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [connectModal, setModalVisible] = useState<boolean>(false)
  const dispatch = useDispatch()
  const {auctions} = useAuctions()
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
        <AuctionListSection>
          <Flex mb={20} justifyContent="center">
            <Badge>{t('texts.active')}</Badge>
          </Flex>
          {auctions
            .filter(auction => isAuctionOpen(auction))
            .map(auction => (
              <AuctionSummaryWrapper to={`/auctions/${auction.id}`} key={auction.id}>
                <AuctionSummaryCard auction={auction} />
              </AuctionSummaryWrapper>
            ))}
        </AuctionListSection>
        <AuctionListSection>
          <Flex mb={20} justifyContent="center">
            <Badge>{t('texts.upcoming')}</Badge>
          </Flex>
          {auctions
            .filter(auction => isAuctionUpcoming(auction))
            .map(auction => (
              <AuctionSummaryWrapper to={`/auctions/${auction.id}`} key={auction.id}>
                <AuctionSummaryCard auction={auction} />
              </AuctionSummaryWrapper>
            ))}
        </AuctionListSection>
        <AuctionListSection>
          <Flex mb={20} justifyContent="center">
            <Button rounded onClick={() => setShowClosedAuctions(prevState => !prevState)}>
              {showClosedAuctions ? t('buttons.hideClosedAuctions') : t('buttons.showClosedAuctions')}
            </Button>
          </Flex>
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
    </Center>
  )
}
