// External

import React from 'react'
import numeral from 'numeral'

// Components

import { Flex } from 'src/components/Flex'
import { Badge } from 'src/components/Badge'

// Interfaces
import { Sale } from 'src/interfaces/Sale'

interface SaleActiveBidsProps {
  sale: Sale
  amount: string
}

export function SaleActiveBids({ sale, amount }: SaleActiveBidsProps) {
  return (
    <Flex>
      <Badge variant="in">{`${numeral(amount).format('0.[0000]')} ${sale.tokenOut.symbol}`}</Badge>
    </Flex>
  )
}
