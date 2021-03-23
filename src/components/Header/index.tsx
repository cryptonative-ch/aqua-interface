// External
import React, { useState, useEffect } from 'react'
import { useWindowSize } from 'src/hooks/useWindowSize'
import { useWallet } from 'use-wallet'
// Svg
import MenuImg from 'src/assets/svg/Menu-Icon.svg'
import CloseImg from 'src/assets/svg/Close.svg'

// Internal
import { Wrapper, Row, Title, Description, Button, ButtonText, ButtonImage, MenuIcon, MobileMenu, MenuOption, MenuBorder } from './style'

// Component
import { Flex } from 'src/components/Flex'

export interface HeaderProps {
  connectWallet?: () => void
  isConnecting?: boolean
}

export const Header: React.FC<HeaderProps> = ({ connectWallet, isConnecting = false }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const wallet = useWallet()
  const { isMobile } = useWindowSize()

  const walletAddress = wallet.account ? `${wallet.account.substr(0, 6)}...${wallet.account.substr(-4)}` : ''

  const disconnectWallet = () => {
    wallet.reset()
  }

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [menuOpen])

  if (isMobile) {
    return (
      <Wrapper padding="0 0 0 24px">
        <MobileMenu expanded={menuOpen}>
          <Wrapper padding="0 0 0 24px" backgroundColor="#F2F2F2">
            <Flex flexDirection="column" flex={1}>
              <Title>Mesa</Title>
              <Description marginLeft="0">from DXdao</Description>
            </Flex>
            <MenuIcon src={CloseImg} onClick={() => setMenuOpen(false)} />
          </Wrapper>
          {walletAddress.length > 0 ? (
            <Flex padding="24px" flex={1} flexDirection="column">
              <MenuOption paddingTop="0" marginBottom="4px">Connected with MetaMask</MenuOption>
              <MenuOption paddingTop="0" marginBottom="16px" color="#000629">{walletAddress}</MenuOption>
              <Button
                onClick={disconnectWallet}
                backgroundColor="#7B7F93"
                textColor="white"
                padding="0"
                width="100%"
                margin="0"
                justifyContent="center"
              >
                <ButtonText>Disconnect</ButtonText>
              </Button>
            </Flex>
          ) : (
            <Flex padding="24px" flex={1} flexDirection="column">
              <Button
                onClick={connectWallet}
                backgroundColor="#7B7F93"
                textColor="white"
                padding="0"
                width="100%"
                margin="0"
                justifyContent="center"
              >
                <ButtonText>{isConnecting ? 'Connecting...' : !wallet.account ? 'Connect' : walletAddress}</ButtonText>
              </Button>
            </Flex>
          )}
          <Flex backgroundColor="#FFFFFF" padding="24px" flexDirection="column">
            <MenuOption>About</MenuOption>
            <MenuOption>Contact</MenuOption>
            <MenuOption>Twitter</MenuOption>
            <MenuOption>Keybase</MenuOption>
            <MenuBorder />
            <MenuOption>Docs</MenuOption>
            <MenuOption>Version 1.0.0</MenuOption>
          </Flex>
        </MobileMenu>
        <Flex flexDirection="column" flex={1}>
          <Title>Mesa</Title>
          <Description marginLeft="0">from DXdao</Description>
        </Flex>
        {!wallet.account && !isConnecting && (
          <Button
            onClick={connectWallet}
            backgroundColor="#7B7F93"
            textColor="white"
            padding="0 24px"
            margin="0"
          >
            <ButtonText>{isConnecting ? 'Connecting...' : !wallet.account ? 'Connect' : walletAddress}</ButtonText>
            {wallet.account && <ButtonImage />}
          </Button>
        )}
        <MenuIcon src={MenuImg} onClick={() => setMenuOpen(true)} />
      </Wrapper>
    )
  }

  return (
    <Wrapper padding="0 32px">
      <Row>
        <Title>Mesa</Title>
        <Description>from DXdao</Description>
      </Row>
      <Button
        onClick={connectWallet}
        backgroundColor={!wallet.account ? '#304FFE' : '#DDDDE3'}
        textColor={!wallet.account ? 'white' : '#000629'}
      >
        <ButtonText>{isConnecting ? 'Connecting...' : !wallet.account ? 'Connect Wallet' : walletAddress}</ButtonText>
        {wallet.account && <ButtonImage />}
      </Button>
    </Wrapper>
  )
}
