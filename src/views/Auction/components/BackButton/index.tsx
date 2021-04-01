// External
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import React from 'react'

// Components
import { Link } from 'src/components/Link'

// Svg
import LeftArrowSVG from 'src/assets/svg/Left-Arrow.svg'

const ButtonText = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '150%',
  color: '#7b7f93',
})

const BackLink = styled(Link)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textDecoration: 'none !important',
  padding: '8px 0',
})

const ArrowImg = styled.img({
  width: '16px',
  height: '16px',
  marginRight: '4px',
})

export function BackButton() {
  const [t] = useTranslation()

  return (
    <BackLink to="/auctions" data-testid="back-ref">
      <ArrowImg src={LeftArrowSVG} />
      <ButtonText data-testid="back-button">{t('buttons.backToSales')}</ButtonText>
    </BackLink>
  )
}
