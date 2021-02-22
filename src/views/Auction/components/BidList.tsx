// External
import styled from 'styled-components'
import { Property } from 'csstype'
import numeral from 'numeral'
import React from 'react'
import { useDispatch } from 'react-redux'


// Components
import { DefaultNoBidsMessage } from './DefaultNoBidsMessage'
import { hasLowerClearingPrice } from 'src/mesa/price'

// Interfaces
import { AuctionBid } from 'src/interfaces/Auction'
import { Button } from 'src/components/Button'


import { RemoveBid } from "src/redux/BidData";
import { BigNumber } from 'ethers'

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
  const dispatch = useDispatch()

  if (typeof bids == 'undefined' || bids.length === 0) {
    if (noBidsMessage) {
      return <>{noBidsMessage}</>
    }
    return <DefaultNoBidsMessage />
  }

  const deleteBid = (element: any) => {
    const table_row_id = element.currentTarget.parentNode?.parentNode.id
    const userAddress = table_row_id.split('-')[0]
    const userPrice = BigNumber.from(table_row_id.split('-')[1])
    const userAmount = BigNumber.from(table_row_id.split('-')[2])

    const payload: AuctionBid = {
      address: userAddress,
      buyAmount: userAmount,
      sellAmount: userPrice,
    }
    
    dispatch(RemoveBid(payload))
    console.log('pressed delete button')

  }

  

  return (
    <Table id="myTable">
      <THead>
        <TR>
          <TH id="priority-1">
            <FlexDiv>
              <div style={{ color: 'gray' }}>Price</div> <div>&nbsp;${baseTokenSymbol}</div>
            </FlexDiv>
          </TH>
          <TH id="priority-2">
            <FlexDiv>
              <div style={{ color: 'gray' }}>Amount</div> <div>&nbsp;${quotetokenSmybol}</div>
            </FlexDiv>
          </TH>
          <TH id="priority-3">
            <FlexDiv>
              <div style={{ color: 'gray' }}>Total</div> <div>&nbsp;${baseTokenSymbol}</div>
            </FlexDiv>
          </TH>
          <TH id="priority-4" style={{ display: fullWidth ? 'block' : 'none' }}>
            Status
          </TH>
          <TH id="priority-5" style={{ display: fullWidth ? 'block' : 'none' }}>
            Cancel
          </TH>
        </TR>
      </THead>
      <TBody>
        {bids.sort(hasLowerClearingPrice).map(bid => {
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
            <Button padding border onClick={deleteBid}>
              {' '}
              X{' '}
            </Button>
          )

          // highlight user's bids
          const backgroundColor =
            bid.address === userAddress ? (status === 'Active' ? '#99FF99' : '#FF99AA') : 'transparent'

          return (
            <TR id={bidId} backgroundColor={backgroundColor} key={bidId}>
              <TD id="priority-1" style={{ color: 'gray' }}>
                {numeral(bid.sellAmount.toString()).format('0,0')}
              </TD>
              <TD id="priority-2" style={{ color: 'gray' }}>
                {numeral(bid.buyAmount.toString()).format('0,0')}
              </TD>
              <TD id="priority-3" style={{ color: 'gray' }}>
                {numeral(totalPrice.toString()).format('0,0')}
              </TD>
              <TD id="priority-4" style={{ display: fullWidth ? 'block' : 'none' }}>
                {status}
              </TD>
              <TD id="priority-5" style={{ display: fullWidth ? 'block' : 'none' }}>
                {cancel}
              </TD>
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

const FlexDiv = styled.div`
  display: flex;
  text-align: center;
  margin: 0 auto;
`

const THead = styled.thead({
  width: '100%',
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
}))

const TH = styled.th`
  text-align: center;
  display: flex;
  flex: 1;
`

const TD = styled.td`
  flex: 1;
  text-align: center;
`
