// External

import styled from 'styled-components'
import { SpaceProps, TypographyProps, LayoutProps, TextColorProps, FontWeightProps } from 'styled-system'

export type TitleProps = SpaceProps & TypographyProps & LayoutProps & TextColorProps & FontWeightProps

export const Title = styled.h1<TitleProps>(props => ({
  height: props.height as string|| '44px',
  width: props.height as string || '100%',
  fontFamily: 'Inter',
  fontSize: props.fontSize as string || '36px',
  fontStyle: 'normal',
  fontWeight: props.fontWeight as number || 600,
  lineHeight: props.height as string || '44px',
  letterSpacing: '0',
  textAlign: 'center',
  color: props.color || '#000629',
  marginBottom: props.marginBottom as string || '32px',
}))
