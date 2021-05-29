// Externals
import React, { useEffect, useState } from 'react'
import SVG from "react-inlinesvg";
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

// Components
import { Card } from 'src/components/Card'
import { CardBody } from 'src/components/CardBody'
import { Divider } from 'src/components/Divider'
import { CardText } from 'src/components/CardText'
import { Flex, FlexProps } from 'src/components/Flex'
import { TokenIconFigure } from 'src/components/TokenIconFigure'
import { Icon } from 'src/components/Icon'
import { Spinner } from 'src/components/Spinner'
import { Button } from 'src/components/Button'
import { CardTitle } from 'src/components/CardTitle'

// interface
import { Sale } from 'src/interfaces/Sale'

// Svg
import noToken from 'src/assets/svg/no-token-image.svg'
import check from 'src/assets/svg/Check-Icon.svg'
import link from 'src/assets/svg/External-Link.svg'

// hooks
import { useWindowSize } from 'src/hooks/useWindowSize'

// Theme
import { theme } from 'src/styles/theme'
import { space, SpaceProps } from 'styled-system';

interface TokenClaimProps {
  sale: Sale
}


const Circle = styled.div<FlexProps>({
  height: '45px',
  background: 'rgba(75, 158, 152, 0.35)',
  width: '45px',
  borderRadius: '50%',
  justifyContent: "center"
},
Flex)

const Link = styled.p<SpaceProps>({
color: '#304FFE',
cursor: 'pointer',
hover: 'underline'
},
space)

interface SVGProps {
  color: string;
}
const StyledSVG = styled(SVG)<SVGProps>(
  props => ({
  fill: props.color
}))

export const TokenClaim = () => {
  const [t] = useTranslation()
  const { isMobile } = useWindowSize()
  const [claim, setClaim] = useState<'unclaimed' | 'verify' | 'claimed'>('unclaimed')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (claim === 'verify') {
        setClaim('claimed')
      }
    }, 1000)
    timer
    console.log('switch activated')
    return () => {
      clearTimeout(timer)
    }
  }, [claim])

  const claimState = (
    <CardBody padding={theme.space[3]}>
      <Flex margin="0 0 16px 0" >
        <TokenIconFigure>
          <Icon src={noToken} />
        </TokenIconFigure>
        <CardTitle>Claim IOP</CardTitle>
      </Flex>
      <Divider />
      <Flex flexDirection="column" justifyContent="space-evenly">
        <Flex justifyContent="space-between">
          <CardText color="grey">{t('texts.unclaimed')}</CardText>
          <CardText>2,678.5713 IOP</CardText>
        </Flex>
        <Flex justifyContent="space-between">
          <CardText color="grey">{t('texts.currentPrice')}</CardText>
          <CardText>2.23 DAI</CardText>
        </Flex>
        <Button onClick={() => setClaim('verify')} width="90%">
          {isMobile ? t('buttons.shortClaim') : t('buttons.claimTokens')}
        </Button>
      </Flex>
    </CardBody>
  )

  const verifyState = (
    <CardBody height="100%" textAlign="center">
      <Flex height="100%" width="100%" justifyContent="center" flexDirection="column">
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
        <CardText>{t('texts.verifyTransaction')}</CardText>
      </Flex>
    </CardBody>
  )

  const claimedState = (
    <CardBody height='100%' textAlign='center'>
      <Flex flexDirection="column"  height='100%'>
        <Flex justifyContent='center'>
          <Circle justifyContent='center' alignItems='center'>
            <Icon src={check} height='32px' width='32px' />
          </Circle>
        </Flex>
        <CardTitle fontWeight={500}>{t('texts.claimSuccessful')}</CardTitle>
        <CardText color='grey'> 678.5713 IOP has been sent to your address.
        </CardText>
        <Link marginTop='24px'>See this transaction on block explorer
        <StyledSVG src={link} color='#304FFE'/>
        </Link>
        <Button variant='secondary' width='90%'>{t('buttons.done')}</Button>
      </Flex>
    </CardBody>
  )

  return <Card>{claim == 'verify' ? verifyState : claim == 'claimed' ? claimedState : claimState}</Card>
}
