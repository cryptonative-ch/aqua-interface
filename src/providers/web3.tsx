// Externals
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import React, { useEffect } from 'react'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { toast } from 'react-toastify'

// Internal
import { getErrorMessage, injected, walletconnect } from 'src/connectors'
import { Web3ConnectionContext } from 'src/contexts'

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
  const [activatingConnector, setActivatingConnector] = React.useState<AbstractConnector>()

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  // const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  // useInactiveListener(!triedEager || !!activatingConnector)

  const connect = (connectorName: ConnectorNames) => {
    setActivatingConnector(connectors[connectorName])
    activate(connectors[connectorName])
      .catch(error => {
        toast.error('Failed to connect wallet')
        console.error(getErrorMessage(error))
      });
  }

  const disconnect = () => {
    deactivate()
  }

  return (
    <Web3ConnectionContext.Provider
      value={{
        connect,
        disconnect,
        isConnecting: !!activatingConnector
      }}
    >
      {children}
    </Web3ConnectionContext.Provider>
  )
}
