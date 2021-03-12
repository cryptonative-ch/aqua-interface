// Externals
import React, { useContext } from 'react'

// Components
import { ActiveBadge, TextBadge, BackgroundBadge } from 'src/components/SaleBadge'

// context
import { AuctionContext, AuctionStatus } from 'src/views/Auctions'

export const AuctionNavBar: React.FC = () => {
  const { AuctionShow, setAuctionShow } = useContext(AuctionContext)

  if (AuctionShow === AuctionStatus.UPCOMING) {
    return (
      <BackgroundBadge>
        <TextBadge textAlign="left" onClick={() => setAuctionShow(AuctionStatus.LIVE)}>
          Live
        </TextBadge>
        <ActiveBadge>
          <TextBadge color="active" data-testid="Upcoming">
            Upcoming
          </TextBadge>
        </ActiveBadge>
        <TextBadge textAlign="right" onClick={() => setAuctionShow(AuctionStatus.CLOSED)}>
          Closed
        </TextBadge>
      </BackgroundBadge>
    )
  }

  if (AuctionShow === AuctionStatus.CLOSED) {
    return (
      <BackgroundBadge>
        <TextBadge textAlign="left" onClick={() => setAuctionShow(AuctionStatus.LIVE)}>
          Live
        </TextBadge>
        <TextBadge onClick={() => setAuctionShow(AuctionStatus.UPCOMING)}>Upcoming</TextBadge>
        <ActiveBadge>
          <TextBadge color="active" data-testid="Closed">
            Closed
          </TextBadge>
        </ActiveBadge>
      </BackgroundBadge>
    )
  }
  return (
    <BackgroundBadge>
      <ActiveBadge>
        <TextBadge color="active" data-testid="Live">
          Live
        </TextBadge>
      </ActiveBadge>
      <TextBadge onClick={() => setAuctionShow(AuctionStatus.UPCOMING)}>Upcoming</TextBadge>
      <TextBadge textAlign="right" onClick={() => setAuctionShow(AuctionStatus.CLOSED)}>
        Closed
      </TextBadge>
    </BackgroundBadge>
  )
}
