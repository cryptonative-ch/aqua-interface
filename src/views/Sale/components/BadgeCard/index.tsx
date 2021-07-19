// External
import React from 'react'

//Components
import { Badge } from 'src/components/Badge'

interface BadgeCardProps {
  saleType: 'public' | 'presale'
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ saleType }) => {
  if (saleType == 'presale') {
    return <Badge width="presale">Pre-Sale</Badge>
  } else if (saleType == 'public') {
    return <Badge>Public</Badge>
  }
  return null
}
