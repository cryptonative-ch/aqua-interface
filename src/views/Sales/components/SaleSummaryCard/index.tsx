// External
import { useTranslation } from 'react-i18next'
import React from 'react'
import { BigNumber, utils } from 'ethers'

// Components
import { SaleFinalPrice } from 'src/views/Sales/components/SaleFinalPrice'
import { CardBody } from 'src/components/CardSaleBody'
import { CardText } from 'src/components/CardText'
import { Card } from 'src/components/CardSale'
import { Flex } from 'src/components/Flex'
import { BadgeCard } from 'src/views/Sale/components/BadgeCard'
import { SaleAmount } from 'src/views/Sales/components/SaleAmount'
import { Divider } from 'src/components/Divider'
import { SaleClock } from 'src/views/Sales/components/SaleClock'
import { Icon } from 'src/components/Icon'
import { BadgeFlex } from 'src/layouts/BadgeFlex'
import { TokenIconFigure } from 'src/components/TokenIconFigure'
import { SaleActiveBids } from 'src/views/Sales/components/SaleActiveBids'

//interface
import { GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale } from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

// Svg
import noToken from 'src/assets/svg/no-token-image.svg'
import { isSaleClosed } from 'src/aqua/sale'

interface SaleSummaryProps {
  sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale
  purchaseAmount?: BigNumber
}

export function SaleSummaryCard({ sale, purchaseAmount }: SaleSummaryProps) {
  const [t] = useTranslation()
  const amount = purchaseAmount ? utils.formatUnits(purchaseAmount, sale.tokenOut.decimals) : undefined
  return (
    <Card>
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center" margin="0 0 16px 0">
          <Flex width="70%" alignItems="center">
            <TokenIconFigure>
              <Icon src={noToken} />
            </TokenIconFigure>
            <CardText fontSize="title">{sale.name}</CardText>
          </Flex>
          <BadgeFlex>
            <BadgeCard saleType="public" />
          </BadgeFlex>
        </Flex>
        <Divider />
        <Flex flexDirection="column" justifyContent="space-evenly" height="75%" margin="12px 0 0 0">
          <Flex flexDirection="row" justifyContent="space-between">
            <CardText color="grey">{t('texts.salesType')}</CardText>
            <CardText>
              {sale?.__typename == 'FixedPriceSale' ? t('texts.fixedPriceSale') : t('texts.fairSale')}
            </CardText>
          </Flex>
          {isSaleClosed(sale) ? (
            <Flex flexDirection="row" justifyContent="space-between">
              <CardText color="grey">{t('texts.amountSold')}</CardText>
              <SaleAmount closed sale={sale} />
            </Flex>
          ) : (
            <div>
              <Flex flexDirection="row" justifyContent="space-between">
                <CardText color="grey">{t('texts.currentPrice')}</CardText>
                <SaleFinalPrice sale={sale} />
              </Flex>

              <Flex flexDirection="row" justifyContent="space-between">
                <CardText color="grey">{t('texts.amountForSale')}</CardText>
                <SaleAmount sale={sale} />
              </Flex>
              {amount && (
                <Flex flexDirection="row" justifyContent="space-between">
                  <CardText color="grey">{t('texts.yourPurchase')}</CardText>
                  <SaleActiveBids sale={sale} amount={amount} />
                </Flex>
              )}
            </div>
          )}

          <SaleClock sale={sale} />
        </Flex>
      </CardBody>
    </Card>
  )
}
