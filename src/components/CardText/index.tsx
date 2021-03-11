// Externals

import styled from 'styled-components'
import { LineHeightProps, FontSizeProps, FontWeightProps } from 'styled-system'

export type CardTextProps = FontSizeProps & FontWeightProps & LineHeightProps

export const CardText = styled.p<CardTextProps>(
  props => ({
    fontFamily: 'Inter',
    fontSize: props.fontSize === 'title' ? '24px' : '16px',
    fontStyle: 'normal',
    fontWeight: props.fontWeight === 'light' ? 400 : 500,
    lineHeight: props.lineHeight === 'title' ? '29.05px' : '19px',
    letterSpacing: '0em',
    color: props.color === 'grey' ? '#7B7F93' : '#000629',
    height: props.fontSize === 'title' ? '24px' : '19px',
  }),
  props =>
    `
@media (max-width: ${props.theme.breakpoints[2]}) {
  fontSize: ${props.fontSize === 'title' ? '16px' : '14px'},
  fontWeight: ${props.fontWeight === 'light' ? 400 : 500},
  lineHeight: ${props.lineHeight === 'title' ? '19.36px' : '16.94px'},
  height: ${props.fontSize === 'title' ? '19px' : '17px'},

}
`,

)
