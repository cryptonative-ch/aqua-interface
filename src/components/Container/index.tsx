import { layout, LayoutProps } from 'styled-system'
import styled from 'styled-components'

export interface ContainerProps extends LayoutProps {
  fluid?: boolean
  inner?: boolean
  noPadding?: boolean
}

export const Container = styled.div<ContainerProps>(
  props => ({
    width: '100%',
    paddingLeft: props.noPadding ? 0 : props.theme.space[3],
    paddingRight: props.noPadding ? 0 : props.theme.space[3],
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
  props => `
    @media (min-width: ${props.theme.breakpoints[1]}) {
      max-width: ${props.inner ? props.fluid ? '90vw' : '800px' : '100%'};
    }
  `,
  layout
)

Container.defaultProps = {
  fluid: false,
  inner: true,
  noPadding: false
}
