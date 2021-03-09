// Externals

import { space, layout, flexbox, SpaceProps, LayoutProps, FlexProps, textAlign, TextAlignProps } from 'styled-system'
import styled from 'styled-components'

export type CardBodyProps = SpaceProps & LayoutProps & FlexProps & TextAlignProps

export const CardBody = styled.div<CardBodyProps>(
  {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    padding: '32px 24px 0px 24px',
    borderBottom: '1px solid #000',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  space,
  layout,
  flexbox,
  textAlign
)
