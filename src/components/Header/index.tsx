// External
import React from 'react'
import { useWallet } from 'use-wallet'

//Internal
import { Wrapper, Row, Title, Description, Button, ButtonText, ButtonImage } from './style'

export interface HeaderProps {
  connectWallet?: () => void
  isConnecting?: boolean
}

export const Header: React.FC<HeaderProps> = ({ connectWallet, isConnecting = false }) => {
  const wallet = useWallet()

  const walletAddress = wallet.account ? `${wallet.account.substr(0, 6)}...${wallet.account.substr(-4)}` : ''

  return (
    <Wrapper>
      <Row>
        <Title>Mesa</Title>
        <Description>from DXdao</Description>
      </Row>
      <Button
        onClick={connectWallet}
        backgroundColor={!wallet.account ? '#304FFE' : '#DDDDE3'}
        textColor={!wallet.account ? 'white' : '#000629'}>
        <ButtonText>{isConnecting ? 'Connecting...' : !wallet.account ? 'Connect Wallet' : walletAddress}</ButtonText>
        {wallet.account && (<ButtonImage />)}
      </Button>
    </Wrapper>
  )
}
