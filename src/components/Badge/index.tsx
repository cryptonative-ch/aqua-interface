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

export const Content = styled.h3({
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  letterSpacing: '0',
  textAlign: 'center',
  color: 'white',
  justifyContent: 'center',
  margin: '0px',
  padding: '2px 4px',
})
