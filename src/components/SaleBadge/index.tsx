// External

import styled from 'styled-components'

export const BackgroundBadge = styled.div`
  // temp needs to change the margin for something else
  position: relative;
  margin-bottom: 48px;
  display: flex;
  justify-content: space-around;
  height: 33px;
  width: 240px;
  border-radius: 33px;
  background: #dddde3;
`

export const UnactiveTextBadge = styled.p`
  margin: 8px 16px;
  height: 17px;
  width: 69px;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: #7b7f93;
`

export const ActiveBadge = styled.div`
  margin: 3px 0px 3px 3px;
  padding: 3px 0px 3px 0px;
  display: flex;
  justify-content: center;
  height: 27px;
  width: 54px;
  border-radius: 33px;
  background: #ffffff;
`

export const ActiveBadgeText = styled.p`
  margin: 2px 0px 0px 0px;
  height: 17px;
  width: 28px;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: #304ffe;
`
