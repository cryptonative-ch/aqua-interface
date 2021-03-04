// External
import styled, { useTheme } from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'

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
import { AuctionNavBar } from './components/AuctionNavBar'

const AuctionSummaryWrapper = styled(NavLink)(props => ({
  display: 'block',
  marginBottom: props.theme.space[3],
}))

const AuctionListSection = styled.div(props => ({
  position:'relative',
  marginBottom: props.theme.space[4],
  display: 'grid',
  maxWidth: '1200px',
  justifyContent: 'center',
  gridTemplateColumns: '500px 500px',
}))

/**
 * @todo replace this with redesign from bert, (new component)
 */
const Badge = styled.span(props => ({
  border: `1px solid ${props.theme.black}`,
  padding: '6px 12px',
  borderRadius: 32,
}))

const Title = styled.p`
  position: relative;
  margin-bottom: 32px;
  height: 44px;
  width: 210px;
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 44px;
  letter-spacing: 0em;
  color: #000629;
`



export function AuctionsView() {
  const theme = useTheme()
  const [showClosedAuctions, setShowClosedAuctions] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const { auctions } = useAuctions()
  const [t] = useTranslation()
  const [time, setTime] = useState(0)
  const [showAuction, setShowAuction] = useState(false)

  useEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.home')))

    if (auctions.length) {
      setLoading(false)
    }
    const interval = setInterval(() => setTime(PrevTime => PrevTime + 1), 1000)

    
    return () => {
      clearInterval(interval)
    }
  }, [auctions, t, dispatch, showClosedAuctions, time])

  if (loading) {
    return <Center minHeight="100%">LOADING</Center>
  }

  return (
    <Center minHeight="100%" py={theme.space[4]}>
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

        {/* <Flex mb={20} justifyContent="center">
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
        </AuctionListSection> */}
      </Container>
    </Center>
  )
}
