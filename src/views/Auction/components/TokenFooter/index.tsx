// External
import React from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { layout, LayoutProps, space, SpaceProps, color, ColorProps } from 'styled-system'

// Interface
import { Auction } from 'src/interfaces/Auction'

// Component
import { Flex } from 'src/components/Flex'

// Svg
import ExternalLinkSVG from 'src/assets/svg/External-Link.svg'
import TwitterSVG from 'src/assets/svg/Twitter.svg'
import TelegramSVG from 'src/assets/svg/Telegram.svg'
import GithubSVG from 'src/assets/svg/Github.svg'
import DiscordSVG from 'src/assets/svg/Discord.svg'

const Wrapper = styled.div({
  marginTop: '16px',
  width: '100%',
  padding: '32px 0',
  outline: 0,
  display: 'flex',
  flexDirection: 'column',
  border: '1px dashed #DDDDE3',
  borderWidth: '1px 0 0 0'
})

const Row = styled.div({
  padding: 0,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  maxWidth: '578px'
})

const FooterTitle = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#000629',
})

type FooterDescriptionProps = LayoutProps & SpaceProps

const FooterDescription = styled.div<FooterDescriptionProps>(
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
    cursor: 'pointer'
  }),
  space,
  layout
)

interface TokenFooterProps {
  onClick?: () => void
  auction: Auction
}

export const TokenFooter: React.FC<TokenFooterProps> = ({ auction }: TokenFooterProps) => {
  const wallet = useWallet()

  const walletAddress = wallet.account ? `${wallet.account.substr(0, 6)}...${wallet.account.substr(-4)}` : ''
  
  return (
    <Wrapper>
      <FooterTitle>{`About ${auction.tokenName}`}</FooterTitle>
      <FooterDescription marginY="16px" maxWidth="578px">
        This can be a description for the project. Diam purus diam, nam sagittis risus. Nunc consequat felis tincidunt volutpat et. Malesuada tortor, auctor quis id nisl mattis platea.
      </FooterDescription>
      <Row>
        <Flex paddingRight="40px" flexDirection="column">
          <Title>Website</Title>
          <Flex flexDirection="row" alignItems="center">
            <Title color="#000629" margin="0 8px 0 0">exwhyzed.finance</Title>
            <IconImg src={ExternalLinkSVG} />
          </Flex>
        </Flex>
        <Flex paddingRight="40px" flexDirection="column">
          <Title>Address</Title>
          <Flex flexDirection="row" alignItems="center">
            <Title color="#000629" margin="0 8px 0 0">{walletAddress}</Title>
            <IconImg src={ExternalLinkSVG} />
          </Flex>
        </Flex>
        <Flex paddingRight="40px" flexDirection="column">
          <Title>Socials</Title>
          <Flex flexDirection="row" alignItems="center">
            <IconImg src={DiscordSVG} height="21px" margin="0 16px 0 0" />
            <IconImg src={GithubSVG} height="21px" margin="0 16px 0 0" />
            <IconImg src={TelegramSVG} height="21px" margin="0 16px 0 0" />
            <IconImg src={TwitterSVG} height="21px" margin="0 16px 0 0" />
          </Flex>
        </Flex>
      </Row>
    </Wrapper>
  )
}
