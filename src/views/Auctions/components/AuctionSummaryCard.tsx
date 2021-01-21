// External
import styled from 'styled-components'
import numeral from 'numeral'
import React from 'react'

// Components
import { CardBody } from 'src/components/CardBody'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'

// Interface
import { Auction } from 'src/interfaces/Auction'

// Mesa Utils
import { AuctionStatus } from './AuctionStatus'

interface AuctionSummaryProps {
  auction: Auction
}

const TokenIconFigure = styled.div(props => ({
  marginRight: props.theme.space[3],
}))

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
            <div>x {auction.tokenSymbol} = 1 DAI</div>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}
