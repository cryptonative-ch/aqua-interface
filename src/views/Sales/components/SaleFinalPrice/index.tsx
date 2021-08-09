// External

import numeral from 'numeral'
import React from 'react'

// Components

import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'

//interface
import { GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale } from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

// Aqua Utils
import { convertToBuyerPrice, formatBigInt } from 'src/utils/Defaults'

interface SaleFinalPriceProps {
  sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale
}

export function SaleFinalPrice({ sale }: SaleFinalPriceProps) {
  const pricePerToken = numeral(
    sale.__typename == 'FixedPriceSale'
      ? convertToBuyerPrice(formatBigInt(sale.tokenPrice || '0', sale.tokenOut.decimals))
      : // placeholder until fairsale subgraph is complete
        formatBigInt((sale as any).minBidAmount || '0', sale.tokenOut.decimals)
  ).format('0.00')

  return (
    <Flex>
      <CardText data-testid="openprice">{pricePerToken}</CardText>
      <CardText fontWeight="light">
        &nbsp;{sale.tokenIn?.symbol}/{sale.tokenOut?.symbol}
      </CardText>
    </Flex>
  )
}
