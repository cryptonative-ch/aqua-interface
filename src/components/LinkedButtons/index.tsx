// Externals
import React, { useState, useEffect } from 'react'

// Internal
import {
  Wrapper,
  ColumnWrapper,
  Dot,
  Line,
  ProgressLineWrapper,
  StyledButton,
} from 'src/components/LinkedButtons/style'

// Components
import { Spinner } from 'src/components/Spinner'

interface ButtonObject {
  title: string
  id: string
  onClick: () => void
  typeSubmit?: boolean
}

interface LinkedButtonsProps {
  buttons: ButtonObject[]
  active: string
  disabled?: boolean
  loading?: boolean
}

export const LinkedButtons: React.FC<LinkedButtonsProps> = ({ buttons, active, loading = false, disabled = false }) => {
  const [arrayOfButtons, setArrayOfButtons] = useState<Array<React.ReactNode>>([])
  const [progressLineArray, setProgressLineArray] = useState<Array<React.ReactNode>>([])
  const numberOfButtons = buttons.length
  const buttonSize = (100 - numberOfButtons * 2) / numberOfButtons

  const createButtons = () => {
    const tempButtons: Array<React.ReactNode> = []
    const tempProgressBar: Array<React.ReactNode> = []
    let beforeActive = true

    buttons.forEach((button, index) => {
      if (button.id == active) {
        beforeActive = false
      }
      tempButtons.push(
        <StyledButton
          buttonSize={`${buttonSize}%`}
          onClick={button.onClick}
          disabled={!(button.id == active) || disabled}
          type={button.typeSubmit ? 'submit' : 'button'}
        >
          {button.title}
          {loading && button.id == active && <Spinner size="10px" color="white" />}
        </StyledButton>
      )
      if (numberOfButtons - 1 > index) {
        tempProgressBar.push(<Dot active={button.id == active || beforeActive}>{index + 1}</Dot>)
        tempProgressBar.push(<Line active={button.id == active} complete={beforeActive} />)
      } else {
        tempProgressBar.push(<Dot active={button.id == active}>{numberOfButtons}</Dot>)
      }
    })

    setArrayOfButtons(tempButtons)
    setProgressLineArray(tempProgressBar)
  }

  useEffect(() => {
    createButtons()
  }, [buttons, active])

  return (
    <ColumnWrapper>
      <Wrapper>{arrayOfButtons}</Wrapper>
      <ProgressLineWrapper size={100 - buttonSize}>{progressLineArray}</ProgressLineWrapper>
    </ColumnWrapper>
  )
}
