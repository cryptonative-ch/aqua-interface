// External
import React from 'react'
import numeral from 'numeral'

// Utility
import { isSaleClosed } from 'src/aqua/sale'
import { useWindowSize } from 'src/hooks/useWindowSize'

// Interfaces
import { FairSale, FairBidPick, FairSaleBid, FixedPriceSalePurchase } from 'src/interfaces/Sale'
import { GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale } from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

//helpers
import { formatBigInt } from 'src/utils'

// Table
import { Table } from 'src/components/Table'

// hooks
import { useTokenClaim } from 'src/hooks/useTokenClaim'

interface SelfBidListProps {
  sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale | FairSale
  bids: FixedPriceSalePurchase | FixedPriceSalePurchase[] | FairSaleBid | FairSaleBid[]
  clearingPrice?: FairBidPick
  status: string
  showGraph: boolean
}

export function SelfBidList({ sale, bids }: SelfBidListProps) {
  const { claim } = useTokenClaim(sale as GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale)
  const { isMobile } = useWindowSize()

  switch (sale.__typename) {
    case 'FixedPriceSale': {
      if (isSaleClosed(sale)) {
        return (
          <Table
            headData={[
              { title: 'Type', flex: isMobile ? 3.5 : 3 },
              { title: 'Amount' },
              { title: 'Value' },
              { title: 'Status', flex: isMobile ? 2 : 3 },
            ]}
            bodyData={[
              {
                title: 'Withdraw',
                purchases: {
                  value:
                    numeral(
                      formatBigInt(
                        (sale as GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale).tokenPrice,
                        sale.tokenOut.decimals
                      ) * formatBigInt((bids as FixedPriceSalePurchase).amount, sale.tokenOut.decimals)
                    ).format('0.[0000]') +
                    ' ' +
                    sale.tokenOut.symbol,
                  amount:
                    numeral(formatBigInt((bids as FixedPriceSalePurchase).amount, sale.tokenOut.decimals)).format(
                      '0.[0000]'
                    ) +
                    ' ' +
                    sale.tokenIn.symbol,
                  status: claim,
                },
              },
            ]}
            isClosed={true}
          />
        )
      }
      return (
        <Table
          headData={[{ title: 'Type' }, { title: 'Amount' }, { title: 'Value' }]}
          bodyData={[
            {
              title: 'Buy Order',
              color: '#4B9E98',
              purchases: (bids as FixedPriceSalePurchase[]).map(bid => ({
                amount:
                  numeral(
                    formatBigInt(
                      (sale as GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale).tokenPrice,
                      sale.tokenOut.decimals
                    ) * formatBigInt(bid.amount, sale.tokenOut.decimals)
                  ).format('0.[0000]') +
                  ' ' +
                  sale.tokenOut.symbol,
                status: bid.status,
                value:
                  numeral(formatBigInt(bid.amount, sale.tokenOut.decimals)).format('0.[0000]') +
                  ' ' +
                  sale.tokenIn.symbol,
              })),
            },
          ]}
        />
      )
    }
    case 'FairSale': {
      if (isSaleClosed(sale)) {
        return (
          <Table
            headData={[
              { title: 'Token Price' },
              { title: 'Amount' },
              { title: 'Total Tokens', flex: isMobile ? 5 : 3 },
              { title: 'Status', flex: isMobile ? 1 : 3 },
            ]}
            bodyData={
              [
                {
                  bids: (bids as FairSaleBid[]).map(bid => ({
                    bidPrice:
                      numeral(
                        formatBigInt(bid.tokenIn, sale.tokenIn.decimals) /
                          formatBigInt(bid.tokenOut, sale.tokenOut.decimals)
                      ).format('0.[0000]') +
                      ' ' +
                      sale.tokenIn.symbol,
                    tokenIn: numeral(formatBigInt(bid.tokenIn, sale.tokenIn.decimals)).format('0.[0000]'),
                    tokenOut: numeral(formatBigInt(bid.tokenOut, sale.tokenOut.decimals)).format('0.[0.0000]'),

                    totalToken:
                      numeral(
                        formatBigInt(bid.tokenIn, sale.tokenIn.decimals) *
                          formatBigInt(bid.tokenOut, sale.tokenOut.decimals)
                      ).format('0.[0000]') +
                      ' ' +
                      sale.tokenOut.symbol,
                  })),
                },
              ] as any
            }
            isClosed={true}
          />
        )
      }
      return (
        <Table
          headData={[
            { title: 'Token Price' },
            { title: 'Amount' },
            { title: 'Est. Invested' },
            { title: sale.tokenOut.symbol },
          ]}
          bodyData={
            [
              {
                bids: (bids as FairSaleBid[]).map(bid => ({
                  bidPrice:
                    numeral(
                      formatBigInt(bid.tokenIn, sale.tokenIn.decimals) /
                        formatBigInt(bid.tokenOut, sale.tokenOut.decimals)
                    ).format('0.[0000]') +
                    ' ' +
                    sale.tokenIn.symbol,
                  tokenIn: numeral(formatBigInt(bid.tokenIn, sale.tokenIn.decimals)).format('0.[0000]'),
                  tokenOut: numeral(formatBigInt(bid.tokenOut, sale.tokenOut.decimals)).format('0.[0.0000]'),

                  totalToken:
                    numeral(
                      formatBigInt(bid.tokenIn, sale.tokenIn.decimals) *
                        formatBigInt(bid.tokenOut, sale.tokenOut.decimals)
                    ).format('0.[0000]') +
                    ' ' +
                    sale.tokenOut.symbol,
                })),
              },
            ] as any
          }
        />
      )
    }
    default:
      return null
  }
}

SelfBidList.defaultProps = {
  status: 'active',
  showGraph: false,
  isFixed: false,
}
