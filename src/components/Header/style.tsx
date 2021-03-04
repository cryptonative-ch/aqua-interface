//External
import styled from 'styled-components'
// Svg
import DownArrowUrl from 'src/assets/svg/Down-Arrow.svg'

export const Wrapper = styled.div`
  height: 72px;
  z-index: 700;
  width: 100%;
  padding: 0 32px;
  outline: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Row = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #000629;
`

export const Description = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #7b7f93;
  margin-left: 5px;
`

export type ButtonProps = {
  backgroundColor: string
  textColor?: string
}

export const Button = styled.div<ButtonProps>(({ backgroundColor, textColor = 'white' }) => ({
  backgroundColor,
  display: 'flex',
  appearance: 'none',
  fontSize: '14px',
  fontWeight: 500,
  fontFamily: 'inherit',
  lineHeight: 1.5,
  color: textColor,
  height: '40px',
  padding: '0 16px',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
}))

export const ButtonText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ButtonImage = styled.img`
  width: 16px;
  height: 16px;
  margin: 0 0 0 16px;
`

ButtonImage.defaultProps = {
  src: DownArrowUrl,
}
