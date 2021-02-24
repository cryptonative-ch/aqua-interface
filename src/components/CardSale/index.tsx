import { space, layout, flexbox, SpaceProps, LayoutProps, FlexProps, textAlign, TextAlignProps } from 'styled-system'
import styled from 'styled-components'

export type CardProps = SpaceProps & LayoutProps & FlexProps & TextAlignProps

export const Card = styled.div<CardProps>(
  props => ({
    border: `1px solid #000`,
    padding: props.theme.space[0],
    backgroundColor: 'white',
    height: '247px',
    width: '478px',
    borderRadius: '0px',

  }),
  space,
  layout,
  flexbox,
  textAlign
)
