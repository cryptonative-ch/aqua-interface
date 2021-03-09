// External
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import React from 'react'

// Components
import { Link } from 'src/components/Link'

// Svg
import LeftArrowSVG from 'src/assets/svg/Left-Arrow.svg'

const ButtonText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #7B7F93;
`

const BackLink = styled(Link)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textDecoration: 'none !important',
  padding: '8px 0'
})

const ArrowImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`

export function BackButton() {
  const [t] = useTranslation()

  return (
    <BackLink to="/auctions" data-testid="back-ref">
      <ArrowImg src={LeftArrowSVG} />
      <ButtonText data-testid="back-button" >{t('buttons.backToSales')}</ButtonText>
    </BackLink>
  )
}
