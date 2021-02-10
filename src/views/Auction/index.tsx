// External
import React, { useEffect, useRef } from 'react'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import numeral from 'numeral'

// Hooks
import { useElementWidth } from 'src/hooks/useElementWidth'
import { useAuction } from 'src/hooks/useAuction'

// Actions
import { setPageTitle } from 'src/redux/page'

// Components
import { PlaceBidForm } from './components/PlaceBidForm'
import { Container } from 'src/components/Container'
import { CardTitle } from 'src/components/CardTitle'
import { CardBody } from 'src/components/CardBody'
import { BidList } from './components/BidList'
import { Header } from './components/Header'
import { Graph } from './components/Graph'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'
import { Timer } from './components/Timer'

// Layouts
import { Center } from 'src/layouts/Center'

// Mesa Utils
import { calculateClearingPrice } from 'src/mesa/price'

// Views
import { NotFoundView } from 'src/views/NotFound'

interface AuctionViewParams {
  auctionId: string
}

export function AuctionView() {
  const ref = useRef<HTMLElement>()
  const containerWidth = useElementWidth(ref)

  const params = useParams<AuctionViewParams>()
  const {auction} = useAuction(params.auctionId)
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const theme = useTheme()

  useEffect(() => {
    dispatch(setPageTitle(t(auction?.tokenName as string)))
  }, [auction, t, dispatch])

  if (!auction) {
    return <NotFoundView />
  }

  return (
    <Center minHeight="100%">
      <Container>
        <Header title={auction.tokenName} />
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
                CurrentSettlementPrice={numeral(calculateClearingPrice(auction.bids)).value()}
              />
            </CardBody>
          </Card>
          <Card mb={theme.space[4]}>
            <CardBody>
              <CardTitle>{t('texts.bids')}</CardTitle>
            </CardBody>
            <CardBody>
              <BidList baseTokenSymbol="DAI" quotetokenSmybol={auction.tokenSymbol} bids={auction.bids} />
            </CardBody>
          </Card>
        </FlexGroupColumns>
        <Card mb={theme.space[4]}>
          <CardBody>
            <CardTitle>{t('texts.yourBids')}</CardTitle>
          </CardBody>
        </Card>
      </Container>
    </Center>
  )
}

const FlexGroupColumns = styled(Flex)(props => ({
  gap: props.theme.space[4],
  '& > *': {
    flex: 1,
  },
}))
