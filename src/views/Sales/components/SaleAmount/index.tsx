// Externals
import React from 'react'
import numeral from 'numeral'
import styled from 'styled-components'

// Components
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'

//interface
import { GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases_sale } from 'src/subgraph/__generated__/GetFixedPriceSalePurchasesByBuyer'

// Aqua utils
import { fixRounding, formatBigInt } from 'src/utils/Defaults'

interface SaleAmountProps {
  sale: GetFixedPriceSalePurchasesByBuyer_fixedPriceSalePurchases_sale
  closed?: boolean
}
interface TextProps {
  isFailed?: boolean
}

const SaleCardText = styled(CardText)<TextProps>`
  color: ${props => (props.isFailed ? 'red' : 'black')};
`

export const SaleAmount: React.FC<SaleAmountProps> = ({ sale, closed }) => {
  const isFailed = sale.soldAmount < sale.minimumRaise && closed
  return (
    <Flex>
      <SaleCardText isFailed={isFailed}>
        {numeral(
          sale.__typename != 'FixedPriceSale'
            ? formatBigInt(sale.tokensForSale, sale.tokenOut.decimals)
            : formatBigInt(sale.soldAmount) == 0
            ? 0
            : fixRounding(formatBigInt(sale.sellAmount) - formatBigInt(sale.soldAmount), 8)
        ).format('0,0')}
      </SaleCardText>
      <SaleCardText isFailed={isFailed} fontWeight="light">
        &nbsp;{sale.tokenOut?.symbol}
      </SaleCardText>
    </Flex>
  )
}
