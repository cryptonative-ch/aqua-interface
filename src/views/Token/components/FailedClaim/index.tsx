// Externals
import React from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { CardBody } from 'src/components/CardBody'
import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'
import { Card } from 'src/components/Card'

export const FailedClaim = () => {
  const [t] = useTranslation()
  return (
    <Card>
      <CardBody height="100%" textAlign="center">
        <Flex height="100%" width="100%" justifyContent="center" flexDirection="column">
          <CardText>{t('texts.failedTransaction')}</CardText>
        </Flex>
      </CardBody>
    </Card>
  )
}
