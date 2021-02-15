// External
import styled from 'styled-components'
import {
  fontSize,
  fontStyle,
  FontStyleProps,
  fontWeight,
  FontWeightProps,
  SizeProps,
  space,
  variant,
} from 'styled-system'

export type ButtonProps = SizeProps &
  FontStyleProps &
  FontWeightProps & {
    variant?: string
    rounded?: boolean
  }

export const Button = styled.button<ButtonProps>(
  props => ({
    appearance: 'none',
    padding: '12px 16px',
    textAlign: 'center',
    display: 'inline-block',
    verticalAlign: 'middle',
    userSelect: 'none',
    backgroundColor: 'transparent',
    border: `1px solid ${props.theme.colors.primary}`,
    // @TODO: Move radis to Theme
    borderRadius: props.rounded ? '32px' : props.theme.radii.base,
    fontSize: '1rem',
    fontWeight: 400,
    fontFamily: 'inherit',
    lineHeight: 1.5,
    color: 'black',
    ':disabled': {
      opacity: 0.5,
    },
    ':hover': {
      textDecoration: 'underline',
    },
  }),
  fontSize,
  fontWeight,
  fontStyle,
  space,
  variant({
    variants: {
      primary: {
        bg: 'white',
      },
      link: {
        bg: 'transparent',
      },
    },
  })
)

Button.defaultProps = {
  rounded: false,
  variant: 'primary',
}

export const ConfirmButton = styled.button`
  font-size: 12px;
  align-items: center;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: flex;
  line-height: 16px;
  font-weight: 400;
  height: 40px;
  justify-content: center;
  letter-spacing: 0.2px;
  outline: none;
  padding: 12px 17px;
  pointer-events: 'none';
  text-align: center;
  transition: all 0.15s ease-out;
  user-select: none;
  white-space: nowrap;
  font-family: Roboto;
  margin: 20px 0 0 auto;
  background-color: rgb(92, 107, 192);
  border-color: rgb(92, 107, 192);
  color: rgb(255, 255, 255);

  @media (min-width: 800px) {
    font-size: 14px;
  }
`