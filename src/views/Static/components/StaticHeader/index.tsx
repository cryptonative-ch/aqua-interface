// External
import styled from 'styled-components'
import React from 'react'

// Utils
import { useWindowSize } from 'src/hooks/useWindowSize'
import { Flex } from 'src/components/Flex'

// Svg
import MesaSVG from 'src/assets/svg/Mesa.svg'

const HeaderText = styled.div({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '36px',
  lineHeight: '44px',
  color: '#000629',
  margin: '0 40px 0 16px',
})

const MobileHeaderText = styled.div({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '36px',
  lineHeight: '44px',
  color: '#000629',
  margin: '0 16px 0 0',
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

const IconContainer = styled.img({
  width: '60px',
  height: '60px',
  borderRadius: '60px',
})

const MobileIconContainer = styled.img({
  width: '48px',
  height: '48px',
  borderRadius: '48px',
})

export const StaticHeader: React.FC = () => {
  const { isMobile } = useWindowSize()

  if (isMobile) {
    return (
      <HeaderContainer isMobile={isMobile}>
        <MobileIconContainer src={MesaSVG} />
        <Flex flexDirection="row" flexWrap="wrap" marginLeft="16px">
          <MobileHeaderText>About Aqua</MobileHeaderText>
        </Flex>
      </HeaderContainer>
    )
  }

  return (
    <HeaderContainer isMobile={isMobile}>
      <IconContainer src={MesaSVG} />
      <HeaderText>About Aqua</HeaderText>
    </HeaderContainer>
  )
}
