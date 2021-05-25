// External

import styled from 'styled-components'
import {
  SpaceProps,
  TypographyProps,
  LayoutProps,
  TextColorProps,
  FontWeightProps,
  TLengthStyledSystem,
  height,
} from 'styled-system'

export type TitleProps = SpaceProps & TypographyProps & LayoutProps & TextColorProps & FontWeightProps

export const Title = styled.h1<TitleProps>(props => ({
  height: (props.height as string) || '44px',
  width: (props.width as string) || '100%',
  fontSize: (props.fontSize as string) || '36px',
  fontWeight: (props.fontWeight as number) || 600,
  lineHeight: (props.height as string) || '44px',
  textAlign: 'center',
  color: props.color || props.theme.colors.text,
  marginBottom: (props.marginBottom as string) || '32px',
}))
