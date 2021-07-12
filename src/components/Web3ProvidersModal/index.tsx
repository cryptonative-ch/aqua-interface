// External
import React, { useContext } from 'react'

// Internal
import { Web3ConnectionContext } from 'src/contexts'
import {
  ItemWrapper,
  ItemIcon,
  ItemTitle,
  ContentContainer,
  StatusText,
  ItemIconLarge,
} from 'src/components/Web3ProvidersModal/style'
import { ConnectorNames } from 'src/providers/web3'
import { Web3ProviderIcons } from 'src/assets'

// Components
import { Modal } from 'src/components/Modal'
import { Spinner } from 'src/components/Spinner'

interface Web3ProviderItemProps {
  providerName: string
  icon: string
  onClick: () => void
}

const Web3ProviderItem: React.FC<Web3ProviderItemProps> = ({ providerName, icon, onClick }) => {
  return (
    <ItemWrapper onClick={onClick}>
      <ItemTitle>{providerName}</ItemTitle>
      <div>
        <ItemIcon src={icon} alt={providerName} />
      </div>
    </ItemWrapper>
  )
}

interface Web3ProvidersModalProps {
  isShown: boolean
  hide: () => void
}

export const Web3ProvidersModal: React.FC<Web3ProvidersModalProps> = ({ isShown, hide }) => {
  const { connect, isConnecting, activatingConnector } = useContext(Web3ConnectionContext)

  const connectorName = activatingConnector == ConnectorNames.Injected ? 'MetaMask' : activatingConnector

  return (
    <Modal
      isShown={isShown}
      hide={hide}
      hideHeader={isConnecting}
      modalContent={
        <div>
          {isConnecting && activatingConnector ? (
            <ContentContainer>
              <ItemIconLarge src={Web3ProviderIcons[activatingConnector]} alt={activatingConnector} />
              <StatusText>Connect {connectorName} to Aqua</StatusText>
              <Spinner />
            </ContentContainer>
          ) : (
            <div>
              <Web3ProviderItem
                providerName="MetaMask"
                icon={Web3ProviderIcons[ConnectorNames.Injected]}
                onClick={() => connect(ConnectorNames.Injected)}
              />
              <Web3ProviderItem
                providerName="WalletConnect"
                icon={Web3ProviderIcons[ConnectorNames.WalletConnect]}
                onClick={() => connect(ConnectorNames.WalletConnect)}
              />
            </div>
          )}
        </div>
      }
      headerText="Connect to a Wallet"
    />
  )
}
