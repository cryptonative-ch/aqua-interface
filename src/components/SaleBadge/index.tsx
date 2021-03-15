// External

import styled from 'styled-components'
import { SpaceProps, TypographyProps, LayoutProps, TextColorProps, FontWeightProps } from 'styled-system'

export type TextBadgeProps = SpaceProps & TypographyProps & LayoutProps & TextColorProps & FontWeightProps

export const BackgroundBadge = styled.div({
  padding: '3px 3px 3px 3px',
  position: 'relative',
  marginBottom: '48px',
  display: 'flex',
  height: '33px',
  width: '240px',
  borderRadius: '33px',
  background: '#dddde3',
})

export const ActiveBadge = styled.div({
  height: '27px',
  width: '95px',
  borderRadius: '33px',
  padding: '5px 13px',
  display: 'flex',
  justifyContent: 'center',
  background: '#ffffff',
})

export const TextBadge = styled.p<TextBadgeProps>(props => ({
  margin: props.color === 'active' ? '0' : '5px 13px',
  height: '17px',
  width: props.color === 'active' ? 'auto' : '69px',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '17px',
  letterSpacing: '0',
  textAlign: props.textAlign === 'right' ? 'right' : 'center',
  color: props.color === 'active' ? '#304ffe' : '#7b7f93',
  cursor: 'pointer',
}))
