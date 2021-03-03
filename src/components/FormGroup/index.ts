import styled from 'styled-components'

export const FormGroup = styled.div(props => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  marginBottom: props.theme.space[3],
}))
