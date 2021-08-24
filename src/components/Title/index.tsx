// External

import { Property } from 'csstype'
import styled from 'styled-components'
import {
  SpaceProps,
  TypographyProps,
  LayoutProps,
  TextColorProps,
  FontWeightProps,
  TextAlignProps,
} from 'styled-system'

export type TitleProps = SpaceProps & TypographyProps & LayoutProps & TextColorProps & FontWeightProps & TextAlignProps

export const Title = styled.h1<TitleProps>(props => ({
  height: (props.height as Property.Height) || '44px',
  width: (props.width as Property.Width) || '100%',
  fontFamily: 'Inter',
  fontSize: (props.fontSize as Property.FontSize) || '36px',
  fontStyle: 'normal',
  fontWeight: (props.fontWeight as Property.FontWeight) || 600,
  lineHeight: (props.lineHeight as Property.LineHeight) || '44px',
  letterSpacing: '0',
  textAlign: (props.textAlign as Property.TextAlign) || 'center',
  color: props.color || '#000629',
  marginBottom: (props.marginBottom as string) || '32px',
}))
