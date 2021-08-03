// External

import React from 'react'
import numeral from 'numeral'

// Components

import { Flex } from 'src/components/Flex'
import { Badge } from 'src/components/Badge'

//interface
import { GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale } from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

interface SaleActiveBidsProps {
  sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale
  amount: string
}

export function SaleActiveBids({ sale, amount }: SaleActiveBidsProps) {
  return (
    <Flex>
      <Badge variant="in">{`${numeral(amount).format('0.[0000]')} ${sale.tokenOut.symbol}`}</Badge>
    </Flex>
  )
}
