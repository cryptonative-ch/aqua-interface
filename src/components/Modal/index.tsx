// External
import React, { Fragment, useState } from 'react'
import ReactDOM from 'react-dom'

// Components
import { Button } from 'src/components/Button'
import CloseIcon from 'src/assets/svg/Close.svg'

//Internal
import { Wrapper, Header, StyledModal, HeaderText, CloseButton, Content, Backdrop, ConfirmationButton } from './style'

export interface ModalProps {
  isShown: boolean
  hide: () => void
  modalContent: JSX.Element
  headerText: string
  onConfirm?: () => void
}

export const Modal: React.FC<ModalProps> = ({ isShown, hide, modalContent, headerText, onConfirm }) => {
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
          {onConfirm ? (
            <ConfirmationButton>
              <Button margin onClick={hide}>
                Cancel
              </Button>
              <Button margin onClick={hide}>
                Confirm
              </Button>
            </ConfirmationButton>
          ) : null}
        </StyledModal>
      </Wrapper>
    </Fragment>
  )

  return isShown ? ReactDOM.createPortal(modal, document.body) : null
}

export const useGenericModal = () => {
  const [isShown, setShown] = useState<boolean>(false)
  const toggle = () => setShown(!isShown)
  return {
    isShown,
    toggle,
    setShown,
  }
}
