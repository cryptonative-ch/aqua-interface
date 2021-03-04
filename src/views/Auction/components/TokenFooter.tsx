// External
import React, { Fragment } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  padding: 32px 0;
  outline: 0;
  display: flex;
  flex-direction: column;
  border: 1px dashed #DDDDE3;
  border-width: 1px 0 0 0;
`

const Row = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const FooterTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000629;
`

const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #7B7F93;
  padding: 16px 24px 16px 0;
  cursor: pointer;
  user-select: none;
`

interface TokenFooterProps {
  onClick?: () => void
}

export const TokenFooter: React.FC<TokenFooterProps> = ({}) => {
  return (
    <Fragment>
      <Wrapper>
        <FooterTitle>Learn more about XYZ</FooterTitle>
        <Row>
          <Title>Website</Title>
          <Title>Whitepaper</Title>
          <Title>Twitter</Title>
          <Title>Discord</Title>
          <Title>Etherscan</Title>
        </Row>
      </Wrapper>
    </Fragment>
  )
}
