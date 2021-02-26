// External
import styled from 'styled-components'
import React from 'react'

const HeaderText = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: #000629;
  margin: 0 40px 0 16px;
`

const StatusText = styled.div`
  padding: 4px 8px;
  background: #000629;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
`

const TimeText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 44px;
  text-align: right;
  color: #7B7F93;
  margin-left: auto;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 60px;
  margin: 24px 0;
`

const TokenIconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: #304FFE;
`

export function AuctionHeader() {

  return (
    <HeaderContainer>
      <TokenIconContainer />
      <HeaderText>XYZ Initial Auction</HeaderText>
      <StatusText>Private</StatusText>
      <TimeText>9h 23m 45s</TimeText>
    </HeaderContainer>
  )
}
