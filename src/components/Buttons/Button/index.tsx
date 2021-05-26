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
} from 'styled-system'

export type ButtonProps = SizeProps &
  FontStyleProps &
  LayoutProps &
  LineHeightProps &
  FontSizeProps &
  BackgroundProps &
  ColorProps &
  FontWeightProps & {
    variant?: string
    rounded?: boolean
    padding?: boolean
    border?: boolean
    margin?: boolean
    formButton?: boolean
  }

export const Button = styled.button<ButtonProps>(
  props => ({
    appearance: 'none',
    padding: props.padding ? '0px' : '12px 16px',
    margin: props.formButton ? '8px 0 0 0' : props.margin ? '5px' : 'auto',
    textAlign: 'center',
    display: 'inline-block',
    verticalAlign: 'middle',
    userSelect: 'none',
    backgroundColor: 'transparent',
    border: props.border || props.formButton ? 'none' : `1px solid ${props.theme.colors.highlightColor}`,
    // @TODO: Move radis to Theme
    borderRadius: props.formButton ? 0 : props.rounded ? '32px' : props.theme.radii.base,
    fontSize: '1rem',
    fontWeight: 400,
    fontFamily: 'inherit',
    lineHeight: 1.5,
    outline: props.formButton ? 'none' : 'unset',
    color: 'black',
    ':disabled': {
      opacity: props.formButton ? 1 : 0.5,
    },
    ':hover': {
      textDecoration: 'underline',
    },
    ':focus': {
      outline: props.formButton ? 'none' : 'unset',
    },
    textDecoration: 'none',
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
  background
)

Button.defaultProps = {
  rounded: false,
  formButton: false,
  variant: 'primary',
}