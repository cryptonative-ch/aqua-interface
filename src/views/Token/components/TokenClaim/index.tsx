// Externals
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import numeral from 'numeral'

// Components
import { Card } from 'src/components/Card'
import { CardBody } from 'src/components/CardBody'
import { Divider } from 'src/components/Divider'
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'
import { TokenIconFigure } from 'src/components/TokenIconFigure'
import { Button } from 'src/components/Button'

// claims
import { FailedClaim } from 'src/views/Token/components/FailedClaim'
import { VerifyState } from 'src/views/Token/components/VerifyClaim'
import { SuccessfulClaim } from 'src/views/Token/components/SuccessfulClaim'

// interface
import { Sale } from 'src/interfaces/Sale'
import { FixedPriceSalePurchaseStatus } from 'src/subgraph/__generated__/globalTypes'

// Svg
import noToken from 'src/assets/svg/no-token-image.svg'

// hooks
import { useWindowSize } from 'src/hooks/useWindowSize'
import { ClaimState, useTokenClaim } from 'src/hooks/useTokenClaim'
import { useBids } from 'src/hooks/useBids'

//helpers
import { aggregatePurchases } from 'src/utils/Defaults'

// sales summary
import { SaleClock } from 'src/views/Sales/components/SaleClock'

const Icon = styled.img<SpaceProps>(
  {
    height: '32px',
    width: '32px',
  },
  space
)

interface TokenClaimProps {
  sale: Sale
}

export const TokenClaim = ({ sale }: TokenClaimProps) => {
  const [t] = useTranslation()
  const { isMobile } = useWindowSize()
  const { account } = useWeb3React()
  // TODO: replace fixedpricesale with dynamic types
  const { bids } = useBids(sale!.id, 'FixedPriceSale')

  const { claimTokens, claim, transaction } = useTokenClaim(sale.id)

  const amount = aggregatePurchases(bids, account).amount
  const preDecimalAmount = ethers.utils.formatUnits(amount, sale?.tokenOut.decimals).toString().split('.')[0]
  const postDecimalAmount = ethers.utils.formatUnits(amount, sale?.tokenOut.decimals).toString().split('.')[1]

  if (!bids || bids.length == 0 || aggregatePurchases(bids, account).status === FixedPriceSalePurchaseStatus.CLAIMED) {
    return null
  }

  if (claim === ClaimState.VERIFY) {
    return <VerifyState />
  }

  if (claim === ClaimState.FAILED) {
    return <FailedClaim />
  }

  if (claim === ClaimState.CLAIMED) {
    return <SuccessfulClaim purchase={{ ...sale, amount: amount }} tx={transaction!.hash} />
  }

  return (
    <Card>
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center" margin="0 0 16px 0">
          <TokenIconFigure>
            <Icon src={sale?.tokenOut.icon || noToken} />
          </TokenIconFigure>
          <CardText fontSize="title">Claim {sale?.tokenOut.symbol}</CardText>
        </Flex>
        <Divider />
        <Flex flexDirection="column" justifyContent="space-evenly" height="75%" margin="12px 0 0 0">
          <Flex justifyContent="space-between" margin="4px 0">
            <CardText color="grey">{t('texts.unclaimed')}</CardText>
            <Flex>
              <CardText>{preDecimalAmount}</CardText>
              <CardText color="grey">{`.${postDecimalAmount}`}</CardText>
              <CardText>&nbsp;{sale?.tokenOut.symbol}</CardText>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between" margin="4px 0">
            <CardText color="grey">{t('texts.currentPrice')}</CardText>
            <CardText>{`${numeral(ethers.utils.formatUnits(sale ? sale.tokenPrice : 0, sale?.tokenOut.decimals)).format(
              '0.[0000]'
            )} ${sale?.tokenIn.symbol}`}</CardText>
          </Flex>
          <SaleClock sale={sale} margin="4px 0 16px 0" />
          <Button onClick={() => claimTokens(sale!.id)} width="90%">
            {isMobile ? t('buttons.shortClaim') : t('buttons.claimTokens')}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  )
}
