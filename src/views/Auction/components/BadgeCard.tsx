// External
import React, { FunctionComponent } from 'react'

//Components
import { Badge, Content } from 'src/components/Badge'

interface BadgeCardProps {
  saleType: 'private' | 'presale'
}

export const BadgeCard: FunctionComponent<BadgeCardProps> = ({ saleType }) => {
  if (saleType == 'presale') {
    return (
      <Badge width='presale'>
        <Content>Pre-sale</Content>
      </Badge>
    )
  } else if (saleType == 'private') {
    return (
      <Badge>
        <Content>Private</Content>
      </Badge>
    )
  }
  return null
}
