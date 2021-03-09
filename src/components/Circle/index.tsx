// External
import styled from 'styled-components'
import { LayoutProps, OpacityProps, PositionProps} from 'styled-system'


export type CircleProps = LayoutProps & OpacityProps & PositionProps

export const Circle = styled.svg<CircleProps>(
  props => ({
    background: '#304ffe',
    opacity: props.opacity === 'light' ? '15%' : '100%',
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    margin: '2px 0px 0px 8px',
  })
)




