// External
import styled from 'styled-components'
import { LayoutProps, ColorProps, layout, color } from 'styled-system'

type BadgeProps = LayoutProps &
  ColorProps & {
    width?: string
  }

export const Badge = styled.div<BadgeProps>(
  props => ({
    height: '27px',
    width: props.width === 'presale' ? '80px' : '70px',
    borderRadius: '0px',
    background: '#000629',
    justifyContent: 'center',
    margin: '0px 4px',
  }),
  layout,
  color
)

export const Content = styled.h3`
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: center;
  color: white;
  justify-content: center;
  margin: 0px;
  padding: 2px 4px;
`
