/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

export const SanctionContext = React.createContext('false')

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
