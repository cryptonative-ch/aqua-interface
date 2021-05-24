// External
import React from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { Button } from 'src/components/Buttons/Button'

interface ApproveProps {
  isDisabled: boolean
  isFixed: boolean | undefined
  approve: boolean
}

export const ApproveButton = ({ isDisabled, isFixed, approve }: ApproveProps) => {
  const [t] = useTranslation()
  if (approve) {
    return (
      <Button
        disabled={isDisabled}
        data-testid="submit-button"
        type="submit"
        title={t('buttons.placeBid')}
        formButton
        width="100%"
        height="48px"
        fontWeight="500"
        padding={false}
        fontSize="14px"
        lineHeight="21px"
        border={true}
        background={isDisabled ? '#DDDDE3' : '#304FFE'}
        color={isDisabled ? '#7B7F93' : '#fff'}
      >
        {t('texts.approve')}
      </Button>
    )
  }

  return (
    <Button
      disabled={isDisabled}
      data-testid="submit-button"
      type="submit"
      title={t('buttons.placeBid')}
      formButton
      width="100%"
      height="48px"
      fontWeight="500"
      padding={false}
      fontSize="14px"
      lineHeight="21px"
      border={true}
      background={isDisabled ? '#DDDDE3' : '#304FFE'}
      color={isDisabled ? '#7B7F93' : '#fff'}
    >
      {isFixed ? t('texts.placeBuyOrder') : t('buttons.placeBid')}
    </Button>
  )
}
