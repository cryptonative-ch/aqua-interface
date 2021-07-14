// External
import { useWeb3React } from '@web3-react/core'
import React, { useContext } from 'react'
import ReactDOM from 'react-dom'

// Assets
import { NetworkIcons, Web3ProviderIcons } from 'src/assets'

// Styles
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
  ListWrapper,
  SectionDivider,
} from 'src/components/AccountSwitch/style'
import { Button, ButtonText } from 'src/components/Header/style'

//Internal
import { CHAIN_ID, SUPPORTED_CHAINS } from 'src/constants'
import { Web3ConnectionContext } from 'src/contexts'
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
  const { library, chainId, account } = useWeb3React()
  const { disconnect: disconnectWallet, activatedConnector } = useContext(Web3ConnectionContext)

  const activeChainId: CHAIN_ID | undefined = chainId

  const changeNetwork = (chainId: CHAIN_ID) => {
    if ([CHAIN_ID.RINKEBY].includes(chainId)) {
      library?.send('wallet_switchEthereumChain', [
        { chainId: SUPPORTED_CHAINS[chainId].parameters.chainId },
        account,
      ])
    } else {
      library?.send('wallet_addEthereumChain', [SUPPORTED_CHAINS[chainId].parameters, account])
    }
  }

  const chainList = Object.values(SUPPORTED_CHAINS).filter(data => data.id != activeChainId)

  const connectorName = activatedConnector == ConnectorNames.Injected ? 'MetaMask' : activatedConnector

  const overlay = isActive ? (
    <>
      <Backdrop onClick={() => setActive(false)} />
      <Wrapper>
        <Container>
          {activeChainId && (
            <Section>
              <SectionTitle>
                <ItemIcon src={NetworkIcons[activeChainId]} alt={SUPPORTED_CHAINS[activeChainId].name} /> Connected to{' '}
                {SUPPORTED_CHAINS[activeChainId].name}
              </SectionTitle>

              {activatedConnector == ConnectorNames.Injected && (
                <ListWrapper>
                  <ListLabel>Switch Network:</ListLabel>
                  {chainList.map(chain => (
                    <ChainItem
                      key={chain.id}
                      chainName={chain.name}
                      icon={NetworkIcons[chain.id]}
                      onClick={() => changeNetwork(chain.id)}
                    />
                  ))}
                </ListWrapper>
              )}
            </Section>
          )}
          <SectionDivider />
          <Section grey>
            {activatedConnector && (
              <SectionTitle>
                <ItemIcon src={Web3ProviderIcons[activatedConnector]} alt={connectorName} /> Connected to{' '}
                {connectorName}
              </SectionTitle>
            )}

            <Button
              onClick={() => {
                disconnectWallet()
                setActive(false)
              }}
              backgroundColor="#7B7F93"
              textColor="white"
              padding="24px"
              width="100%"
              justifyContent="center"
              marginTop="24px"
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
