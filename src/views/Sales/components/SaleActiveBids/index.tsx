// External

import React from 'react'

// Components

import { Flex } from 'src/components/Flex'
import { Badge } from 'src/components/Badge'

// Interfaces
import { Sale } from 'src/interfaces/Sale'

// hooks
import { useBids } from 'src/hooks/useBids'

interface SaleActiveBidsProps {
  sale: Sale
}

export function SaleActiveBids({ sale }: SaleActiveBidsProps) {
  const { bids } = useBids(sale.id, sale.type)
  console.log(bids)

  return (
    <>
      <Flex>
        <Badge variant="in">2 IN</Badge>
      </Flex>
    </>
  )
}
