// Externals
import React from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { Modal } from 'src/components/Modal'
import { Flex } from 'src/components/Flex'
import { Divider } from 'src/components/Divider'
import { Text } from 'src/components/Text'
import { Button } from 'src/components/Buttons/Button'

// hooks
import { useModal } from 'src/hooks/useModal'

export const withdrawBidModal = () => {
  const [t] = useTranslation()
  const { isShown, toggle } = useModal()
  const modalContent = (
    <Flex>
      <Divider />
      <Flex>
        <Text>500 DAI</Text>
        <Text>Amount</Text>
      </Flex>
      <Button></Button>
    </Flex>
  )
  return <Modal headerText={'Withdraw'} modalContent={modalContent} isShown={isShown} hide={toggle} />
}
