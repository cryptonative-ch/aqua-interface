// External
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { layout, LayoutProps, space, SpaceProps, color, ColorProps, BorderProps, border } from 'styled-system'

// Components
import { Link } from 'src/components/Link'

//Internal
import { Wrapper } from './style'
import { Row, Title } from 'src/components/Header/style'

export interface FooterProps {
  onClick?: () => void
}

// Svg
import GithubSVG from 'src/assets/svg/Github.svg'

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


export const Footer: React.FC<FooterProps> = ({}) => {
  const [t] = useTranslation()
  return (
    <Wrapper>
      <Row>
        <Link to="/about" data-testid="about-ref"><Title isFooter>{t('navTitles.about')}</Title></Link>
        <Link to="/contact" data-testid="contact-ref"><Title isFooter>{t('navTitles.contact')}</Title></Link>
        <a href="https://dxdao.eth.link"><Title isFooter>DXdao</Title></a>
        <a href="https://twitter.com/mesa_eth"><Title isFooter>Twitter</Title></a>
        <a href="https://discord.com/invite/4QXEJQkvHH"><Title isFooter>Discord</Title></a>
        <a href="https://keybase.io/team/dx_dao"><Title isFooter>Keybase</Title></a>
      </Row>
      <Row>
        <Title isFooter>Docs</Title>
        <a href="https://github.com/cryptonative-ch"><IconImg src={GithubSVG} height="21px" margin="0 16px 0 0" /></a>
        <a href="https://github.com/cryptonative-ch/mesa-interface/releases"><Title isFooter>UI V 0.0.1</Title></a>
        <a href="https://github.com/cryptonative-ch/mesa-smartcontracts/releases"><Title isFooter>SC V 0.0.1</Title></a>
      </Row>
    </Wrapper>
  )
}
