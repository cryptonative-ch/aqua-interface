// External
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

//Interfaces
import { Sale } from 'src/interfaces/Sale'

// Components

import { secondsTohms } from 'src/views/Sale/components/Timer'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'
import { isSaleOpen, isSaleUpcoming } from 'src/aqua/sale'
import { useWindowSize } from 'src/hooks/useWindowSize'
import { Flex } from 'src/components/Flex'

// Svg
import noToken from 'src/assets/svg/no-token-image.svg'

const HeaderText = styled.div({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '36px',
  lineHeight: '44px',
  color: '#000629',
  margin: '0 40px 0 16px',
})

const StatusText = styled.div({
  padding: '4px 8px',
  background: '#000629',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#ffffff',
})

const TimeText = styled.div({
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '36px',
  lineHeight: '44px',
  textAlign: 'right',
  color: '#7b7f93',
  marginLeft: 'auto',
})

const MobileHeaderText = styled.div({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '36px',
  lineHeight: '44px',
  color: '#000629',
  margin: '0 16px 0 0',
})

const MobileStatusText = styled.div({
  padding: '4px 8px',
  background: '#000629',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#ffffff',
  height: '28px',
  margin: '8px 0',
})

type HeaderContainerProps = {
  isMobile: boolean
}

const HeaderContainer = styled.div<HeaderContainerProps>(props => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: props.isMobile ? 'flex-start' : 'center',
  justifyContent: 'flex-start',
  margin: '24px 0',
  padding: props.isMobile ? '0 24px' : 0,
}))

const TokenIconContainer = styled.img({
  width: '60px',
  height: '60px',
  borderRadius: '60px',
})

const MobileTokenContainer = styled.img({
  width: '48px',
  height: '48px',
  borderRadius: '48px',
})
interface SaleHeaderProps {
  sale: Sale
}

export const SaleHeader: React.FC<SaleHeaderProps> = ({ sale }) => {
  const { isMobile } = useWindowSize()

  // calculating time difference between local persons time and the start and end block times
  const time_diff_start: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(sale.startDate))
  const time_diff_end: number = Math.abs(dayjs(Date.now()).unix() - convertUtcTimestampToLocal(sale.endDate))

  // setting state to update the timer more frequently than the bids
  const [, setTime] = useState(0)

  // re-renders component every second
  useEffect(() => {
    const interval = setInterval(() => setTime(PrevTime => PrevTime + 1), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  let format_time = ''
  if (isSaleUpcoming(sale)) {
    format_time = secondsTohms(time_diff_start)
  } else if (isSaleOpen(sale)) {
    format_time = secondsTohms(time_diff_end)
  }

  if (isMobile) {
    return (
      <HeaderContainer isMobile={isMobile}>
        <MobileTokenContainer src={sale.tokenOut?.icon || noToken} />
        <Flex flexDirection="row" flexWrap="wrap" marginLeft="16px">
          <MobileHeaderText>{`${sale.name}`}</MobileHeaderText>
          <MobileStatusText>Public</MobileStatusText>
        </Flex>
      </HeaderContainer>
    )
  }

  return (
    <HeaderContainer isMobile={isMobile}>
      <TokenIconContainer src={sale.tokenOut?.icon || noToken} />
      <HeaderText>{`${sale.name}`}</HeaderText>
      <StatusText>Public</StatusText>
      {isSaleOpen(sale) && <TimeText data-testid="format_time">{format_time}</TimeText>}
    </HeaderContainer>
  )
}
