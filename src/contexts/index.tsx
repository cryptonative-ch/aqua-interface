/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { ConnectorNames } from 'src/providers/web3'

export const SanctionContext = React.createContext<boolean>(false)

export const BidModalContext = React.createContext({
  isShown: false,
  result: false,
  setResult: (_: boolean) => {
    //
  },
  toggleModal: () => {
    //
  },
})

interface Web3ConnectionContextProps {
  isConnecting: boolean,
  activatingConnector?: ConnectorNames,
  activatedConnector?: ConnectorNames,
  connect: (_: ConnectorNames) => void,
  disconnect: () => void,
}

export const Web3ConnectionContext = React.createContext<Web3ConnectionContextProps>({
  isConnecting: false,
  activatingConnector: undefined,
  activatedConnector: undefined,
  connect: (_: ConnectorNames) => {
    //
  },
  disconnect: () => {
    //
  },
})
