// External
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'src/hooks/useWindowSize'
import { useWallet } from 'use-wallet'
// Svg
import MenuImg from 'src/assets/svg/Menu-Icon.svg'
import CloseImg from 'src/assets/svg/Close.svg'

// Internal
import {
  Wrapper,
  Row,
  Title,
  Description,
  Button,
  ButtonText,
  ButtonImage,
  MenuIcon,
  MobileMenu,
  MenuOption,
  MenuBorder,
} from './style'

// Component
import { Flex } from 'src/components/Flex'
import { Link } from 'src/components/Link'

// Constants
import { FE_VERSION, SC_VERSION } from 'src/constants'

export interface HeaderProps {
  connectWallet?: () => void
  isConnecting?: boolean
}

export const Header: React.FC<HeaderProps> = ({ connectWallet, isConnecting = false }) => {
  const [t] = useTranslation()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const wallet = useWallet()
  const { isMobile } = useWindowSize()

  const walletAddress = wallet.account ? `${wallet.account.substr(0, 6)}...${wallet.account.substr(-4)}` : ''

  const disconnectWallet = () => {
    wallet.reset()
  }

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
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
              <MenuOption paddingTop="0" marginBottom="4px">
                Connected with MetaMask
              </MenuOption>
              <MenuOption paddingTop="0" marginBottom="16px" color="#000629">
                {walletAddress}
              </MenuOption>
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
            <Link to="/about" data-testid="about-ref"><MenuOption>{t('navTitles.about')}</MenuOption></Link>
            <Link to="/contact" data-testid="contact-ref"><MenuOption>{t('navTitles.contact')}</MenuOption></Link>
            <a href="https://dxdao.eth.link"><MenuOption>DXdao</MenuOption></a>
            <a href="https://twitter.com/mesa_eth"><MenuOption>Twitter</MenuOption></a>
            <a href="https://discord.com/invite/4QXEJQkvHH"><MenuOption>Discord</MenuOption></a>
            <a href="https://keybase.io/team/dx_dao"><MenuOption>Keybase</MenuOption></a>
            <MenuBorder />
            <MenuOption>Docs</MenuOption>
            <a href={"https://github.com/cryptonative-ch/mesa-interface/releases/tag/v" + FE_VERSION}><MenuOption>FE V {FE_VERSION}</MenuOption></a>
            <a href={"https://github.com/cryptonative-ch/mesa-smartcontracts/releases/tag/v" + SC_VERSION}><MenuOption>SC V {SC_VERSION}</MenuOption></a>
          </Flex>
        </MobileMenu>
        <Flex flexDirection="column" flex={1}>
          <Title>Mesa</Title>
          <Description marginLeft="0">from DXdao</Description>
        </Flex>
        {!wallet.account && !isConnecting && (
          <Button onClick={connectWallet} backgroundColor="#7B7F93" textColor="white" padding="0 24px" margin="0">
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
