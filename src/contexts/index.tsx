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

export const Web3ConnectionContext = React.createContext({
  isConnecting: false,
  connect: (_: ConnectorNames) => {
    //
  },
  disconnect: () => {
    //
  },
})
