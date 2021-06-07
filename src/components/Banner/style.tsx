// Externals
import styled from 'styled-components'
// Svg
import CloseImg from 'src/assets/svg/Close.svg'

export interface WrapperProps {
  error: boolean
}

export const Wrapper = styled.div<WrapperProps>(props => ({
  height: '8vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props.error ? '#E15F5F' : 'white',
  color: props.error ? 'white' : 'black',
}))

export const Content = styled.div({
  flex: '1',
  textAlign: 'center',
})

export const CloseButtonImage = styled.img({
  width: '16px',
  height: '16px',
  margin: '0px 25px',
  cursor: 'pointer',
})

CloseButtonImage.defaultProps = {
  src: CloseImg,
}
