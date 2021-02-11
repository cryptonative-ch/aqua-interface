// External
import styled from 'styled-components'
import { Property } from 'csstype'
import numeral from 'numeral'
import React from 'react'

// Components
import { DefaultNoBidsMessage } from './DefaultNoBidsMessage'

// Interfaces
import { AuctionBid } from 'src/interfaces/Auction'
import { Button } from 'src/components/Button'

//TODO: CHANGE THE FONTS
//TODO: CREATE FILTER FUNCTION FOR TITLES
//TODO: CHANGE CSS OF BIDLIST
//TODO: SORT FUNCTION ON DAI PER TOKEN
//TODO: ONCLICK BUTTON SHOULD REMOVE bid

interface BidListComponentProps {
  noBidsMessage?: React.ReactNode
  quotetokenSmybol: string
  baseTokenSymbol: string
  userAddress?: string
  bids: AuctionBid[]
  currentSettlementPrice?: number
  fullWidth: boolean
}

export const BidList: React.FC<BidListComponentProps> = ({
  bids,
  noBidsMessage,
  quotetokenSmybol,
  baseTokenSymbol,
  userAddress,
  currentSettlementPrice,
  fullWidth,
}) => {
  if (bids.length === 0) {
    if (noBidsMessage) {
      return <>{noBidsMessage}</>
    }
    return <DefaultNoBidsMessage />
  }

  const deleteRow = (btn: any) => {
    while (document.getElementById(btn)) {
      document.getElementById(btn)?.remove()
    }
  }

  return (
    <Table id="myTable">
      <THead>
        <TR>
          <th id="priority-1">
            <FlexDiv>
              <span style={{ color: 'gray' }}>Price </span> ${baseTokenSymbol}
            </FlexDiv>
          </th>
          <th id="priority-2">
            <FlexDiv>
              <span style={{ color: 'gray' }}>Amount</span> ${quotetokenSmybol}
            </FlexDiv>
          </th>
          <th id="priority-3">
            <FlexDiv>
              <span style={{ color: 'gray' }}>Total</span> ${baseTokenSymbol}
            </FlexDiv>
          </th>
          <th id="priority-4" style={{ display: fullWidth ? 'block' : 'none' }}>
            Status
          </th>
          <th id="priority-5" style={{ display: fullWidth ? 'block' : 'none' }}>
            Cancel
          </th>
        </TR>
      </THead>
      <TBody>
        {bids.map((bid, i) => {
          // Compute a the key
          const bidId = `${bid.address}-${bid.sellAmount.toString()}-${bid.buyAmount.toString()}`
          // Compute total price
          const totalPrice = bid.sellAmount.mul(bid.buyAmount)

          const status =
            typeof currentSettlementPrice !== 'undefined'
              ? Number(bid.sellAmount) >= 0.7 * currentSettlementPrice
                ? 'Active'
                : 'Inactive'
              : 'none'

          const cancel = (
            <Button padding border onClick={() => deleteRow(i)}>
              {' '}
              X{' '}
            </Button>
          )

          // highlight user's bids
          const backgroundColor = bid.address === userAddress && status === 'Active' ? '#4895ef' : 'transparent'

          return (
            <TR id={i.toString()} backgroundColor={backgroundColor} key={bidId}>
              <td id="priority-1" style={{ color: 'gray' }}>
                {numeral(bid.sellAmount.toString()).format('0,0')}
              </td>
              <td id="priority-2" style={{ color: 'gray' }}>
                {numeral(bid.buyAmount.toString()).format('0,0')}
              </td>
              <td id="priority-3" style={{ color: 'gray' }}>
                {numeral(totalPrice.toString()).format('0,0')}
              </td>
              <td id="priority-4" style={{ display: fullWidth ? 'block' : 'none' }}>
                {status}
              </td>
              <td id="priority-5" style={{ display: fullWidth ? 'block' : 'none' }}>
                {cancel}
              </td>
            </TR>
          )
        })}
      </TBody>
    </Table>
  )
}

const Table = styled.table`
  width: 100%;
`

const THead = styled.thead({
  width: '100%',
  display: 'table-header-group',
  textAlign: 'center',
})

const TBody = styled.tbody({
  display: 'block',
  overflowY: 'auto',

  maxHeight: 300,
})

interface TRProps {
  backgroundColor?: Property.BackgroundColor
}

const TR = styled.tr<TRProps>(({ backgroundColor }) => ({
  backgroundColor,
  display: 'flex',
  justifyContent: 'space-around',
}))

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`
