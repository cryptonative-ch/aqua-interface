// External
import React from 'react'

//Internal
import { Wrapper } from './style'
import { Row, Title } from 'src/components/Header/style'

export interface FooterProps {
  onClick?: () => void
}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Wrapper>
      <Row>
        <Title isFooter>About</Title>
        <Title isFooter>Contact</Title>
        <Title isFooter>Twitter</Title>
        <Title isFooter>Keybase</Title>
      </Row>
      <Row>
        <Title isFooter>Docs</Title>
        <Title isFooter>Version 0.0.1</Title>
      </Row>
    </Wrapper>
  )
}
