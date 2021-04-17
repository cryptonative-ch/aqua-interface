// External
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import React from 'react'

// Components
import { AuctionFinalPrice } from '../AuctionFinalPrice'
import { CardBody } from 'src/components/CardSaleBody'
import { CardText } from 'src/components/CardText'
import { Card } from 'src/components/CardSale'
import { Flex } from 'src/components/Flex'
import { BadgeCard } from 'src/views/Auction/components/BadgeCard'
import { AuctionAmount } from '../AuctionAmount'
import { Divider } from 'src/components/Divider'
import { AuctionClock } from '../AuctionClock'
import { Icon } from 'src/components/Icon'
import { BadgeFlex } from 'src/layouts/BadgeFlex'

// Interface
import { Auction } from 'src/interfaces/Auction'

const TokenIconFigure = styled.div(props => ({
  marginRight: props.theme.space[3],
}))

interface AuctionSummaryProps {
  auction: Auction
}

export function AuctionSummaryCard({ auction }: AuctionSummaryProps) {
  const [t] = useTranslation()
  return (
    <Card>
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center" margin="0 0 16px 0">
          <Flex width="70%" alignItems="center">
            <TokenIconFigure>
              <Icon src={auction.tokenOut?.icon} alt={auction.tokenOut?.name} />
            </TokenIconFigure>
            <CardText fontSize="title">{auction.name}</CardText>
          </Flex>
          <BadgeFlex>
            <BadgeCard saleType="private" />
          </BadgeFlex>
        </Flex>
        <Divider />
        <Flex flexDirection="column" justifyContent="space-evenly" height="75%" margin="12px 0 0 0">
          <Flex flexDirection="row" justifyContent="space-between">
            <CardText color="grey">{t('texts.salesType')}</CardText>
            {auction.type == 'fixedPriceSale' ? (
              <CardText>Fixed Price Auction</CardText>
            ) : (
              <CardText>Fair Sale</CardText>
            )}
          </Flex>
          <Flex flexDirection="row" justifyContent="space-between">
            <CardText color="grey">{t('texts.currentPrice')}</CardText>
            <AuctionFinalPrice auction={auction} />
          </Flex>
          <Flex flexDirection="row" justifyContent="space-between">
            <CardText color="grey">{t('texts.amountForSale')}</CardText>
            <AuctionAmount auction={auction} />
          </Flex>
          <AuctionClock auction={auction} />
        </Flex>
      </CardBody>
    </Card>
  )
}
