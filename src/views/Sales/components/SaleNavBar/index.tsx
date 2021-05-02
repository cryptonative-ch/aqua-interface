// Externals
import React, { useContext } from 'react'

// Components
import { ActiveBadge, TextBadge, BackgroundBadge } from 'src/components/SaleBadge'

// context
import { SaleContext, SaleStatus } from 'src/views/Sales'

export const SaleNavBar: React.FC = () => {
  const { SaleShow, setSaleShow } = useContext(SaleContext)

  if (SaleShow === SaleStatus.UPCOMING) {
    return (
      <BackgroundBadge>
        <TextBadge data-testid="upcoming live click" textAlign="left" onClick={() => setSaleShow(SaleStatus.LIVE)}>
          Live
        </TextBadge>
        <ActiveBadge>
          <TextBadge color="active" data-testid="Upcoming">
            Upcoming
          </TextBadge>
        </ActiveBadge>
        <TextBadge data-testid="upcoming close click" textAlign="right" onClick={() => setSaleShow(SaleStatus.CLOSED)}>
          Closed
        </TextBadge>
      </BackgroundBadge>
    )
  }

  if (SaleShow === SaleStatus.CLOSED) {
    return (
      <BackgroundBadge>
        <TextBadge data-testid="closed live click" textAlign="left" onClick={() => setSaleShow(SaleStatus.LIVE)}>
          Live
        </TextBadge>
        <TextBadge data-testid="closedupcomingclick" onClick={() => setSaleShow(SaleStatus.UPCOMING)}>
          Upcoming
        </TextBadge>
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
      <TextBadge data-testid="live upcoming click" onClick={() => setSaleShow(SaleStatus.UPCOMING)}>
        Upcoming
      </TextBadge>
      <TextBadge data-testid="live closed click" textAlign="right" onClick={() => setSaleShow(SaleStatus.CLOSED)}>
        Closed
      </TextBadge>
    </BackgroundBadge>
  )
}
