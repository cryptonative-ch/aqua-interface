// External
import styled from 'styled-components'
import React from 'react'

// Components
import { DefaultNoBidsMessage } from './DefaultNoBidsMessage'

// Interfaces
import { AuctionBid } from 'src/interfaces/Auction'

interface BidListComponentProps {
  noBidsMessage?: React.ReactNode
  quotetokenSmybol: string
  baseTokenSymbol: string
  bids: AuctionBid[]
}

export const BidList: React.FC<BidListComponentProps> = ({
  bids,
  noBidsMessage = DefaultNoBidsMessage,
  quotetokenSmybol,
  baseTokenSymbol,
}) => {
  if (bids.length === 0) {
    return <>{noBidsMessage}</>
  }

  return (
    <Table>
      <THead>
        <tr>
          <th>Price {baseTokenSymbol}</th>
          <th>Amount {quotetokenSmybol}</th>
          <th>Total</th>
        </tr>
      </THead>
      <TBody>
        {bids.map(bid => {
          // Compute a the key
          const bidId = `${bid.address}-${bid.sellAmount.toString()}-${bid.buyAmount.toString()}`
          // Compute total price
          const totalPrice = bid.sellAmount.mul(bid.buyAmount)

          return (
            <TR key={bidId}>
              <td>{bid.sellAmount.toString()}</td>
              <td>{bid.buyAmount.toString()}</td>
              <td>{totalPrice.toString()}</td>
            </TR>
          )
        })}
      </TBody>
    </Table>
  )
}

const Table = styled.table({
  width: '100%',
})

const THead = styled.thead({
  width: '100%',
  display: 'inline-table',
})

const TBody = styled.tbody({
  display: 'block',
  overflowY: 'auto',

  maxHeight: 300,
})

const TR = styled.tr({
  display: 'flex',
  justifyContent: 'space-between',
})
