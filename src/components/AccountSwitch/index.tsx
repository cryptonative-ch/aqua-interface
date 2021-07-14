// External
import React from 'react'
import ReactDOM from 'react-dom'
import { NetworkIcons, Web3ProviderIcons } from 'src/assets'

//Internal
import {
  ItemWrapper,
  ItemIcon,
  ItemTitle,
  Wrapper,
  Section,
  Container,
  SectionTitle,
  Backdrop,
  ListLabel,
  SectionDivider,
} from 'src/components/AccountSwitch/style'
import { Button, ButtonText } from 'src/components/Header/style'
import { CHAIN_NAMES } from 'src/constants'
import { ConnectorNames } from 'src/providers/web3'

interface ChainItemProps {
  chainName: string
  icon: string
  onClick: () => void
}

const ChainItem: React.FC<ChainItemProps> = ({ chainName, icon, onClick }) => {
  return (
    <ItemWrapper onClick={onClick}>
      <ItemTitle>{chainName}</ItemTitle>
      <div>
        <ItemIcon src={icon} alt={chainName} />
      </div>
    </ItemWrapper>
  )
}

interface AccountSwitchProps {
  isActive: boolean
  setActive: (isActive: boolean) => void
}

export const AccountSwitch: React.FC<AccountSwitchProps> = ({ isActive, setActive }) => {
  const overlay = isActive ? (
    <>
      <Backdrop onClick={() => setActive(false)} />
      <Wrapper>
        <Container>
          <Section>
            <SectionTitle>
              <ItemIcon src={NetworkIcons[CHAIN_NAMES.MAINNET]} alt={CHAIN_NAMES.MAINNET} /> Connected to{' '}
              {CHAIN_NAMES.MAINNET}
            </SectionTitle>

            <ListLabel>Switch Network:</ListLabel>
            <ChainItem
              chainName={CHAIN_NAMES.RINKEBY}
              icon={NetworkIcons[CHAIN_NAMES.RINKEBY]}
              onClick={() => {
                console.log('Clicked')
              }}
            />
            <ChainItem
              chainName={CHAIN_NAMES.XDAI}
              icon={NetworkIcons[CHAIN_NAMES.XDAI]}
              onClick={() => {
                console.log('Clicked')
              }}
            />
          </Section>
          <SectionDivider />
          <Section grey>
            <SectionTitle>
              <ItemIcon src={Web3ProviderIcons[ConnectorNames.Injected]} alt={ConnectorNames.Injected} /> Connected to{' '}
              {ConnectorNames.Injected}
            </SectionTitle>

            <Button
              // onClick={disconnectWallet}
              backgroundColor="#7B7F93"
              textColor="white"
              padding="24px"
              width="100%"
              justifyContent="center"
            >
              <ButtonText>Disconnect</ButtonText>
            </Button>
          </Section>
        </Container>
      </Wrapper>
    </>
  ) : null

  return ReactDOM.createPortal(overlay, document.body)
}
