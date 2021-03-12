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
    lineHeight: props.fontSize === 'title' ? '29px' : '19px',
    letterSpacing: '0',
    color: props.color === 'grey' ? '#7B7F93' : '#000629',
    height: props.fontSize === 'title' ? '24px' : '19px',
    margin: '0',
    width: props.fontSize === 'title' ? '100px' : 'auto',
  }),
  props =>
    `
@media (max-width: ${props.theme.breakpoints[2]}) {
  font-size: ${props.fontSize === 'title' ? '16px' : '14px'};
  font-weight: ${props.fontWeight === 'light' ? 400 : 500};
  line-height: ${props.fontSize === 'title' ? '19px' : '17px'};
  height: ${props.fontSize === 'title' ? '19px' : '17px'};
  width: ${props.fontSize === 'title' ? '67px' : 'auto'};

}
`,

)
