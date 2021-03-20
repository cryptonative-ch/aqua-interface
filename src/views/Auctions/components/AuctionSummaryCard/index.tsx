// External
import styled from 'styled-components'
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
  return (
    <Card>
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center" margin="0 0 16px 0">
          <Flex width="70%" alignItems="center">
            <TokenIconFigure>
              <Icon src={auction.tokenIcon} alt={auction.tokenName} />
            </TokenIconFigure>

            <CardText fontSize="title">
              {auction.tokenName}
            </CardText>



          </Flex>
          <BadgeFlex>
            <BadgeCard saleType="private" />
            <BadgeCard saleType="presale" />
          </BadgeFlex>
        </Flex>
        <Divider />
        <Flex flexDirection="column" justifyContent="space-evenly" height="75%" margin="12px 0 0 0">
          <Flex flexDirection="row" justifyContent="space-between">
            <CardText color="grey">Auction Type</CardText>
            <CardText>Point Dutch</CardText>
          </Flex>
          <Flex flexDirection="row" justifyContent="space-between">
            <CardText color="grey">Current Price</CardText>
            <AuctionFinalPrice auction={auction} />
          </Flex>
          <Flex flexDirection="row" justifyContent="space-between">
            <CardText color="grey">Amount for Sale</CardText>
            <AuctionAmount auction={auction} />
          </Flex>
          <AuctionClock auction={auction} />
        </Flex>
      </CardBody>
    </Card>
  )
}
