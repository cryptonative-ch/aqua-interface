import { layout, LayoutProps } from 'styled-system'
import styled from 'styled-components'

export interface ContainerProps extends LayoutProps {
  fluid?: boolean
}

export const Container = styled.div<ContainerProps>(
  props => ({
    paddingLeft: props.theme.space[3],
    paddingRight: props.theme.space[3],
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'absolute',
    top: '285px',
    // bottom: '445px',
  }),
  props => `
    @media (min-width: ${props.theme.breakpoints[1]}) {
      max-width: ${props.fluid ? '90vw' : '1200px'};
    }
  `,
  layout
)

Container.defaultProps = {
  fluid: false,
}
