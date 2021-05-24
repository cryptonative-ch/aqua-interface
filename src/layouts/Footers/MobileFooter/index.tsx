// External
import React from 'react'

//Internal
import { Wrapper } from './style'
import { Button, ButtonText } from 'src/layouts/Header/style'

export interface MobileFooterProps {
  onClick?: () => void
}

export const MobileFooter: React.FC<MobileFooterProps> = ({}) => {
  return (
    <Wrapper>
      <Button
        onClick={() => {
          //
        }}
        backgroundColor="#304FFE"
        textColor="white"
        padding="0"
        width="100%"
        margin="0 0 8px 0"
        justifyContent="center"
      >
        <ButtonText>Claim Tokens</ButtonText>
      </Button>
      <Button
        onClick={() => {
          //
        }}
        backgroundColor="#7B7F93"
        textColor="white"
        padding="0"
        width="100%"
        margin="0"
        justifyContent="center"
      >
        <ButtonText>Withdraw Failed Bids</ButtonText>
      </Button>
    </Wrapper>
  )
}
