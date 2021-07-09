// External

import React from 'react'

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
    <>
      <Flex>
        <Badge variant="in">{`${amount} ${sale.tokenOut.symbol}`}</Badge>
      </Flex>
    </>
  )
}
