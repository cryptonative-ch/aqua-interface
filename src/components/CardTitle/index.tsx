import { fontSize, FontSizeProps, fontWeight, FontWeightProps, lineHeight, LineHeightProps } from 'styled-system'
import styled from 'styled-components'

export type CardTitleProps = FontSizeProps & FontWeightProps & LineHeightProps

export const CardTitle = styled.div<CardTitleProps>(
  props => ({
    fontSize: props.theme.fontSizes[3],
  }),
  fontSize,
  lineHeight,
  fontWeight
)
