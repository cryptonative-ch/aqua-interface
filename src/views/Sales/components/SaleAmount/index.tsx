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
  // Due to subgraph issue amount starts at 0 then is set to remaining supply
  return (
    <Flex>
      <SaleCardText isFailed={isFailed}>
        {numeral(
          sale.__typename != 'FixedPriceSale'
            ? formatBigInt(sale.tokensForSale, sale.tokenOut.decimals)
            : closed
            ? formatBigInt(sale.soldAmount) == 0
              ? 0
              : fixRounding(formatBigInt(sale.sellAmount) - formatBigInt(sale.soldAmount), 8)
            : formatBigInt(sale.soldAmount) == 0
            ? formatBigInt(sale.sellAmount)
            : formatBigInt(sale.soldAmount)
        ).format('0,0')}
      </SaleCardText>
      <SaleCardText isFailed={isFailed} fontWeight="light">
        &nbsp;{sale.tokenOut?.symbol}
      </SaleCardText>
    </Flex>
  )
}
