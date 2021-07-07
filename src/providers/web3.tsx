// Externals
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import React, { useState, useEffect } from 'react'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { toast } from 'react-toastify'

// Internal
import { getErrorMessage, injected, walletconnect } from 'src/connectors'
import { Web3ConnectionContext } from 'src/contexts'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
}

const connectors: { [connectorName in ConnectorNames]: AbstractConnector } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
}

export const Web3ConnectionProvider: React.FC = ({ children }) => {
  const { connector, activate, deactivate } = useWeb3React<Web3Provider>()
  const [activatingConnector, setActivatingConnector] = useState<ConnectorNames>()

  useEffect(() => {
    if (activatingConnector && connectors[activatingConnector] === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // Workaround for WalletConnect not showing QR Code after the first open
  // https://github.com/NoahZinsmeister/web3-react/issues/124
  const resetWalletConnect = (connector: AbstractConnector) => {
    if (
      connector &&
      connector instanceof WalletConnectConnector &&
      connector.walletConnectProvider?.wc?.uri
    ) {
      connector.walletConnectProvider = undefined
    }
  }

  const connect = (connectorName: ConnectorNames) => {
    setActivatingConnector(connectorName)

    if (connectorName == ConnectorNames.WalletConnect) {
      resetWalletConnect(connectors[connectorName]);
    }

    activate(connectors[connectorName]).catch(error => {
      toast.error('Failed to connect wallet')
      console.error(getErrorMessage(error))
    })
  }

  const disconnect = () => {
    if (connector instanceof WalletConnectConnector) {
      connector.close();
      resetWalletConnect(connector);
    }
    deactivate()
  }
  return (
    <Web3ConnectionContext.Provider
      value={{
        connect,
        disconnect,
        activatingConnector,
        isConnecting: !!activatingConnector,
      }}
    >
      {children}
    </Web3ConnectionContext.Provider>
  )
}
