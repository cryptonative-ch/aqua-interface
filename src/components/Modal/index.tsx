// External
import React, { Fragment, useState } from 'react'
import ReactDOM from 'react-dom'
import { useCookies } from 'react-cookie'

// Components
// import { Button } from 'src/components/Button'
import CloseIcon from 'src/assets/svg/Close.svg'

//Internal
import { Wrapper, Header, StyledModal, HeaderText, CloseButton, Content, Backdrop } from './style'

export interface ModalProps {
  isShown: boolean
  hide: () => void
  modalContent: JSX.Element
  headerText: string
}

export const Modal: React.FC<ModalProps> = ({ isShown, hide, modalContent, headerText }) => {
  const modal = (
    <Fragment>
      <Backdrop />
      <Wrapper>
        <StyledModal>
          <Header>
            <HeaderText>{headerText}</HeaderText>
            <CloseButton onClick={hide}>
              <img src={CloseIcon} alt="close icon" />
            </CloseButton>
          </Header>
          <Content>{modalContent}</Content>
        </StyledModal>
      </Wrapper>
    </Fragment>
  )

  return isShown ? ReactDOM.createPortal(modal, document.body) : null
}

export const useModal = () => {
  const [cookies, setCookie] = useCookies(['termsofsale'])
  const [isShown, setShown] = useState<boolean>(cookies.termsofsale !== "true")

  const toggle = (flag: boolean = false) => {
    if (flag) {
      setCookie('termsofsale', "true", { path: '/' });
    }
    setShown(!isShown)
  }

  return {
    isShown,
    toggle,
  }
}
