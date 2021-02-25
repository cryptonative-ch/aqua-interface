// External
import styled from 'styled-components'
import numeral from 'numeral'
import React from 'react'

// Components
import { AuctionFinalPrice } from './AuctionFinalPrice'
import { CardBody } from 'src/components/CardSaleBody'
import { Card } from 'src/components/CardSale'
import { Flex } from 'src/components/Flex'
import { Timer } from 'src/views/Auction/components/Timer'
import { BadgeCard } from "src/views/Auction/components/BadgeCard";
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
        <Flex justifyContent="space-between" alignItems="center" >
          <Flex width='100%' alignItems="center" >
            <TokenIconFigure>
              <img src={auction.tokenIcon} alt={auction.tokenName} />
            </TokenIconFigure>
            <div>
              <strong>{auction.tokenName}</strong>
            </div>
        </Flex>
          <BadgeCard saleType='private'/>
        </Flex>
          <Flex flexDirection="column" justifyContent='space-evenly' height='153px'>
            <Flex flexDirection='row' justifyContent='space-between'>
              <div>
                Current Price
              </div>
              <AuctionFinalPrice auction={auction} />
            </Flex>
            <Flex  flexDirection='row' justifyContent='space-between'>
              <div>
                Time Remaining
              </div>
              <Timer auction={auction}/>
            </Flex>
            <Flex flexDirection='row' justifyContent='space-between'>
              <div>
                Amount for Sale
              </div>
            <div>
                {numeral(auction.tokenAmount).format('0,0')} {auction.tokenSymbol}
            </div>
            </Flex>
          </Flex>
      </CardBody>
    </Card>
  )
}
