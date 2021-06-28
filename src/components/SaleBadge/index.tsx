// External
import styled from 'styled-components'

export type BadgeProps = {
  active?: boolean
}

export const BackgroundBadge = styled.div({
  padding: '3px 3px 3px 3px',
  position: 'relative',
  marginBottom: '48px',
  display: 'flex',
  height: '33px',
  width: '240px',
  borderRadius: '33px',
  background: '#dddde3',
})

export const Badge = styled.div<BadgeProps>(props => ({
  cursor: props.active ? 'default' : 'pointer',
  height: '27px',
  width: '95px',
  borderRadius: '33px',
  padding: '5px 13px',
  display: 'flex',
  justifyContent: 'center',
  fontSize: '14px',
  fontStyle: 'normal',
  fontFamily: 'Inter',
  lineHeight: '17px',
  fontWeight: 500,
  color: props.active ? '#304ffe' : '#7b7f93',
  background: props.active ? '#ffffff' : '',
}))
