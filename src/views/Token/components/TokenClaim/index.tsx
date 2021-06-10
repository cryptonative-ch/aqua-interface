// Externals
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Signer } from '@ethersproject/abstract-signer'
import { ethers, ContractTransaction } from 'ethers'
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
  const [error, setError] = useState<Error>()
  const [tx, setTx] = useState<ContractTransaction>()
  const claimTokens = async (saleId: string, signer: Signer) => {
    //take this out before production
    await FixedPriceSale__factory.connect(saleId, signer)
      .closeSale()
      .then((tx: ContractTransaction) => {
        tx.wait(1)
      })
      .catch((error: Error) => {
        console.log(error)
        setError(error)
      })
    await FixedPriceSale__factory.connect(saleId, signer)
      .claimTokens()
      .then((tx: ContractTransaction) => {
        setClaim('verify')
        tx.wait(1)
        setTx(tx)
      })
      .then(receipt => {
        console.log(receipt)
        setClaim('claimed')
      })
      .catch((error: Error) => {
        setError(error)
        console.log(error)
        setClaim('failed')
      })
  }

  const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  const signer = provider.getSigner(0)

  const preDecimalAmount = ethers.utils.formatUnits(amount, sale?.tokenOut.decimals).toString().split('.')[0]

  const postDecimalAmount = ethers.utils.formatUnits(amount, sale?.tokenOut.decimals).toString().split('.')[1]

  if (claim === 'verify') {
    return <VerifyState />
  }

  if (claim === 'failed' && error) {
    return <FailedClaim error={JSON.stringify(error)} />
  }

  const purchase: FixedPriceSalePurchase = { sale, amount, ...rest }

  if (claim === 'claimed') {
    return <SuccessfulClaim purchase={purchase} tx={tx!.hash} />
  }

  return (
    <Card>
      <CardBody padding={theme.space[3]}>
        <Flex margin="0 0 16px 0">
          <TokenIconFigure>
            <Icon src={sale?.tokenOut.icon || noToken} />
          </TokenIconFigure>
          <CardTitle fontWeight={500}>Claim {sale?.tokenOut.symbol}</CardTitle>
        </Flex>
        <Divider />
        <Flex flexDirection="column" justifyContent="space-evenly">
          <Flex justifyContent="space-between" margin="24px 0px 12px 0px">
            <CardText color="grey">{t('texts.unclaimed')}</CardText>
            <Flex>
              <CardText>{preDecimalAmount}</CardText>
              <CardText color="grey">{`.${postDecimalAmount}`}</CardText>
              <CardText>&nbsp;{sale?.tokenOut.symbol}</CardText>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between" margin="12px 0px 24px 0px">
            <CardText color="grey">{t('texts.currentPrice')}</CardText>
            <CardText>{`${numeral(ethers.utils.formatUnits(sale ? sale.tokenPrice : 0, sale?.tokenOut.decimals)).format(
              '0.0'
            )} ${sale?.tokenIn.symbol}`}</CardText>
          </Flex>
          <Button onClick={() => claimTokens(sale!.id, signer)} width="90%">
            {isMobile ? t('buttons.shortClaim') : t('buttons.claimTokens')}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  )
}
