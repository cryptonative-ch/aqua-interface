import styled from 'styled-components'

export const Form = styled.form(props => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: props.theme.space[2],
}))
