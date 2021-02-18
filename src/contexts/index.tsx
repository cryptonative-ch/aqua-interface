import React from 'react'

export const SanctionContext = React.createContext('false')

export const BidModalContext = React.createContext({
  isShown: false,
  result: false,
  setResult: (value: boolean) => {
    //
    console.log(value)
  },
  toggleModal: () => {
    //
  },
})
