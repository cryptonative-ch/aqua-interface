// External
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

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
