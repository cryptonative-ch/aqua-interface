// Externals
import React, { FunctionComponent } from 'react'

// Components
import { ActiveBadge, UnactiveTextBadge, ActiveBadgeText, BackgroundBadge } from 'src/components/SaleBadge'

export const AuctionNavBar: FunctionComponent = () => {
  return (
    <BackgroundBadge>
      <ActiveBadge>
        <ActiveBadgeText>Live</ActiveBadgeText>
      </ActiveBadge>
      <UnactiveTextBadge>Upcoming</UnactiveTextBadge>
      <UnactiveTextBadge>Closed</UnactiveTextBadge>
    </BackgroundBadge>
  )
}
