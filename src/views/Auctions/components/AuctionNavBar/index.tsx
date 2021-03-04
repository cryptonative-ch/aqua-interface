// Externals
import React, { FunctionComponent, useState } from 'react'

// Components
import { ActiveBadge, UnactiveTextBadge, ActiveBadgeText, BackgroundBadge } from 'src/components/SaleBadge'
/**
 * button is clicked
 * components are revealed and disrevealed
 * use states that filters different components
 * checking
 */

export enum AuctionStatus {
  LIVE = 'Live',
  UPCOMING = 'upcoming',
  CLOSED = 'closed',
}

export const AuctionNavBar: FunctionComponent = () => {
  const [AuctionShow, setShowAuction] = useState<AuctionStatus>(AuctionStatus.LIVE)
  
  if (AuctionShow === AuctionStatus.UPCOMING) {
    return (
      <BackgroundBadge>
        <UnactiveTextBadge onClick={() => setShowAuction(AuctionStatus.LIVE)}>Live</UnactiveTextBadge>
        <ActiveBadge>
          <ActiveBadgeText>Upcoming</ActiveBadgeText>
        </ActiveBadge>
        <UnactiveTextBadge onClick={() => setShowAuction(AuctionStatus.CLOSED)}>Closed</UnactiveTextBadge>
      </BackgroundBadge>
    )
  } else if (AuctionShow === AuctionStatus.CLOSED) {
    <BackgroundBadge>
      <UnactiveTextBadge onClick={() => setShowAuction(AuctionStatus.LIVE)}>Live</UnactiveTextBadge>
      <UnactiveTextBadge onClick={() => setShowAuction(AuctionStatus.UPCOMING)}>Upcoming</UnactiveTextBadge>
      <ActiveBadge>
        <ActiveBadgeText>Closed</ActiveBadgeText>
      </ActiveBadge>
    </BackgroundBadge>
  }
  return (
    <BackgroundBadge>
      <ActiveBadge>
        <ActiveBadgeText>Live</ActiveBadgeText>
      </ActiveBadge>
      <UnactiveTextBadge onClick={() => setShowAuction(AuctionStatus.UPCOMING)}>Upcoming</UnactiveTextBadge>
      <UnactiveTextBadge onClick={() => setShowAuction(AuctionStatus.CLOSED)}>Closed</UnactiveTextBadge>
    </BackgroundBadge>
  )
}
