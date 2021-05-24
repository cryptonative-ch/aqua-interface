import React from 'react'
import { theme } from 'src/styles/theme'

// Components
import { TokenPriceLabel } from 'src/components/Badge/TokenPriceLabel'

interface BidTokenPriceLabelProps {
  active: boolean
}

export const BidTokenPriceLabel = ({ active }: BidTokenPriceLabelProps) => {
  if (active) {
    return <TokenPriceLabel backgroundColor={theme.colors.activeBid}>2 IN</TokenPriceLabel>
  }

  return <TokenPriceLabel backgroundColor={theme.colors.inActiveBid}>2 OUT</TokenPriceLabel>
}
