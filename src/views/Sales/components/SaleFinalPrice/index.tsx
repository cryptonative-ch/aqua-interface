// External

import numeral from 'numeral'
import React from 'react'

// Components

import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'

// Interfaces
import { Sale } from 'src/interfaces/Sale'

// Mesa Utils
import { convertToBuyerPrice, formatBigInt } from 'src/utils/Defaults'

interface SaleFinalPriceProps {
  sale: Sale
}

export function SaleFinalPrice({ sale }: SaleFinalPriceProps) {
  const pricePerToken = numeral(
    sale.type == 'FixedPriceSale'
      ? convertToBuyerPrice(formatBigInt(sale.tokenPrice || '0', sale.tokenOut.decimals))
      : formatBigInt(sale.minimumBidAmount || '0', sale.tokenOut.decimals)
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
