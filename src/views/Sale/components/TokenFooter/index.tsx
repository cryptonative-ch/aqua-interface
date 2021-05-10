// External
import { layout, LayoutProps, space, SpaceProps, color, ColorProps, BorderProps, border } from 'styled-system'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import React from 'react'

// Hooks
import { useWindowSize } from 'src/hooks/useWindowSize'

// Component
import { Flex } from 'src/components/Flex'

// Svg
import ExternalLinkSVG from 'src/assets/svg/External-Link.svg'
import TelegramSVG from 'src/assets/svg/Telegram.svg'
import DiscordSVG from 'src/assets/svg/Discord.svg'
import TwitterSVG from 'src/assets/svg/Twitter.svg'
import GithubSVG from 'src/assets/svg/Github.svg'

// Interfaces
import { Sale } from 'src/interfaces/Sale'

type WrapperProps = SpaceProps & BorderProps & LayoutProps

type DivProps = LayoutProps & SpaceProps

const Wrapper = styled.div<WrapperProps>(
  () => ({
    marginTop: '16px',
    width: '100%',
    padding: '32px 0',
    outline: 0,
    display: 'flex',
    flexDirection: 'column',
    border: '1px dashed #DDDDE3',
    borderWidth: '1px 0 0 0',
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

const FooterTitle = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#000629',
})

const FooterDescription = styled.div<DivProps>(
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

interface TokenFooterProps {
  onClick?: () => void
  sale: Sale
}

export const TokenFooter: React.FC<TokenFooterProps> = ({ sale }: TokenFooterProps) => {
  const { account } = useWeb3React()
  const {
    isMobile,
    windowSize: { width: windowWidth },
  } = useWindowSize()

  const walletAddress = account ? `${account.substr(0, 6)}...${account.substr(-4)}` : ''

  const mobileWrapper: WrapperProps = {}
  if (isMobile) {
    mobileWrapper.margin = '32px 24px'
    mobileWrapper.padding = '24px 0 0'
    mobileWrapper.width = 'calc(100% - 48px)'
  }

  return (
    <Wrapper {...mobileWrapper}>
      <FooterTitle>{`About ${sale.name}`}</FooterTitle>
      <FooterDescription marginY="16px" maxWidth={isMobile ? windowWidth - 48 : '578px'}>
        This can be a description for the project. Diam purus diam, nam sagittis risus. Nunc consequat felis tincidunt
        volutpat et. Malesuada tortor, auctor quis id nisl mattis platea.
      </FooterDescription>
      <Row
        flexDirection={isMobile ? 'column' : 'row'}
        maxWidth={isMobile ? windowWidth - 48 : '578px'}
        alignItems={isMobile ? 'flex-start' : 'center'}
      >
        {isMobile && (
          <Flex paddingRight="40px" flexDirection="column">
            <Title marginBottom="8px">Socials</Title>
            <Flex flexDirection="row" alignItems="center">
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <IconImg src={TwitterSVG} height="24px" width="24px" margin="0 24px 0 0" />
              </a>
              <a href="https://discord.com/invite/" target="_blank" rel="noreferrer">
                <IconImg src={DiscordSVG} height="24px" width="24px" margin="0 24px 0 0" />
              </a>
              <a href="https://t.me/" target="_blank" rel="noreferrer">
                <IconImg src={TelegramSVG} height="24px" width="24px" margin="0 24px 0 0" />
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                <IconImg src={GithubSVG} height="24px" width="24px" margin="0 24px 0 0" />
              </a>
            </Flex>
          </Flex>
        )}
        <Flex paddingRight="40px" flexDirection="column" marginTop={isMobile ? '16px' : '0'}>
          <Title>Website</Title>
          <Flex flexDirection="row" alignItems="center">
            <Title color="#000629" margin="0 8px 0 0">
              exwhyzed.finance
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
              <a href="https://github.com/cryptonative-ch">
                <IconImg src={GithubSVG} height="21px" margin="0 16px 0 0" />
              </a>
              <a href="https://twitter.com/mesa_eth">
                <IconImg src={TwitterSVG} height="21px" margin="0 16px 0 0" />
              </a>
              <a href="https://discord.com/invite/4QXEJQkvHH">
                <IconImg src={DiscordSVG} height="21px" margin="0 16px 0 0" />
              </a>
              <a href="https://t.me/dxDAO">
                <IconImg src={TelegramSVG} height="21px" margin="0 16px 0 0" />
              </a>
            </Flex>
          </Flex>
        )}
      </Row>
    </Wrapper>
  )
}
