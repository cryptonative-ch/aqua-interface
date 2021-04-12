// Externals

import React from 'react'
import { render } from '@testing-library/react'
import { UseWalletProvider } from 'use-wallet'
import '@testing-library/jest-dom/extend-expect'

// Component
import { StaticContent } from './index'

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
