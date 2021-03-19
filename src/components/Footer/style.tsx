//External
import styled from 'styled-components'

export const Wrapper = styled.div({
  height: '72px',
  width: '100%',
  padding: '0 20px',
  outline: '0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const Row = styled.div({
  padding: '0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

export const Title = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
  color: '#7b7f93',
  padding: '0 12px',
  cursor: 'pointer',
  userSelect: 'none',
})
