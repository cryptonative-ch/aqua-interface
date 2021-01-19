// External
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

// Hooks
import { useMountEffect } from 'src/hooks/useMountEffect'
import { useAuction } from 'src/hooks/useAuction'

// Actions
import { setPageTitle } from 'src/redux/page'

// Components
import { Container } from 'src/components/Container'
import { CardBody } from 'src/components/CardBody'
import { Header } from './components/Header'
import { Card } from 'src/components/Card'

// Layouts
import { Center } from 'src/layouts/Center'

// Views
import { NotFoundView } from '../NotFound'
import { CardTitle } from 'src/components/CardTitle'
import { useTheme } from 'styled-components'

interface AuctionViewParams {
  auctionId: string
}

export function AuctionView() {
  const params = useParams<AuctionViewParams>()
  const auction = useAuction(params.auctionId)
  const [t] = useTranslation()
  const dispatch = useDispatch()
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
        <Header title={t('auction.tokenName')} />
      </Container>
      <Card mb={theme.space[3]}>
        <CardBody>
          <CardTitle>{t('texts.graph')}</CardTitle>
        </CardBody>
      </Card>
      <Card mb={theme.space[3]}>
        <CardBody>
          <CardTitle>{t('texts.bids')}</CardTitle>
        </CardBody>
      </Card>
    </Center>
  )
}
