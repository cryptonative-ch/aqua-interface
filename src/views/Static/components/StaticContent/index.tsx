// External
import React from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { layout, LayoutProps, space, SpaceProps, color, ColorProps, BorderProps, border } from 'styled-system'

// Component
import { Flex } from 'src/components/Flex'

// Svg
import ExternalLinkSVG from 'src/assets/svg/External-Link.svg'
import TwitterSVG from 'src/assets/svg/Twitter.svg'
import TelegramSVG from 'src/assets/svg/Telegram.svg'
import GithubSVG from 'src/assets/svg/Github.svg'
import DiscordSVG from 'src/assets/svg/Discord.svg'

import { useWindowSize } from 'src/hooks/useWindowSize'

type WrapperProps = SpaceProps & BorderProps & LayoutProps

type DivProps = LayoutProps & SpaceProps

const Wrapper = styled.div<WrapperProps>(
  () => ({
    marginTop: '16px',
    width: '100%',
    padding: '32px 24px',
    outline: 0,
    display: 'flex',
    flexDirection: 'column',
  }),
  space,
  layout,
  border
)

const Row = styled(Flex)<DivProps>(
  () => ({
    padding: 0,
    justifyContent: 'flex-start',
    maxWidth: '578px',
  }),
  layout,
  space
)

const ContentTitle = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#000629',
})

const ContentDescription = styled.div<DivProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#7B7F93',
  }),
  layout,
  space
)

type TitleProps = ColorProps & SpaceProps

const Title = styled.div<TitleProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#7B7F93',
    margin: '0 0 4px 0',
    cursor: 'pointer',
    userSelect: 'none',
  }),
  color,
  space
)

type IconImgProps = SpaceProps & LayoutProps

const IconImg = styled.img<IconImgProps>(
  () => ({
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  }),
  space,
  layout
)

export const StaticContent: React.FC = () => {
  const wallet = useWallet()
  const {
    isMobile,
    windowSize: { width: windowWidth },
  } = useWindowSize()

  const walletAddress = wallet.account ? `${wallet.account.substr(0, 6)}...${wallet.account.substr(-4)}` : ''

  const mobileWrapper: WrapperProps = {}
  if (isMobile) {
    mobileWrapper.margin = '32px 24px'
    mobileWrapper.padding = '24px 0 0'
    mobileWrapper.width = 'calc(100% - 48px)'
  }

  return (
    <Wrapper {...mobileWrapper}>
      <ContentTitle>What is Mesa?</ContentTitle>
      <ContentDescription marginY="16px" maxWidth={isMobile ? windowWidth - 48 : '578px'}>
        This can be a description for the project. Diam purus diam, nam sagittis risus. Nunc consequat felis tincidunt
        volutpat et. Malesuada tortor, auctor quis id nisl mattis platea.
      </ContentDescription>
      <Row
        flexDirection={isMobile ? 'column' : 'row'}
        maxWidth={isMobile ? windowWidth - 48 : '578px'}
        alignItems={isMobile ? 'flex-start' : 'center'}
      >
        {isMobile && (
          <Flex paddingRight="40px" flexDirection="column">
            <Title marginBottom="8px">Socials</Title>
            <Flex flexDirection="row" alignItems="center">
              <IconImg src={DiscordSVG} height="24px" width="24px" margin="0 24px 0 0" />
              <IconImg src={TelegramSVG} height="24px" width="24px" margin="0 24px 0 0" />
              <a href="https://twitter.com/mesa_eth">
                <IconImg src={TwitterSVG} height="24px" width="24px" margin="0 24px 0 0" />
              </a>
            </Flex>
          </Flex>
        )}
        <Flex paddingRight="40px" flexDirection="column" marginTop={isMobile ? '16px' : '0'}>
          <Title>Website</Title>
          <Flex flexDirection="row" alignItems="center">
            <Title color="#000629" margin="0 8px 0 0">
              <a href="https://dxdao.eth.link">dxdao.eth.link</a>
            </Title>
            <IconImg src={ExternalLinkSVG} />
          </Flex>
        </Flex>
        {walletAddress.length > 0 && (
          <Flex paddingRight="40px" flexDirection="column" marginTop={isMobile ? '16px' : '0'}>
            <Title>Address</Title>
            <Flex flexDirection="row" alignItems="center">
              <Title color="#000629" margin="0 8px 0 0">
                {walletAddress}
              </Title>
              <IconImg src={ExternalLinkSVG} />
            </Flex>
          </Flex>
        )}
        {!isMobile && (
          <Flex paddingRight="40px" flexDirection="column" marginTop={isMobile ? '16px' : '0'}>
            <Title>Socials</Title>
            <Flex flexDirection="row" alignItems="center">
              <a href="https://discord.com/invite/4QXEJQkvHH" target="_blank" rel="noreferrer">
                <IconImg src={DiscordSVG} height="24px" width="24px" margin="0 24px 0 0" />
              </a>
              <a href="https://twitter.com/mesa_eth" target="_blank" rel="noreferrer">
                <IconImg src={TwitterSVG} height="24px" width="24px" margin="0 24px 0 0" />
              </a>
              <a href="https://t.me/dxDAO" target="_blank" rel="noreferrer">
                <IconImg src={TelegramSVG} height="24px" width="24px" margin="0 24px 0 0" />
              </a>
              <a href="https://github.com/cryptonative-ch/" target="_blank" rel="noreferrer">
                <IconImg src={GithubSVG} height="24px" width="24px" margin="0 24px 0 0" />
              </a>
            </Flex>
          </Flex>
        )}
      </Row>
    </Wrapper>
  )
}
