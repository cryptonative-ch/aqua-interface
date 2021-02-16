//External
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: 50%;
  outline: 0;
`
export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`
export const StyledModal = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: auto;
  border-style: solid;
  border-width: 2px;
`
export const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
`
export const HeaderText = styled.div`
  align-self: center;
  color: black;
  flex: 1;
  padding-left: 44px;
  font-size: 1.2rem;
  text-align: center;
`
export const CloseButton = styled.button`
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  background: none;
  :hover {
    cursor: pointer;
  }
`
export const Content = styled.div`
  padding: 10px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
`

export const ConfirmationButton = styled.div`
  display: flex;
  justify-content: center;

`

export const ConfirmButton = styled.button`
  width: 6rem;
`

export const CancelButton = styled.button`
  width: 6rem;
  margin-left: 10px;
`
