// External
import { useTranslation } from 'react-i18next'
import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { utils } from 'ethers'

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

// Interface
import { Sale } from 'src/interfaces/Sale'

// Svg
import noToken from 'src/assets/svg/no-token-image.svg'
import { isSaleClosed } from 'src/mesa/sale'

// hooks
import { useBids, aggregatePurchases } from 'src/hooks/useBids'

interface SaleSummaryProps {
  sale: Sale
}

export function SaleSummaryCard({ sale }: SaleSummaryProps) {
  const [t] = useTranslation()
  const { bids } = useBids(sale.id, sale.type)
  const { account } = useWeb3React()
  const amount = utils.formatUnits(aggregatePurchases(bids, account).amount, sale.tokenOut.decimals)

  return (
    <Card>
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center" margin="0 0 16px 0">
          <Flex width="70%" alignItems="center">
            <TokenIconFigure>
              <Icon src={sale.tokenOut?.icon || noToken} alt={sale.tokenOut?.name} />
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
            {sale.type == 'FixedPriceSale' ? <CardText>Fixed Price Sale</CardText> : <CardText>Fair Sale</CardText>}
          </Flex>
          {isSaleClosed(sale) ? (
            <>
              <Flex flexDirection="row" justifyContent="space-between">
                <CardText color="grey">{t('texts.amountSold')}</CardText>
                <SaleAmount closed sale={sale} />
              </Flex>
              {bids && bids.length > 0 && (
                <Flex flexDirection="row" justifyContent="space-between">
                  <CardText color="grey">{t('texts.yourPurchase')}</CardText>
                  <SaleActiveBids sale={sale} amount={amount} />
                </Flex>
              )}
            </>
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
            </div>
          )}

          <SaleClock sale={sale} />
        </Flex>
      </CardBody>
    </Card>
  )
}
