// External
import styled from 'styled-components'
import numeral from 'numeral'
import React from 'react'

// Components
import { AuctionFinalPrice } from './AuctionFinalPrice'
import { CardBody } from 'src/components/CardBody'
import { AuctionStatus } from './AuctionStatus'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'

// Interface
import { Auction } from 'src/interfaces/Auction'

interface AuctionSummaryProps {
  auction: Auction
}

export function AuctionSummaryCard({ auction }: AuctionSummaryProps) {
  return (
    <Card>
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <TokenIconFigure>
              <img src={auction.tokenIcon} alt={auction.tokenName} />
            </TokenIconFigure>
            <Flex flexDirection="column">
              <strong>{auction.tokenName}</strong>
              <div>
                {numeral(auction.tokenAmount).format('0,0')} {auction.tokenSymbol}
              </div>
            </Flex>
          </Flex>
          <Flex flexDirection="column">
            <AuctionStatus auction={auction} />
            <AuctionFinalPrice auction={auction} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}

const TokenIconFigure = styled.div(props => ({
  marginRight: props.theme.space[3],
}))
