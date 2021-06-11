// External
import React from 'react'

//Components
import { Badge, Content } from 'src/components/Badge'

interface BadgeCardProps {
  saleType: 'public' | 'presale'
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ saleType }) => {
  if (saleType == 'presale') {
    return (
      <Badge width="presale">
        <Content>Pre-sale</Content>
      </Badge>
    )
  } else if (saleType == 'public') {
    return (
      <Badge>
        <Content>Public</Content>
      </Badge>
    )
  }
  return null
}
