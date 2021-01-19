import {
  space,
  layout,
  flexbox,
  SpaceProps,
  LayoutProps,
  FlexProps as FlexBaseProps,
  FlexboxProps,
  TextAlignProps,
  textAlign,
} from 'styled-system'
import styled from 'styled-components'

export type FlexProps = SpaceProps & LayoutProps & FlexBaseProps & FlexboxProps & TextAlignProps

export const Flex = styled.div<FlexProps>(
  {
    display: 'flex',
  },
  space,
  layout,
  flexbox,
  textAlign
)
