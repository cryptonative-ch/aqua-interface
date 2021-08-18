// External
import { layout, LayoutProps, space, SpaceProps, color, ColorProps, BorderProps, border } from 'styled-system'
import styled from 'styled-components'
import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'

// Hooks
import { useWindowSize } from 'src/hooks/useWindowSize'

// Contexts
import { Web3ConnectionContext } from 'src/contexts'

// Component
import { Flex } from 'src/components/Flex'
import { ConnectorNames } from 'src/providers/web3'

// Svg
import ExternalLinkSVG from 'src/assets/svg/External-Link.svg'
import { socialIcons } from 'src/assets'

// Interfaces
import { Sale, SaleDetails } from 'src/interfaces/Sale'
import { CHAIN_ID, SUPPORTED_CHAINS } from 'src/constants'

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

const AddTokenButton = styled.button({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '10px',
  lineHeight: '14px',
  color: '#7B7F93',
  cursor: 'pointer',
  userSelect: 'none',
  textAlign: 'center',
  padding: '4px',
  width: '100%',
  border: '1px solid #7B7F93',
  '&:hover': {
    color: '#304ffe',
    borderColor: '#304ffe',
  },
})

interface TokenFooterProps {
  onClick?: () => void
  sale: Sale
  saleDetails?: SaleDetails
}

export const TokenFooter: React.FC<TokenFooterProps> = ({ sale, saleDetails }: TokenFooterProps) => {
  const { library, chainId } = useWeb3React()
  const {
    isMobile,
    windowSize: { width: windowWidth },
  } = useWindowSize()
  const { activatedConnector } = useContext(Web3ConnectionContext)

  const truncatedTokenAddress = sale?.tokenOut.id
    ? `${sale.tokenOut.id.substr(0, 6)}...${sale.tokenOut.id.substr(-4)}`
    : ''

  const currentChainParams = chainId ? SUPPORTED_CHAINS[chainId as CHAIN_ID].parameters : null

  const mobileWrapper: WrapperProps = {}
  if (isMobile) {
    mobileWrapper.margin = '32px 24px'
    mobileWrapper.padding = '24px 0 0'
    mobileWrapper.width = 'calc(100% - 48px)'
  }

  const addTokenToWallet = () => {
    library?.send('wallet_watchAsset', {
      type: 'ERC20',
      options: {
        address: sale?.tokenOut.id,
        symbol: sale?.tokenOut.symbol,
        decimals: sale?.tokenOut.decimals,
        image: sale?.tokenOut.icon,
      },
    })
  }

  return (
    <Wrapper {...mobileWrapper}>
      <FooterTitle>{`About ${sale.name}`}</FooterTitle>
      {saleDetails?.description && (
        <FooterDescription
          marginY="16px"
          maxWidth={isMobile ? windowWidth - 48 : '578px'}
          data-testid="info-description"
        >
          {saleDetails.description.map((block, index) => (
            <span key={index}>
              {block.title && <Title marginBottom="6px">{block.title}</Title>}
              {block.p && <Paragraph>{block.p}</Paragraph>}
            </span>
          ))}
        </FooterDescription>
      )}
      <Row flexDirection={isMobile ? 'column' : 'row'} maxWidth={isMobile ? windowWidth - 48 : '578px'}>
        {isMobile && saleDetails?.socials && (
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
        {saleDetails?.website && (
          <Flex paddingRight="40px" flexDirection="column" marginTop={isMobile ? '16px' : '0'}>
            <Title>Website</Title>
            <a href={saleDetails.website.url} target="_blank" rel="noreferrer" data-testid="info-website">
              <Flex flexDirection="row" alignItems="center">
                <Title color="#000629" margin="0 8px 0 0">
                  {saleDetails.website.url}
                </Title>
                <IconImg src={ExternalLinkSVG} />
              </Flex>
            </a>
          </Flex>
        )}
        {truncatedTokenAddress && currentChainParams?.blockExplorerUrls?.length && (
          <Flex paddingRight="40px" flexDirection="column" marginTop={isMobile ? '16px' : '0'}>
            <Title>Token Address</Title>
            <Link
              href={`${currentChainParams.blockExplorerUrls[0]}/address/${sale.tokenOut.id}`}
              target="_blank"
              color="#000629"
              margin="0 8px 0 0"
            >
              <Flex flexDirection="row" alignItems="center">
                <Title color="#000629" margin="0 8px 0 0">
                  {truncatedTokenAddress}
                </Title>
                <IconImg src={ExternalLinkSVG} />
              </Flex>
            </Link>
            {activatedConnector == ConnectorNames.Injected && (
              <Flex margin="8px 8px 0 0">
                <AddTokenButton onClick={addTokenToWallet}>Add to MetaMask +</AddTokenButton>
              </Flex>
            )}
          </Flex>
        )}
        {!isMobile && saleDetails?.socials && (
          <Flex paddingRight="40px" flexDirection="column" marginTop={isMobile ? '16px' : '0'}>
            <Title>Socials</Title>
            <Flex flexDirection="row" alignItems="center" data-testid="info-socials">
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
