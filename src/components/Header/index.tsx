// Externals
import React, { useState, useEffect, useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { setInvalidChainId, setValidChainId } from 'src/redux/network'
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
  ColumnWrapper,
} from 'src/components/Header/style'
import { Web3ConnectionContext } from 'src/contexts'

// Components
import { Flex } from 'src/components/Flex'
import { Link } from 'src/components/Link'
import { Banner } from 'src/components/Banner'
import { FeedbackOverlay } from 'src/components/FeedbackOverlay'
import { Web3ProvidersModal } from 'src/components/Web3ProvidersModal'
import { AccountSwitch } from 'src/components/AccountSwitch'

// Constants
import { CHAIN_ID, FE_VERSION, SC_VERSION, SUPPORTED_CHAINS, SUPPORTED_CHAIN_IDS } from 'src/constants'

export const Header: React.FC = () => {
  const [t] = useTranslation()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [switcherOpen, setSwitcherOpen] = useState<boolean>(false)
  const { account } = useWeb3React()
  const { disconnect: disconnectWallet, isConnecting } = useContext(Web3ConnectionContext)
  const { isMobile } = useWindowSize()
  const isValidNetwork = useSelector(store => store.network.validChainId)
  const dispatch = useDispatch()
  const [isModalShown, setIsModalShown] = useState<boolean>(false)

  const walletAddress = account ? `${account.substr(0, 6)}...${account.substr(-4)}` : ''

  const w: any = window

  const dispatchChainValidity = (chainId: string) => {
    const parsedChainId = parseInt(chainId, 16)
    const isChainSupported = SUPPORTED_CHAIN_IDS.includes(parsedChainId)
    if (!isChainSupported) {
      dispatch(setInvalidChainId())
    } else {
      dispatch(setValidChainId())
    }
  }

  const subscribeToNetworkChanges = () => {
    if (w.ethereum) {
      dispatchChainValidity(w.ethereum.chainId)
      w.ethereum.on('chainChanged', function (chainId: string) {
        dispatchChainValidity(chainId)
      })
    }
  }

  useEffect(() => {
    subscribeToNetworkChanges()
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  useEffect(() => {
    if (account) {
      setIsModalShown(false)
    }
  }, [account])

  const changeNetwork = () => {
    w.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [SUPPORTED_CHAINS[CHAIN_ID.XDAI].parameters],
    })
  }

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
                onClick={() => (account ? disconnectWallet() : setIsModalShown(true))}
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
          <Button
            onClick={() => setIsModalShown(true)}
            backgroundColor="#7B7F93"
            textColor="white"
            padding="0 24px"
            margin="0"
          >
            <ButtonText>{isConnecting ? 'Connecting...' : !account ? 'Connect' : walletAddress}</ButtonText>
            {account && <ButtonImage />}
          </Button>
        )}
        <MenuIcon src={MenuImg} onClick={() => setMenuOpen(true)} />

        {menuOpen && <FeedbackOverlay />}

        <Web3ProvidersModal isShown={isModalShown} hide={() => setIsModalShown(false)} />
      </Wrapper>
    )
  }

  return (
    <ColumnWrapper>
      {!isValidNetwork && (
        <Banner error>
          <Button
            onClick={changeNetwork}
            backgroundColor={'#DDDDE3'}
            textColor={'#000629'}
            display="inline"
            margin="0 16px"
          >
            <ButtonText>{t('buttons.changetoxDaiNetwork')}</ButtonText>
          </Button>
        </Banner>
      )}
      <Wrapper padding="0 32px">
        <Row>
          <Title>Mesa</Title>
          <Description>from DXdao</Description>
        </Row>
        <Button
          onClick={() => (account ? setSwitcherOpen(!switcherOpen) : setIsModalShown(true))}
          backgroundColor={!account ? '#304FFE' : '#DDDDE3'}
          textColor={!account ? 'white' : '#000629'}
        >
          <ButtonText>{isConnecting ? 'Connecting...' : !account ? 'Connect Wallet' : walletAddress}</ButtonText>
          {account && <ButtonImage />}
        </Button>
      </Wrapper>
      <Web3ProvidersModal isShown={isModalShown} hide={() => setIsModalShown(false)} />
      <AccountSwitch isActive={switcherOpen} setActive={setSwitcherOpen} />
    </ColumnWrapper>
  )
}
