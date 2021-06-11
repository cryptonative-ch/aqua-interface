// External
import { layout, LayoutProps, space, SpaceProps, color, ColorProps, BorderProps, border } from 'styled-system'
import styled from 'styled-components'
import React from 'react'

// Hooks
import { useWindowSize } from 'src/hooks/useWindowSize'

// Component
import { Flex } from 'src/components/Flex'

// Svg
import ExternalLinkSVG from 'src/assets/svg/External-Link.svg'
import { socialIcons } from 'src/assets'

// Interfaces
import { Sale, SaleDetails } from 'src/interfaces/Sale'
import { XDAI_CHAIN_PARAMETER } from 'src/constants'

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

const FooterDescription = styled.div<DivProps>(layout, space)

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

const Paragraph = styled.p<DivProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#7B7F93',
  }),
  color,
  space
)

const Link = styled.a<TitleProps>(
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
  saleDetails?: SaleDetails
}

export const TokenFooter: React.FC<TokenFooterProps> = ({ sale, saleDetails = {} }: TokenFooterProps) => {
  const {
    isMobile,
    windowSize: { width: windowWidth },
  } = useWindowSize()

  const walletAddress = sale?.tokenOut.id ? `${sale.tokenOut.id.substr(0, 6)}...${sale.tokenOut.id.substr(-4)}` : ''

  const mobileWrapper: WrapperProps = {}
  if (isMobile) {
    mobileWrapper.margin = '32px 24px'
    mobileWrapper.padding = '24px 0 0'
    mobileWrapper.width = 'calc(100% - 48px)'
  }

  return (
    <Wrapper {...mobileWrapper}>
      <FooterTitle>{`About ${sale.name}`}</FooterTitle>
      {saleDetails.description && (
        <FooterDescription marginY="16px" maxWidth={isMobile ? windowWidth - 48 : '578px'}>
          {saleDetails.description.map((block, index) => (
            <span key={index}>
              {block.title && <Title marginBottom="6px">{block.title}</Title>}
              {block.p && <Paragraph>{block.p}</Paragraph>}
            </span>
          ))}
        </FooterDescription>
      )}
      <Row
        flexDirection={isMobile ? 'column' : 'row'}
        maxWidth={isMobile ? windowWidth - 48 : '578px'}
        alignItems={isMobile ? 'flex-start' : 'center'}
      >
        {isMobile && saleDetails.socials && (
          <Flex paddingRight="40px" flexDirection="column">
            <Title marginBottom="8px">Socials</Title>
            <Flex flexDirection="row" alignItems="center">
              {saleDetails.socials.map((social, index) => (
                <a key={index} href={social.link} target="_blank" rel="noreferrer">
                  <IconImg
                    src={social.icon || socialIcons[social.name]}
                    height="24px"
                    width="24px"
                    margin="0 24px 0 0"
                    alt={social.name}
                  />
                </a>
              ))}
            </Flex>
          </Flex>
        )}
        {saleDetails.website && (
          <Flex paddingRight="40px" flexDirection="column" marginTop={isMobile ? '16px' : '0'}>
            <Title>Website</Title>
            <a href={saleDetails.website.url} target="_blank" rel="noreferrer">
              <Flex flexDirection="row" alignItems="center">
                <Title color="#000629" margin="0 8px 0 0">
                  {saleDetails.website.url}
                </Title>
                <IconImg src={ExternalLinkSVG} />
              </Flex>
            </a>
          </Flex>
        )}
        {walletAddress && (
          <Flex paddingRight="40px" flexDirection="column" marginTop={isMobile ? '16px' : '0'}>
            <Title>Token Address</Title>
            <Link
              href={`${XDAI_CHAIN_PARAMETER.blockExplorerUrls[0]}/address/${sale.tokenOut.id}`}
              target="_blank"
              color="#000629"
              margin="0 8px 0 0"
            >
              <Flex flexDirection="row" alignItems="center">
                {walletAddress}
                <IconImg src={ExternalLinkSVG} />
              </Flex>
            </Link>
          </Flex>
        )}
        {!isMobile && saleDetails.socials && (
          <Flex paddingRight="40px" flexDirection="column" marginTop={isMobile ? '16px' : '0'}>
            <Title>Socials</Title>
            <Flex flexDirection="row" alignItems="center">
              {saleDetails.socials.map((social, index) => (
                <a key={index} href={social.link} target="_blank" rel="noreferrer">
                  <IconImg src={social.icon || socialIcons[social.name]} margin="0 16px 0 0" alt={social.name} />
                </a>
              ))}
            </Flex>
          </Flex>
        )}
      </Row>
    </Wrapper>
  )
}
