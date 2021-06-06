// Externals
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Signer } from '@ethersproject/abstract-signer'
import { ethers, ContractTransaction } from 'ethers'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

// Components
import { Card } from 'src/components/Card'
import { CardBody } from 'src/components/CardBody'
import { Divider } from 'src/components/Divider'
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'
import { TokenIconFigure } from 'src/components/TokenIconFigure'
import { Button } from 'src/components/Button'
import { CardTitle } from 'src/components/CardTitle'

// claims
import { FailedClaim } from 'src/views/Token/components/FailedClaim'
import { VerifyState } from 'src/views/Token/components/VerifyClaim'
import { SuccessfulClaim } from 'src/views/Token/components/SuccessfulClaim'

// interface
import { FixedPriceSalePurchase } from 'src/interfaces/Sale'

// Svg
import noToken from 'src/assets/svg/no-token-image.svg'

// hooks
import { useWindowSize } from 'src/hooks/useWindowSize'

// Theme
import { theme } from 'src/styles/theme'

// Mesa Utils
import { formatBigInt } from 'src/utils/Defaults'

// contracts
import { FixedPriceSale__factory } from 'src/contracts'

// interfaces
export interface TokenClaimProps {
  purchase: FixedPriceSalePurchase
}
const Icon = styled.img<SpaceProps>(
  {
    height: '32px',
    width: '32px',
  },
  space
)

export const TokenClaim = ({ purchase: { sale, amount, ...rest } }: TokenClaimProps) => {
  const [t] = useTranslation()
  const { isMobile } = useWindowSize()
  const [claim, setClaim] = useState<'unclaimed' | 'verify' | 'failed' | 'claimed'>('unclaimed')

  const claimTokens = async (saleId: string, signer: Signer) => {
    await FixedPriceSale__factory.connect(saleId, signer)
      .claimToken()
      .then((tx: ContractTransaction) => {
        setClaim('verify')
        tx.wait(1)
      })
      .then((receipt: ContractTransaction) => {
        console.log(receipt)
        setClaim('claimed')
      })
      .catch((error: Error) => {
        console.log(error)
        setClaim('failed')
      })
  }

  let signer: Signer
  useEffect(() => {
    // connect to metamask
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    signer = provider.getSigner(0)
  }, [claim])

  const preDecimalAmount = formatBigInt(amount, sale?.tokenOut.decimals).toString().split('\\.')[0]

  const postDecimalAmount = formatBigInt(amount, sale?.tokenOut.decimals).toString().split('\\.')[1]

  if (claim === 'verify') {
    return <VerifyState />
  }

  if (claim === 'failed') {
    return <FailedClaim />
  }

  const purchase: FixedPriceSalePurchase = { sale, amount, ...rest }

  if (claim === 'claimed') {
    return <SuccessfulClaim purchase={purchase} />
  }

  return (
    <Card>
      <CardBody padding={theme.space[3]}>
        <Flex margin="0 0 16px 0">
          <TokenIconFigure>
            <Icon src={sale?.tokenOut.icon || noToken} />
          </TokenIconFigure>
          <CardTitle fontWeight={500}>Claim {sale?.tokenOut.name}</CardTitle>
        </Flex>
        <Divider />
        <Flex flexDirection="column" justifyContent="space-evenly">
          <Flex justifyContent="space-between">
            <CardText color="grey">{t('texts.unclaimed')}</CardText>
            <Flex>
              <CardText>{preDecimalAmount}</CardText>
              <CardText color="grey">{postDecimalAmount}</CardText>
              <CardText>&nbsp;{sale?.tokenOut.name}</CardText>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between">
            <CardText color="grey">{t('texts.currentPrice')}</CardText>
            <CardText>{`${sale?.tokenPrice} ${sale?.tokenIn.name}`}</CardText>
          </Flex>
          <Button onClick={() => claimTokens(sale!.id, signer)} width="90%">
            {isMobile ? t('buttons.shortClaim') : t('buttons.claimTokens')}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  )
}
