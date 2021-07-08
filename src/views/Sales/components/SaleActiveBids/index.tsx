// External

import numeral from 'numeral'
import React from 'react'

// Components

import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'

// Interfaces
import { Sale } from 'src/interfaces/Sale'

// Mesa Utils
import { formatBigInt } from 'src/utils/Defaults'

// hooks
import { useBids } from 'src/hooks/useBids'

interface SaleActiveBidsProps {
  sale: Sale
}

export function SaleActiveBids({ sale }: SaleActiveBidsProps) {
  const { bids } = useBids(sale.id, sale.type)

  return (
    <Flex>
      <CardText data-testid="openprice">{pricePerToken}</CardText>
      <CardText fontWeight="light">
        &nbsp;{sale.tokenIn?.symbol}/{sale.tokenOut?.symbol}
      </CardText>
    </Flex>
  )
}
