/* eslint-disable @typescript-eslint/no-unused-vars */
// External
import React from 'react'
import { ConnectorNames } from 'src/providers/web3'

// Interface
import { ClaimState } from 'src/hooks/useTokenClaim'

export interface ClaimContextProps {
  saleId: string
  claimContext: ClaimState
}

export interface ClaimContextType {
  claimShow: ClaimContextProps[]
  setClaimShow: (value: ClaimContextProps[]) => void
}

export const SanctionContext = React.createContext<boolean>(false)

export const ClaimContext = React.createContext<ClaimContextType>({} as ClaimContextType)

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
  isConnecting: boolean
  activatingConnector?: ConnectorNames
  activatedConnector?: ConnectorNames
  connect: (_: ConnectorNames) => void
  disconnect: () => void
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
