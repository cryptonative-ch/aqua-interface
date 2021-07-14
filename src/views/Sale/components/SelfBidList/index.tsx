// External
import React from 'react'
import numeral from 'numeral'

// Utility
import { isSaleOpen, isSaleClosed } from 'src/mesa/sale'
import { useWindowSize } from 'src/hooks/useWindowSize'

// Interfaces
import { Sale, FairBidPick, FairSaleBid, FixedPriceSalePurchase } from 'src/interfaces/Sale'
import { convertToBuyerPrice, formatBigInt } from 'src/utils/Defaults'

// Table
import { Table } from 'src/components/Table'

interface SelfBidListProps {
  sale: Sale
  bids: any
  clearingPrice?: FairBidPick
  status: string
  showGraph: boolean
  isFixed?: boolean
}

export function SelfBidList({ sale, bids, isFixed }: SelfBidListProps) {
  const { isMobile } = useWindowSize()

  const isFixedHeadData = [
    { title: 'Type', flex: isMobile ? 3.5 : 3 },
    { title: 'Amount' },
    { title: 'Value' },
    { title: 'Status', flex: isMobile ? 2 : 3 },
  ]

  const isFixedHeadDataOpen = [{ title: 'Type' }, { title: 'Amount' }, { title: 'Value' }]

  // const isFixedBodyData = [
  //   {
  //     title: 'Withdraw',
  //     purchases: {
  //       amount:
  //         numeral(formatBigInt((bids as FixedPriceSalePurchase).amount, sale.tokenOut.decimals)).format('0.[0000]') +
  //         ' ' +
  //         sale.tokenOut.symbol,
  //       value:
  //         numeral(
  //           convertToBuyerPrice(formatBigInt(sale.tokenPrice, sale.tokenOut.decimals)) *
  //             formatBigInt((bids as FixedPriceSalePurchase).amount, sale.tokenOut.decimals)
  //         ).format('0.[0000]') +
  //         ' ' +
  //         sale.tokenIn.symbol,
  //       status: (bids as FixedPriceSalePurchase).status,
  //     },
  //   },
  // ]

  const isFixedBodyDataOpen =
    bids.length > 0
      ? [
          {
            title: 'Buy Order',
            color: '#4B9E98',
            purchases: (bids as FixedPriceSalePurchase[]).map(bid => ({
              amount:
                numeral(formatBigInt(bid.amount, sale.tokenOut.decimals)).format('0.[0000]') +
                ' ' +
                sale.tokenOut.symbol,
              value:
                numeral(
                  formatBigInt(sale.tokenPrice, sale.tokenOut.decimals) *
                    formatBigInt(bid.amount, sale.tokenOut.decimals)
                ).format('0.[0000]') +
                ' ' +
                sale.tokenIn.symbol,
              status: bid.status,
            })),
          },
        ]
      : [
          {
            title: 'Withdraw',
            purchases: {
              amount:
                numeral(formatBigInt((bids as FixedPriceSalePurchase).amount, sale.tokenOut.decimals)).format(
                  '0.[0000]'
                ) +
                ' ' +
                sale.tokenOut.symbol,
              value:
                numeral(
                  convertToBuyerPrice(formatBigInt(sale.tokenPrice, sale.tokenOut.decimals)) *
                    formatBigInt((bids as FixedPriceSalePurchase).amount, sale.tokenOut.decimals)
                ).format('0.[0000]') +
                ' ' +
                sale.tokenIn.symbol,
              status: (bids as FixedPriceSalePurchase).status,
            },
          },
        ]
  console.log({ isFixedBodyDataOpen })

  const isFairSaleHeadData = [
    { title: 'Token Price' },
    { title: 'Amount' },
    { title: 'Total Tokens', flex: isMobile ? 5 : 3 },
    { title: 'Status', flex: isMobile ? 1 : 3 },
  ]

  const isFairSaleOpenHeadData = [
    { title: 'Token Price' },
    { title: 'Amount' },
    { title: 'Est. Invested' },
    { title: sale.tokenOut.symbol },
  ]
  const isFairSaleBodyData = isFixed
    ? []
    : [
        {
          bids: (bids as FairSaleBid[]).map(bid => ({
            bidPrice:
              numeral(
                formatBigInt(bid.tokenIn, sale.tokenIn.decimals) / formatBigInt(bid.tokenOut, sale.tokenOut.decimals)
              ).format('0.[0000]') +
              ' ' +
              sale.tokenIn.symbol,
            tokenIn: numeral(formatBigInt(bid.tokenIn, sale.tokenIn.decimals)).format('0.[0000]'),
            tokenOut: numeral(formatBigInt(bid.tokenOut, sale.tokenOut.decimals)).format('0.[0.0000]'),

            totalToken:
              numeral(
                formatBigInt(bid.tokenIn, sale.tokenIn.decimals) * formatBigInt(bid.tokenOut, sale.tokenOut.decimals)
              ).format('0.[0000]') +
              ' ' +
              sale.tokenOut.symbol,
          })),
        },
      ]

  if (isFixed && isSaleClosed(sale)) {
    return <Table headData={isFixedHeadData} bodyData={isFixedBodyDataOpen} isClosed={true} />
  }

  if (isFixed && isSaleOpen(sale)) {
    return <Table headData={isFixedHeadDataOpen} bodyData={isFixedBodyDataOpen} />
  }

  if (isSaleOpen(sale)) {
    return <Table headData={isFairSaleOpenHeadData} bodyData={isFairSaleBodyData as any} />
  }
  return <Table headData={isFairSaleHeadData} bodyData={isFairSaleBodyData as any} />
}

SelfBidList.defaultProps = {
  status: 'active',
  showGraph: false,
  isFixed: false,
}
