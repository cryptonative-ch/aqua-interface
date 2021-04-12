// Externals

import React from 'react'
import { render } from '@testing-library/react'
import { UseWalletProvider } from 'use-wallet'
import dayjs, { Dayjs } from 'dayjs'
import '@testing-library/jest-dom/extend-expect'
// Icons
import Compound from 'src/assets/svg/Compound.svg'

// Component
import { StaticContent } from './index'

// variables
const addHours = (dayjsInstance: Dayjs, hours: number) => dayjsInstance.clone().add(hours, 'h')
const utcDate = dayjs(new Date().toUTCString())
const dateUTC = dayjs.unix(utcDate.unix())

describe('StaticContent', () => {
  test('should display multiple texts on Content component', () => {
    const { getByText } = render(
      <UseWalletProvider
        chainId={4}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
          walletlink: {
            url: 'https://mainnet.eth.aragon.network/',
            appName: 'Coinbase Wallet',
            appLogoUrl: '',
          },
        }}
      >
        <StaticContent />
      </UseWalletProvider>
    )
    expect(getByText('What is Mesa?')).toBeInTheDocument()
    expect(getByText('Website')).toBeInTheDocument()
    expect(getByText('Socials')).toBeInTheDocument()
  })
})
