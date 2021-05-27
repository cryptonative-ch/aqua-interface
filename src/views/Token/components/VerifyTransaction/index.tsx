// Externals
import React from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { Card } from 'src/components/Card'
import { CardBody } from 'src/components/CardBody'
import { CardText } from 'src/components/CardText'

export const VerifyTransaction = () => {
  const [t] = useTranslation()
  return (
    <Card>
      <CardBody>
        <CardText>{t('texts.verifyTransaction')}</CardText>
      </CardBody>
    </Card>
  )
}
