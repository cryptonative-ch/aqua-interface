// Externals
import React from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { Flex } from 'src/components/Flex'
import { Icon } from 'src/components/Icons/Icon'
import { TokenIconFigure } from 'src/components/Icons/TokenIconFigure'
import { Text } from "src/components/Text";
import {  Button} from "src/components/Buttons/Button";





export const ClaimSuccessModal = () => {
    const [t] = useTranslation()
    return (
        <Flex>
            <TokenIconFigure>
                <Icon></Icon>
            </TokenIconFigure>
            <Text>{t('text.claimSuccessful')}</Text>
            <Text>2,678.5713 IOP has been sent to your address.</Text>
            <Text>See this transaction on block explorer</Text>
            <Button>{t('buttons.done')}</Button>
        </Flex>
    )
}







