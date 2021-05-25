// External
import React from 'react'
import { useTranslation } from 'react-i18next'
import Spinner from 'react-spinner-material'

// Components
import { Text } from 'src/components/Text'
import { Flex } from 'src/components/Flex'
import { Modal } from 'src/components/Modal'

//theme
import { theme } from 'src/styles/theme'

// hooks
import { useModal } from 'src/hooks/useModal'

export const verifyTransaction = () => {
  const { isShown, toggle } = useModal()
  const [t] = useTranslation()
  const modalContent = (
    <Flex>
      <Spinner radius={120} color={theme.colors.primaryBackground} stroke={2} visible={true} />
      <Text>{t('text.verifyTransaction')}</Text>
    </Flex>
  )
  return <Modal headerText={t('text.verifyTransaction')} isShown={isShown} hide={toggle} modalContent={modalContent} />
}
