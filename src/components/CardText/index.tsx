// Externals

import styled from 'styled-components'
import { LineHeightProps, FontSizeProps, FontWeightProps, LayoutProps } from 'styled-system'

// Components
import { Flex } from 'src/components/Flex'
import { Property } from 'csstype'

export type CardTextProps = FontSizeProps & FontWeightProps & LineHeightProps & LayoutProps

export const CardText = styled.p<CardTextProps>(
  Flex,
  props => ({
    overflow: props.overflow as Property.Overflow || 'hidden',
    textOverflow:'ellipsis',
    whiteSpace: 'nowrap',
    fontFamily: 'Inter',
    fontSize: props.fontSize === 'title' ? '24px' : '16px',
    fontStyle: 'normal',
    fontWeight: props.fontWeight === 'light' ? 400 : 500,
    lineHeight: props.fontSize === 'title' ? '29px' : '19px',
    letterSpacing: '0',
    color: props.color === 'grey' ? '#7B7F93' : '#000629',
    height: props.fontSize === 'title' ? '30px' : '19px',
    margin: props.fontSize === 'title' ? '0 8px 0 0' : '8px 0px',
    width: props.fontSize === 'title' ? '80%' : 'auto',
  }),
  props =>
    `
@media (max-width: ${props.theme.breakpoints[2]}) {
  font-size: ${props.fontSize === 'title' ? '16px' : '14px'};
  font-weight: ${props.fontWeight === 'light' ? 400 : 500};
  line-height: ${props.fontSize === 'title' ? '19px' : '17px'};
  height: ${props.fontSize === 'title' ? '19px' : '17px'};
}
`
)
