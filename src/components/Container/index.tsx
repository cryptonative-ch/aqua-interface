import { layout, LayoutProps, PositionProps } from 'styled-system'
import styled from 'styled-components'

export type ContainerProps = LayoutProps &
  PositionProps & {
    fluid?: boolean
    inner?: boolean
    noPadding?: boolean
  }

export const Container = styled.div<ContainerProps>(
  props => ({
    Height: '100%',
    width: '100%',
    paddingLeft: props.noPadding ? 0 : props.theme.space[3],
    paddingRight: props.noPadding ? 0 : props.theme.space[3],
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
  }),
  props => `
    @media (min-width: ${props.theme.breakpoints[0]}) {
      max-width: ${props.inner ? (props.fluid ? '90vw' : '1012px') : '100%'};
      padding-left: ${props.noPadding ? 0 : props.theme.space[3] + 'px'};
      padding-right: ${props.noPadding ? 0 : props.theme.space[3] + 'px'};
      
    }
  `,
  props => `
    @media only screen and (min-width: 620px) and (max-width: ${props.theme.breakpoints[2]})  {
      padding-left: ${props.noPadding ? 0 : 'calc(20%)'};
      padding-right: ${props.noPadding ? 0 : 'calc(20%)'};
    }
  `,
  layout
)

Container.defaultProps = {
  fluid: false,
  inner: true,
  noPadding: false,
}
