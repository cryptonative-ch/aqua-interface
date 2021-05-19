// External

import styled from 'styled-components'
import { SpaceProps, TypographyProps, LayoutProps, TextColorProps, FontWeightProps } from 'styled-system'

export type TitleProps = SpaceProps & TypographyProps & LayoutProps & TextColorProps & FontWeightProps

export const Title = styled.h1<TitleProps>(props => ({
  height: `${props.height}px` || '44px',
  width: `${props.height}px` || '100%',
  fontFamily: 'Inter',
  fontSize: `${String(props.fontSize)}px` || '36px',
  fontStyle: 'normal',
  fontWeight: Number(props.fontWeight) || 600,
  lineHeight: `${props.height}px` || '44px',
  letterSpacing: '0',
  textAlign: 'center',
  color: props.color || '#000629',
  marginBottom: `${String(props.marginBottom)}px` || '32px',
}))
