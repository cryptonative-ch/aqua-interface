// Externals
import styled from 'styled-components'
import { TypographyProps } from 'styled-system'

export type TextProps = TypographyProps

export const Text = styled.p<TextProps>(props => ({
  color: props.color || props.theme.colors.text,
  fontSize: (props.fontSize as string) || props.theme.fontSizes[1],
  lineHeight: (props.lineHeight as number) || (props.theme.lineHeights![0] as number),
  fontWeight: (props.fontWeight as number) || (props.theme.fontWeights![0] as number),
}))
