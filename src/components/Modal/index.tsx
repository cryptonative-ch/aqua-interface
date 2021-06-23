// External
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

// Components
import CloseIcon from 'src/assets/svg/Close.svg'

//Internal
import { Wrapper, Header, StyledModal, HeaderText, CloseButton, Content, Backdrop, Footer, ModalButton } from './style'

export interface ModalProps {
  isShown: boolean
  hide: () => void
  modalContent: JSX.Element
  headerText: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export const Modal: React.FC<ModalProps> = ({
  isShown,
  hide,
  modalContent,
  headerText,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
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
          <Footer>
            {onConfirm && <ModalButton onClick={onConfirm}>{confirmText}</ModalButton>}
            {onCancel && (
              <ModalButton
                variant="secondary"
                onClick={() => {
                  onCancel()
                  hide()
                }}
              >
                {cancelText}
              </ModalButton>
            )}
          </Footer>
        </StyledModal>
      </Wrapper>
    </Fragment>
  )

  return isShown ? ReactDOM.createPortal(modal, document.body) : null
}
