// Externals
import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'

// Hooks
import { useWindowSize } from 'src/hooks/useWindowSize'
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

// Components
import { Flex } from 'src/components/Flex'
import { Link } from 'src/components/Link'

// Constants
import { FE_VERSION, SC_VERSION } from 'src/constants'
import { getErrorMessage, injected } from 'src/connectors'

export const Header: React.FC = () => {
  const [t] = useTranslation()
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { account, activate, deactivate } = useWeb3React()
  const { isMobile } = useWindowSize()

  const walletAddress = account ? `${account.substr(0, 6)}...${account.substr(-4)}` : ''

  const connectWallet = () => {
    setIsConnecting(true)
    activate(injected)
      .catch(error => {
        console.log(getErrorMessage(error))
      })
      .finally(() => setIsConnecting(false))
  }

  const disconnectWallet = () => deactivate()

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
                <ButtonText>{isConnecting ? 'Connecting...' : !account ? 'Connect' : walletAddress}</ButtonText>
              </Button>
            </Flex>
          )}
          <Flex backgroundColor="#FFFFFF" padding="24px" flexDirection="column">
            <Link to="/about" data-testid="about-ref">
              <MenuOption>{t('navTitles.about')}</MenuOption>
            </Link>
            <Link to="/contact" data-testid="contact-ref">
              <MenuOption>{t('navTitles.contact')}</MenuOption>
            </Link>
            <a href="https://dxdao.eth.link">
              <MenuOption>DXdao</MenuOption>
            </a>
            <a href="https://twitter.com/mesa_eth">
              <MenuOption>Twitter</MenuOption>
            </a>
            <a href="https://discord.com/invite/4QXEJQkvHH">
              <MenuOption>Discord</MenuOption>
            </a>
            <a href="https://keybase.io/team/dx_dao">
              <MenuOption>Keybase</MenuOption>
            </a>
            <MenuBorder />
            <MenuOption>Docs</MenuOption>
            <a href={'https://github.com/cryptonative-ch/mesa-interface/releases/tag/v' + FE_VERSION}>
              <MenuOption>FE V {FE_VERSION}</MenuOption>
            </a>
            <a href={'https://github.com/cryptonative-ch/mesa-smartcontracts/releases/tag/v' + SC_VERSION}>
              <MenuOption>SC V {SC_VERSION}</MenuOption>
            </a>
          </Flex>
        </MobileMenu>
        <Flex flexDirection="column" flex={1}>
          <Title>Mesa</Title>
          <Description marginLeft="0">from DXdao</Description>
        </Flex>
        {!account && !isConnecting && (
          <Button onClick={connectWallet} backgroundColor="#7B7F93" textColor="white" padding="0 24px" margin="0">
            <ButtonText>{isConnecting ? 'Connecting...' : !account ? 'Connect' : walletAddress}</ButtonText>
            {account && <ButtonImage />}
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
        backgroundColor={!account ? '#304FFE' : '#DDDDE3'}
        textColor={!account ? 'white' : '#000629'}
      >
        <ButtonText>{isConnecting ? 'Connecting...' : !account ? 'Connect Wallet' : walletAddress}</ButtonText>
        {account && <ButtonImage />}
      </Button>
    </Wrapper>
  )
}
