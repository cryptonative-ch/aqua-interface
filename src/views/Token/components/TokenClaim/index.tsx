// Externals
import React, { useState } from 'react'
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
import { CardTitle } from 'src/components/CardTitle'

// hooks
import { useWindowSize } from 'src/hooks/useWindowSize'

interface TokenClaimProps {
  sale: Sale
}

const claimedState = <CardBody></CardBody>

export const TokenClaim = () => {
  const [t] = useTranslation()
  const { isMobile } = useWindowSize()
  const [claim, setClaim] = useState<'unclaimed' | 'verify' | 'claimed'>('unclaimed')

  const claimState = (
    <CardBody>
      <Flex margin="0 0 16px 0">
        <TokenIconFigure>
          <Icon src={noToken} />
        </TokenIconFigure>
        <CardTitle>Claim IOP</CardTitle>
      </Flex>
      <Divider />
      <Flex flexDirection="column" justifyContent="space-evenly" margin="12px 0 0 0">
        <Flex justifyContent="space-between">
          <CardText color="grey">{t('texts.unclaimed')}</CardText>
          <CardText>2,678.5713 IOP</CardText>
        </Flex>
        <Flex justifyContent="space-between">
          <CardText color="grey">{t('texts.currentPrice')}</CardText>
          <CardText>2.23 DAI</CardText>
        </Flex>
        <Button onClick={() => setClaim('verify')} width="50%">
          {isMobile ? t('buttons.shortClaim') : t('buttons.claimTokens')}
        </Button>
      </Flex>
    </CardBody>
  )

  const verifyState = (
    <CardBody justifyContent="center">
      <CardText>{t('texts.verifyTransaction')}</CardText>
    </CardBody>
  )
  return <Card>{claim == 'verify' ? verifyState : claimState}</Card>
}
