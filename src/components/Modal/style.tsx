//External
import styled from 'styled-components'
import { Button } from 'src/components/Button'

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: 40%;
  min-width: 400px;
  outline: 0;
`
export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 6, 41, 0.5);
  z-index: 500;
`
export const StyledModal = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: auto;
`
export const Header = styled.div`
  display: flex;
  padding: 16px 24px;
  border-bottom: 1px solid #dddde3;
`
export const HeaderText = styled.div`
  color: #000629;
  flex: 1;
  font-size: 1.1rem;
`
export const CloseButton = styled.a`
  :hover {
    cursor: pointer;
  }
`
export const Content = styled.div`
  color: #7b7f93;
  padding: 16px 24px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px 16px 16px;
`

export const ModalButton = styled(Button)`
  margin: 8px;
  flex: 1;
`
