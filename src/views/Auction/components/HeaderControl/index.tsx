// External
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import React from 'react'

// Components
import { Flex } from 'src/components/Flex'
import { FormButton } from 'src/components/FormButton'

// Svg
import LogoSVG from 'src/assets/svg/Logo.svg'
import DownSVG from 'src/assets/svg/Down-Arrow.svg'
import UpSVG from 'src/assets/svg/Up-Arrow.svg'
import { useWindowSize } from 'src/hooks/useWindowSize'

const ControlTitle = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '17px',
  color: '#000629',
})

const ControlButton = styled.div<SpaceProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
    color: '#7B7F93',
  }),
  space
)

const FixedTitle = styled.div({
  fontSize: '16px',
  lineHeight: '19px',
  color: '#000629',
  fontWeight: 500,
})

const FixedDescription = styled.div({
  fontSize: '16px',
  lineHeight: '19px',
  color: '#304FFE',
  fontWeight: 400,
  textAlign: 'right',
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end'
})

const FixedDescription2 = styled.div({
  color: '#7B7F93',
  margin: '0 5px'
})

const FixedDescription3 = styled.div({
  color: '#000629',
})

const BarContainer = styled.div({
  height: '8px',
  borderRadius: '8px',
  backgroundColor: '#DDDDE3',
  display: 'flex',
  margin: '16px 0 8px 0',
  alignItems: 'center',
  position: 'relative'
})

const BarMarker = styled.div({
  width: '6px',
  height: '6px',
  borderRadius: '6px',
  backgroundColor: '#7B7F93',
  marginLeft: '20%',
  position: 'absolute',
})

const BarActive = styled.div({
  height: '8px',
  borderRadius: '8px',
  width: '10%',
  backgroundColor: '#304FFE'
})

const LogoImg = styled.img({
  width: '60px',
  height: '18px',
  marginLeft: '4px',
})

const ArrowImg = styled.img({
  width: '16px',
  height: '16px',
  marginLeft: '4px',
})

interface HeaderControlProps {
  status: string
  showGraph: boolean
  isFixed?: boolean
  toggleGraph: () => void
}

export function HeaderControl({ status, showGraph, toggleGraph, isFixed }: HeaderControlProps) {
  const { isMobile } = useWindowSize()
  if (isFixed && status === 'active') {
    return (
      <Flex flexDirection="column" flex={1}>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          flex={1}
        >
          <FixedTitle>Sale Progress</FixedTitle>
          <FixedDescription>
            9,000
            <FixedDescription2>(9%)</FixedDescription2>
            <FixedDescription3>/ 100,000</FixedDescription3>
          </FixedDescription>
        </Flex>
        <BarContainer>
          <BarActive></BarActive>
          <BarMarker></BarMarker>
        </BarContainer>
        <ControlButton ml="calc(20% - 66px)">
          {'Min. Threshold 20%'}
        </ControlButton>
      </Flex>
    )
  }

  if (isMobile && status === 'closed') {
    return (
      <Flex flexDirection="column" justifyContent="space-between" alignItems="center" flex={1}>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent={isMobile && status === 'closed' ? 'center' : 'flex-start'}
          flex={1}
        >
          <ControlTitle>You can get ERT on</ControlTitle>
          <LogoImg data-testid="logo-img" src={LogoSVG} />
        </Flex>
        <FormButton
          disabled={false}
          type="button"
          height="48px"
          fontWeight="500"
          padding="0 50px"
          fontSize="14px"
          lineHeight="21px"
          background="#304FFE"
          color="#fff"
          marginTop="16px"
          width="calc(100%)"
        >
          Go to Swapr
        </FormButton>
      </Flex>
    )
  }

  return (
    <Flex flexDirection="row" justifyContent="space-between" alignItems="center" flex={1}>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent={isMobile && status === 'closed' ? 'center' : 'flex-start'}
        flex={1}
      >
        <ControlTitle>
          {status === 'closed'
            ? 'Missed out on the sale? You can get ERT on'
            : 'How is the Current Price (CP) calculated?'}
        </ControlTitle>
        {status === 'closed' && <LogoImg data-testid="logo-img" src={LogoSVG} />}
      </Flex>
      {status === 'closed' ? (
        <FormButton
          disabled={false}
          type="button"
          height="48px"
          fontWeight="500"
          padding="0 50px"
          fontSize="14px"
          lineHeight="21px"
          background="#304FFE"
          color="#fff"
        >
          Go to Swapr
        </FormButton>
      ) : (
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          style={{ cursor: 'pointer' }}
          onClick={toggleGraph}
        >
          {!isMobile && <ControlButton>View Live Graph</ControlButton>}
          {status === 'active' && <ArrowImg data-testid="graph-img" src={showGraph ? UpSVG : DownSVG} />}
        </Flex>
      )}
    </Flex>
  )
}

HeaderControl.defaultProps = {
  status: 'active',
  showGraph: false,
  isFixed: false,
  toggleGraph: () => {
    return
  },
}
