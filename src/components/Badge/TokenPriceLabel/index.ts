import React from 'react'
import styled from 'styled-components'
import { ColorProps, SpaceProps, color, space } from 'styled-system'

export type TokenPriceLabelProps = ColorProps & SpaceProps

export const TokenPriceLabel = styled.div<TokenPriceLabelProps>(
  props => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
    padding: '4px 8px',
    color: props.theme.colors.text,
  }),
  color,
  space
)
