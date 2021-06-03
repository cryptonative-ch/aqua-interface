// Externals
import React, { useEffect, useState } from 'react'
import SVG from 'react-inlinesvg'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Signer } from '@ethersproject/abstract-signer'
import { ethers } from 'ethers'

// Components
import { Card } from 'src/components/Card'
import { CardBody } from 'src/components/CardBody'
import { Divider } from 'src/components/Divider'
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'
import { TokenIconFigure } from 'src/components/TokenIconFigure'
import { Button } from 'src/components/Button'
import { CardTitle } from 'src/components/CardTitle'
import { VerifyState } from 'src/views/Token/components/VerifyClaim'

// interface
import { FixedPriceSalePurchase } from 'src/interfaces/Sale'

// Svg
import noToken from 'src/assets/svg/no-token-image.svg'
import check from 'src/assets/svg/Check-Icon.svg'
import link from 'src/assets/svg/External-Link.svg'

// hooks
import { useWindowSize } from 'src/hooks/useWindowSize'

// Theme
import { theme } from 'src/styles/theme'
import { space, SpaceProps } from 'styled-system'

// Mesa Utils
import { formatBigInt } from 'src/utils/Defaults'

// contracts
import { FixedPriceSaleTemplate__factory } from 'src/contracts'

// interfaces
interface TokenClaimProps {
  purchase: FixedPriceSalePurchase
}

const Circle = styled.div({
  height: '45px',
  background: 'rgba(75, 158, 152, 0.35)',
  width: '45px',
  borderRadius: '50%',
})

const Link = styled.p<SpaceProps>(
  {
    color: '#304FFE',
    cursor: 'pointer',
    hover: 'underline',
  },
  space
)

const StyledSVG = styled(SVG)(props => ({
  fill: props.color,
}))

const Icon = styled.img<SpaceProps>(
  {
    height: '32px',
    width: '32px',
  },
  space
)

export const TokenClaim = ({ purchase: { sale, amount } }: TokenClaimProps) => {
  const { account, library, chainId } = useWeb3React()
  const [t] = useTranslation()
  const { isMobile } = useWindowSize()
  const [claim, setClaim] = useState<'unclaimed' | 'verify' | 'failed' | 'claimed'>('unclaimed')

  const claimTokens = async (saleId: string, signer: Signer) => {
    await FixedPriceSaleTemplate__factory.connect(saleId, signer)
      .claimToken()
      .then(tx => {
        setClaim('verify')
        tx.wait(1)
      })
      .then(receipt => {
        console.log(receipt)
        setClaim('claimed')
      })
      .catch(error => {
        console.log(error)
        setClaim('failed')
      })
  }

  let signer: Signer
  useEffect(() => {
    // connect to metamask
    if (!chainId || !library || !account) {
      return
    }
    // An example Provider
    const provider = new ethers.providers.Web3Provider(library)
    // An example Signer
    signer = provider.getSigner(0)
  }, [chainId, library, account])

  const preDecimalAmount = amount.toString().split('\\.')[0]
  const postDecimalAmount = amount.toString().split('\\.')[1]
  const claimState = (
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
  )

  const claimedState = (
    <CardBody height="100%" textAlign="center">
      <Flex flexDirection="column" height="100%">
        <Flex justifyContent="center">
          <Circle>
            <Icon marginTop="8px" src={check} />
          </Circle>
        </Flex>
        <CardTitle fontWeight={500}>{t('texts.claimSuccessful')}</CardTitle>
        <CardText color="grey">
          {' '}
          `${amount} ${sale?.tokenOut.name} has been sent to your address.`
        </CardText>
        <Link marginTop="24px">
          See this transaction on block explorer
          <StyledSVG src={link} color="#304FFE" />
        </Link>
        <Button variant="secondary" width="90%">
          {t('buttons.done')}
        </Button>
      </Flex>
    </CardBody>
  )

  return <Card>{claim == 'verify' ? <VerifyState /> : claim == 'claimed' ? claimedState : claimState}</Card>
}
