// External
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

// Hooks
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
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'

// Layouts
import { Center } from 'src/layouts/Center'

// Mesa Utils
import { calculateClearingPrice } from 'src/mesa/price'
// Views
import { NotFoundView } from '../NotFound'

interface AuctionViewParams {
  auctionId: string
}

export function AuctionView() {
  const params = useParams<AuctionViewParams>()
  const auction = useAuction(params.auctionId)
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const theme = useTheme()

  useEffect(() => {
    dispatch(setPageTitle(t(auction?.tokenName as string)))
  }, [auction])

  if (!auction) {
    return <NotFoundView />
  }

  return (
    <Center minHeight="100%">
      <Container>
        <Header title="Simulation" />
        <Card mb={theme.space[4]}>
          <CardBody>
            <CardTitle>{t('texts.bids')}</CardTitle>
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
