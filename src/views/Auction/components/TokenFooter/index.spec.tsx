// Externals

import React from 'react'
import { render } from '@testing-library/react'
import { UseWalletProvider } from 'use-wallet'
import '@testing-library/jest-dom/extend-expect'

// Component
import { TokenFooter } from './index'

// default
import { getAuctionDefault } from 'src/utils/Defaults'

describe('TokenFooter', () => {
  test('should display multiple texts on Footer component', () => {
    const auction = getAuctionDefault({ name: 'Compound' })

    const { getByText } = render(
      <UseWalletProvider
        chainId={42}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
          walletlink: {
            url: 'https://mainnet.eth.aragon.network/',
            appName: 'Coinbase Wallet',
            appLogoUrl: '',
          },
        }}
      >
        <TokenFooter auction={auction} />
      </UseWalletProvider>
    )
    expect(getByText('About Compound')).toBeInTheDocument()
    expect(getByText('Website')).toBeInTheDocument()
    expect(getByText('Socials')).toBeInTheDocument()
  })
})
