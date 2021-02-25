import { space, layout, flexbox, SpaceProps, LayoutProps, FlexProps, textAlign, TextAlignProps } from 'styled-system'
import styled from 'styled-components'

export type CardProps = SpaceProps & LayoutProps & FlexProps & TextAlignProps

/**
 * 
 * @todo allow change in height for personal bids
 */
export const Card = styled.div<CardProps>(
  props => ({
    padding: props.theme.space[0],
    backgroundColor: 'white',
    // height: props.height ? '247px' : '290px',
    height: '247px',
    width: '478px',
    borderRadius: '0px',

  }),
  space,
  layout,
  flexbox,
  textAlign
)
