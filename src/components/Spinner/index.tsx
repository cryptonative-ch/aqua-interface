// Externals
import styled, { keyframes, css } from 'styled-components'
import { BorderProps, LayoutProps, ColorProps } from 'styled-system'

type SpinnerProps = BorderProps & LayoutProps & ColorProps

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const Spinner = styled.div<SpinnerProps>(
  {
    border: '0.2em solid #304FFE',
    borderTop: '0.2em solid rgba(48, 79, 254, 0.1)',
    borderRadius: '50%',
    width: '2.28571429rem',
    height: '2.28571429rem',
  },
  css`
    animation: ${spin} 2s linear infinite;
  `
)
