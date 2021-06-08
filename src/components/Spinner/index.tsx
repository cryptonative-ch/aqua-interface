// Externals
import styled, { keyframes, css } from 'styled-components'
import { BorderProps, LayoutProps, ColorProps } from 'styled-system'

type SpinnerProps = BorderProps &
  LayoutProps &
  ColorProps & {
    size?: string
    color?: string
  }

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const Spinner = styled.div<SpinnerProps>(
  props => ({
    border: `0.2em solid ${props.color ? props.color : '#304FFE'}`,
    borderTop: '0.2em solid rgba(48, 79, 254, 0.1)',
    borderRadius: '50%',
    width: props.size ? props.size : '2.28571429rem',
    height: props.size ? props.size : '2.28571429rem',
  }),
  css`
    animation: ${spin} 2s linear infinite;
  `
)
