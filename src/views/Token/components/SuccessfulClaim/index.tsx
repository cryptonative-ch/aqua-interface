// Externals
import React from 'react'
import SVG from 'react-inlinesvg'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

// Components
import { CardBody } from 'src/components/CardBody'
import { Card } from 'src/components/Card'
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'
import { Button } from 'src/components/Button'
import { CardTitle } from 'src/components/CardTitle'

// svg
import check from 'src/assets/svg/Check-Icon.svg'
import link from 'src/assets/svg/External-Link.svg'

// Mesa Utils
import { formatBigInt } from 'src/utils/Defaults'
import { FixedPriceSalePurchase } from 'src/interfaces/Sale'

const Circle = styled.div({
  height: '45px',
  background: 'rgba(75, 158, 152, 0.35)',
  width: '45px',
  borderRadius: '50%',
})

const Link = styled.a<SpaceProps>(
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

interface SuccessfulClaimProps {
  purchase: FixedPriceSalePurchase
  tx: string
}

export const SuccessfulClaim = ({ purchase: { sale, amount }, tx }: SuccessfulClaimProps) => {
  const [t] = useTranslation()
  const blockExplorerUrl = `https://blockscout.com/xdai/mainnet/tx/${tx}`
  return (
    <Card>
      <CardBody height="100%" textAlign="center">
        <Flex flexDirection="column" height="100%">
          <Flex justifyContent="center">
            <Circle>
              <Icon marginTop="8px" src={check} />
            </Circle>
          </Flex>
          <CardTitle fontWeight={500}>{t('texts.claimSuccessful')}</CardTitle>
          <CardText color="grey">
            {`${formatBigInt(amount, sale?.tokenOut.decimals)} ${sale?.tokenOut.name} has been sent to your address.`}
          </CardText>
          <Link marginTop="24px" href={blockExplorerUrl}>
            See this transaction on block explorer
            <StyledSVG src={link} color="#304FFE" />
          </Link>
          <Button variant="secondary" width="90%">
            {t('buttons.done')}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  )
}
