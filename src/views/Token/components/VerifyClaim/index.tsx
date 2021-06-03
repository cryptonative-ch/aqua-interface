// Externals
import React from 'react'

// Components
import { CardBody } from 'src/components/CardBody'
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'
import { Spinner } from 'src/components/Spinner'

export const VerifyState = () => {
  return (
    <CardBody height="100%" textAlign="center">
      <Flex height="100%" width="100%" justifyContent="center" flexDirection="column">
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
        <CardText>{t('texts.verifyTransaction')}</CardText>
      </Flex>
    </CardBody>
  )
}
