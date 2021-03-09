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
  BorderTopProps
} from 'styled-system'

export type FlexProps = SpaceProps & LayoutProps & FlexBaseProps & FlexboxProps & TextAlignProps & BorderTopProps

export const Flex = styled.div<FlexProps>(
  {
    display: 'flex',
  },
  space,
  layout,
  flexbox,
  textAlign,
  borderTop
)
