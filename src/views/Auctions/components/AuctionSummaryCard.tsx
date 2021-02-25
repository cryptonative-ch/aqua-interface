// External
import styled from 'styled-components'
import React from 'react'

// Components
import { AuctionFinalPrice } from './AuctionFinalPrice'
import { CardBody, CardText } from 'src/components/CardSaleBody'
import { Card } from 'src/components/CardSale'
import { Flex } from 'src/components/Flex'
import { Timer } from 'src/views/Auction/components/Timer'
import { BadgeCard } from 'src/views/Auction/components/BadgeCard'
import { AuctionAmount } from './AuctionAmount'

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
        <Flex justifyContent="space-between" alignItems="center">
          <Flex width="100%" alignItems="center">
            <TokenIconFigure>
              <img src={auction.tokenIcon} alt={auction.tokenName} />
            </TokenIconFigure>
            <CardText fontSize="title" lineHeight="title">
              {auction.tokenName}
            </CardText>
          </Flex>
          <Flex>
            <BadgeCard saleType="private" />
            <BadgeCard saleType="presale" />
          </Flex>
        </Flex>
        <Flex flexDirection="column" justifyContent="space-evenly" height="153px">
          <Flex flexDirection="row" justifyContent="space-between">
            <CardText lineHeight="title" color="grey">
              Current Price
            </CardText>
            <AuctionFinalPrice auction={auction} />
          </Flex>
          <Flex flexDirection="row" justifyContent="space-between">
            <CardText color="grey">Time Remaining</CardText>
            <Timer auction={auction} />
          </Flex>
          <Flex flexDirection="row" justifyContent="space-between">
            <CardText color="grey">Amount for Sale</CardText>
            <AuctionAmount auction={auction} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}
