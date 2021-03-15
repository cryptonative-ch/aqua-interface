// Externals

import { space, layout, flexbox, SpaceProps, LayoutProps, FlexProps, textAlign, TextAlignProps } from 'styled-system'
import styled from 'styled-components'

// Components

import { Card } from 'src/components/CardSale'

export type CardBodyProps = SpaceProps & LayoutProps & FlexProps & TextAlignProps

export const CardBody = styled.div<CardBodyProps>(
  {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    width: '100%',
    padding: '32px 24px 8px 24px',
    borderBottom: '1px solid #000',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  props =>
    `
  @media (max-width: ${props.theme.breakpoints[2]}) {
    padding: 16px 16px 8px 16px
  }
  `,
  Card,
  space,
  layout,
  flexbox,
  textAlign
)
