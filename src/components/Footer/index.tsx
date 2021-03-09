// External
import React from 'react'

//Internal
import { Wrapper, Row, Title } from './style'

export interface FooterProps {
  onClick?: () => void
}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Wrapper>
      <Row>
        <Title>About</Title>
        <Title>Contact</Title>
        <Title>Twitter</Title>
        <Title>Keybase</Title>
      </Row>
      <Row>
        <Title>Docs</Title>
        <Title>Version 0.0.1</Title>
      </Row>
    </Wrapper>
  )
}
