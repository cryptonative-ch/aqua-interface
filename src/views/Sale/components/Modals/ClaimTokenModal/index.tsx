// Externals
import React from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { Modal } from 'src/components/Modal'
import { Flex } from 'src/components/Flex'
import { Divider } from 'src/components/Divider'

// hooks
import { useModal } from 'src/hooks/useModal'
import { TokenIconFigure } from 'src/components/Icons/TokenIconFigure'
import { CardText } from "src/components/Cards/CardText";
import { Icon } from 'src/components/Icons/Icon'

// interface
import { Sale } from 'src/interfaces/Sale'

// svg
import noToken from 'src/assets/svg/no-token-image.svg'
import { TokenClaimButton } from 'src/components/Buttons/TokenClaim'

interface WithdrawBidModalProps {
  sale:Sale
}


export const withdrawBidModal = ({sale}:WithdrawBidModalProps) => {
  const [t] = useTranslation()
  const { isShown, toggle } = useModal()
  const modalContent = (
    <Flex>
      <Flex>
        <TokenIconFigure>
          <Icon src={sale.tokenOut?.icon || noToken} alt={sale.tokenOut?.name} />
        </TokenIconFigure>
      <CardText fontSize='title'>Claim IOP</CardText>
      </Flex>
      <Divider />
      <Flex>
        <Flex>
          <CardText>UnClaimed</CardText>
          <CardText>2.678 IOP</CardText>
        </Flex>
        <Flex>
            <CardText>Current Price</CardText>
          <Flex>
            <CardText>2.23 DAI</CardText>
            <CardText>+98%</CardText>
          </Flex>
        </Flex>
      </Flex>
      <TokenClaimButton/>
    </Flex>
  )
  return <Modal headerText={'Withdraw'} modalContent={modalContent} isShown={isShown} hide={toggle} />
}
