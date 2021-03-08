// Externals
import React, { FunctionComponent, useContext } from 'react'

// Components
import { ActiveBadge, UnactiveTextBadge, ActiveBadgeText, BackgroundBadge } from 'src/components/SaleBadge'

// context
import { AuctionContext, AuctionStatus } from "src/views/Auctions";




export const AuctionNavBar: FunctionComponent = () => {
  const {AuctionShow, setAuctionShow} = useContext(AuctionContext);

  if (AuctionShow === AuctionStatus.UPCOMING) {
    return (
      <BackgroundBadge>
        <UnactiveTextBadge textAlign='left' onClick={() => setAuctionShow(AuctionStatus.LIVE)}>Live</UnactiveTextBadge>
        <ActiveBadge>
          <ActiveBadgeText data-testid='Upcoming'>Upcoming</ActiveBadgeText>
        </ActiveBadge>
        <UnactiveTextBadge  textAlign='right' onClick={() => setAuctionShow(AuctionStatus.CLOSED)}>Closed</UnactiveTextBadge>
      </BackgroundBadge>
    )
  }

  if (AuctionShow === AuctionStatus.CLOSED) {
    return (
      <BackgroundBadge>
        <UnactiveTextBadge textAlign='left' onClick={() => setAuctionShow(AuctionStatus.LIVE)}>Live</UnactiveTextBadge>
        <UnactiveTextBadge onClick={() => setAuctionShow(AuctionStatus.UPCOMING)}>Upcoming</UnactiveTextBadge>
        <ActiveBadge>
          <ActiveBadgeText data-testid='Closed' >Closed</ActiveBadgeText>
        </ActiveBadge>
      </BackgroundBadge>
    )
  }
  return (
    <BackgroundBadge>
      <ActiveBadge>
        <ActiveBadgeText data-testid='Live' >Live</ActiveBadgeText>
      </ActiveBadge>
      <UnactiveTextBadge onClick={() => setAuctionShow(AuctionStatus.UPCOMING)}>Upcoming</UnactiveTextBadge>
      <UnactiveTextBadge textAlign='right' onClick={() => setAuctionShow(AuctionStatus.CLOSED)}>Closed</UnactiveTextBadge>
    </BackgroundBadge>
  )
}
