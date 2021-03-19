// External
import styled from 'styled-components'
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
  borderTop,
  BorderTopProps,
  ColorProps,
  color
} from 'styled-system'

export type FlexProps = SpaceProps & LayoutProps & FlexBaseProps & FlexboxProps & TextAlignProps & BorderTopProps & ColorProps

export const Flex = styled.div<FlexProps>(
  {
    display: 'flex',
  },
  space,
  color,
  layout,
  flexbox,
  textAlign,
  borderTop,
)
