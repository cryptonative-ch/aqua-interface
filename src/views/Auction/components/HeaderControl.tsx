// External
import styled from 'styled-components'
import React from 'react'

// Components
import { Flex } from 'src/components/Flex'

// Svg
import LogoSVG from 'src/assets/svg/Logo.svg'
import DownSVG from 'src/assets/svg/Down-Arrow.svg'
import UpSVG from 'src/assets/svg/Up-Arrow.svg'

const ControlTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #000629;
`

const ControlButton = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #7B7F93;
`

const LogoImg = styled.img`
  width: 60px;
  height: 18px;
  margin-left: 4px;
`

const ArrowImg = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 4px;
`

interface HeaderControlProps {
  status: string
  showGraph: boolean
}

export function HeaderControl({ status, showGraph }: HeaderControlProps) {
  return (
    <Flex flexDirection="row" justifyContent="space-between" alignItems="center" flex={1}>
      <Flex flexDirection="row" alignItems="center" justifyContent="flex-start">
        <ControlTitle>How is the Current Price (CP) calculated?</ControlTitle>
        {status === 'closed' && (
          <LogoImg src={LogoSVG} />
        )}
      </Flex>
      <Flex flexDirection="row" alignItems="center" justifyContent="flex-start">
        <ControlButton>View Live Graph</ControlButton>
        {status === 'active' && (
          <ArrowImg src={showGraph ? DownSVG : UpSVG} />
        )}
      </Flex>
    </Flex>
  )
}

HeaderControl.defaultProps = {
  status: 'active',
  showGraph: false
}
