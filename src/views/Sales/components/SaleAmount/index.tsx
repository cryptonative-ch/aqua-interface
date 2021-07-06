// Externals
import React from 'react'
import numeral from 'numeral'
import styled from 'styled-components'

// Components
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'
// Interface
import { Sale } from 'src/interfaces/Sale'

// Mesa utils
import { formatBigInt } from 'src/utils/Defaults'

interface SaleAmountProps {
  sale: Sale
  closed?: boolean
}
interface TextProps {
  closed?: boolean
}

const SaleCardText = styled(CardText)<TextProps>`
  color: ${props => (props.closed ? 'red' : 'black')};
`

export const SaleAmount: React.FC<SaleAmountProps> = ({ sale, closed }) => {
  return (
    <Flex>
      <SaleCardText closed={closed}>
        {numeral(
          sale.type == 'FairSale'
            ? formatBigInt(sale.tokenAmount, sale.tokenOut.decimals)
            : formatBigInt(closed ? sale.soldAmount : sale.sellAmount, sale.tokenOut.decimals)
        ).format('0,0')}
      </SaleCardText>
      <SaleCardText closed={closed} fontWeight="light">
        &nbsp;{sale.tokenOut?.symbol}
      </SaleCardText>
    </Flex>
  )
}
