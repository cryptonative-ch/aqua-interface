import { space, layout, flexbox, SpaceProps, LayoutProps, FlexProps, textAlign, TextAlignProps, LineHeightProps } from 'styled-system'
import styled from 'styled-components'

export type CardBodyProps = SpaceProps & LayoutProps & FlexProps & TextAlignProps

export const CardBody = styled.div<CardBodyProps>(
  props => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    padding: '32px 24px 4px 24px',
    borderBottom: '1px solid #000',
    '&:last-child': {
      borderBottom: 'none',
    },
  }),
  space,
  layout,
  flexbox,
  textAlign
)

export const CardText = styled.text<LineHeightProps>(props => ({
  fontFamily: 'Inter',
  fontSize: props.fontSize === 'title' ? '24px' : '16px',
  fontStyle: 'normal',
  fontWeight: props.fontWeight === 'light' ? 400 : 500, 
  lineHeight: props.lineHeight === 'title' ?  '29.05px' : '19px',
  letterSpacing: '0em',
  color: props.color === 'grey' ? '#7B7F93' : '#000629',

}))
