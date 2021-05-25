// Externals
import React from 'react'
import numeral from 'numeral'

// Components
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'
// Interface
import { Sale } from 'src/interfaces/Sale'

// Mesa utils
import { formatBigInt } from 'src/utils/Defaults'

interface SaleAmountprops {
  sale: Sale
}

export const SaleAmount: React.FC<SaleAmountprops> = ({ sale }) => {
  return (
    <Flex>
      <CardText>
        {numeral(
          sale.type == 'FairSale'
            ? formatBigInt(sale.tokenAmount, sale.tokenOut.decimals)
            : formatBigInt(sale.sellAmount, sale.tokenOut.decimals)
        ).format('0,0')}
      </CardText>
      <CardText fontWeight="light">&nbsp;{sale.tokenOut?.symbol}</CardText>
    </Flex>
  )
}
