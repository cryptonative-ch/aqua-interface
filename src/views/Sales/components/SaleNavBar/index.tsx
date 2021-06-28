// Externals
import React from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { Badge, BackgroundBadge } from 'src/components/SaleBadge'

// context
import { SaleStatus } from 'src/views/Sales'

export interface NavBarProps {
  state: SaleStatus
  setStatus: (SaleStatus: SaleStatus) => void
}

export const SaleNavBar: React.FC<NavBarProps> = ({ state, setStatus }) => {
  const [t] = useTranslation()

  return (
    <BackgroundBadge>
      <Badge
        data-testid="live"
        active={state == SaleStatus.LIVE ? true : false}
        onClick={() => setStatus(SaleStatus.LIVE)}
      >
        {t('texts.live')}
      </Badge>
      <Badge
        data-testid="upcoming"
        active={state == SaleStatus.UPCOMING ? true : false}
        onClick={() => setStatus(SaleStatus.UPCOMING)}
      >
        {t('texts.upcoming')}
      </Badge>
      <Badge
        data-testid="closed"
        active={state == SaleStatus.CLOSED ? true : false}
        onClick={() => setStatus(SaleStatus.CLOSED)}
      >
        {t('texts.closed')}
      </Badge>
    </BackgroundBadge>
  )
}
