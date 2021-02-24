import { space, layout, flexbox, SpaceProps, LayoutProps, FlexProps, textAlign, TextAlignProps } from 'styled-system'
import styled from 'styled-components'

export type CardBodyProps = SpaceProps & LayoutProps & FlexProps & TextAlignProps

export const CardBody = styled.div<CardBodyProps>(
  props => ({
    padding: props.theme.space[3],
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
