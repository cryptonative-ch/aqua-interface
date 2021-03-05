// External

import styled from 'styled-components'
import { SpaceProps, TypographyProps, LayoutProps, TextColorProps } from 'styled-system'

export type UnactiveTextBadgeProps = SpaceProps & TypographyProps & LayoutProps & TextColorProps

export const BackgroundBadge = styled.div`
  padding: 3px 3px 3px 3px;
  position: relative;
  margin-bottom: 48px;
  display: flex;
  height: 33px;
  width: 240px;
  border-radius: 33px;
  background: #dddde3;
`

export const UnactiveTextBadge = styled.p<UnactiveTextBadgeProps>(
  props => ({
    margin: '5px 13px',
    height: '17px',
    width: '69px',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    // fontWeight: '500',
    lineHeight: '17px',
    letterSpacing: '0em',
    textAlign: props.textAlign === 'right' ? 'right' : 'center',
    color: '#7b7f93',
    cursor: 'pointer',
  })
  // props for different letter positioning
)

export const ActiveBadge = styled.div`
  width: 95px;
  height: 27px;
  padding: 5px 13px;
  display: flex;
  justify-content: center;
  height: 27px;
  border-radius: 33px;
  background: #ffffff;
`

export const ActiveBadgeText = styled.p`
  height: 17px;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  color: #304ffe;
  cursor: pointer;
`
