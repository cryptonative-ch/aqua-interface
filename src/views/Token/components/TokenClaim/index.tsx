// Externals
import React from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { Card } from 'src/components/Card'
import { CardBody } from 'src/components/CardBody'
import { Divider } from 'src/components/Divider'
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'
import { TokenIconFigure } from 'src/components/TokenIconFigure'
import { Icon } from 'src/components/Icon'

// interface
import { Sale } from 'src/interfaces/Sale'

// Svg
import noToken from 'src/assets/svg/no-token-image.svg'
import { Button } from 'src/components/Button'

interface TokenClaimProps {
  sale: Sale
}

export const TokenClaim = ({ sale }: TokenClaimProps) => {
  const [t] = useTranslation()
  return (
    <Card>
      <CardBody>
        <Flex>
          <TokenIconFigure>
            <Icon src={sale.tokenOut?.icon || noToken} alt={sale.tokenOut?.name} />
          </TokenIconFigure>
          <CardText fontSize="Title">Claim IOP</CardText>
        </Flex>
        <Divider />
        <Flex>
          <CardText>{t('text.unclaimed')}</CardText>
          <CardText>2,678.5713 IOP</CardText>
        </Flex>
        <Flex>
          <CardText>{t('texts.currentPrice')}</CardText>
          <CardText>2.23 DAI</CardText>
        </Flex>
        <Button>{t('buttons.claimTokens')}</Button>
      </CardBody>
    </Card>
  )
}
