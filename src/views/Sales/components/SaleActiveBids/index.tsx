// External

import React from 'react'
import { utils } from 'ethers'

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
  const { bids, totalPurchased } = useBids(sale.id, sale.type)

  const amount = utils.formatUnits(totalPurchased(bids)[0].amount, sale.tokenOut.decimals)
  return (
    <>
      <Flex>
        <Badge variant="in">{`${amount} ${sale.tokenOut.symbol}`}</Badge>
      </Flex>
    </>
  )
}
