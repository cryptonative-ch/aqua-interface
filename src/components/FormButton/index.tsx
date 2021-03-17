// External
import styled from 'styled-components'
import {
  fontSize,
  fontStyle,
  FontStyleProps,
  FontSizeProps,
  fontWeight,
  LineHeightProps,
  BackgroundProps,
  lineHeight,
  FontWeightProps,
  SizeProps,
  space,
  variant,
  layout,
  LayoutProps,
  background,
  color,
  ColorProps,
  SpaceProps
} from 'styled-system'

export type ButtonProps = SizeProps &
  FontStyleProps &
  LayoutProps &
  LineHeightProps &
  FontSizeProps &
  BackgroundProps &
  ColorProps &
  FontWeightProps &
  SpaceProps

export const FormButton = styled.button<ButtonProps>(
  () => ({
    appearance: 'none',
    textAlign: 'center',
    display: 'inline-block',
    verticalAlign: 'middle',
    userSelect: 'none',
    backgroundColor: 'transparent',
    fontSize: '1rem',
    fontWeight: 400,
    fontFamily: 'inherit',
    lineHeight: 1.5,
    color: 'black',
    border: 'none',
    outline: 'none',
    ':disabled': {
      opacity: 1
    },
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      outline: 'none',
    },
    textDecoration: 'none'
  }),
  fontSize,
  fontWeight,
  fontStyle,
  space,
  layout,
  color,
  lineHeight,
  variant({
    variants: {
      primary: {
        bg: 'white',
      },
      link: {
        bg: 'transparent',
      },
    },
  }),
  background,
)
