// Externals

import React from 'react'
import { render } from '@testing-library/react'
import { UseWalletProvider } from 'use-wallet'
import dayjs, { Dayjs } from 'dayjs'
import '@testing-library/jest-dom/extend-expect'
// Icons
import Compound from 'src/assets/svg/Compound.svg'

// Component
import { TokenFooter } from './index'

// default
import { getAuctionDefault } from 'src/utils/Defaults'

// variables
const addHours = (dayjsInstance: Dayjs, hours: number) => dayjsInstance.clone().add(hours, 'h')
const utcDate = dayjs(new Date().toUTCString())
const dateUTC = dayjs.unix(utcDate.unix())

describe('TokenFooter', () => {
  test('should display multiple texts on Footer component', () => {
    const auction = getAuctionDefault()
    // const auction = {
    //   id: '0x143',
    //   startDate: addHours(dateUTC, 14).unix(),
    //   endDate: addHours(dateUTC, 114).unix(),
    //   tokenAddress: '0x',
    //   tokenAmount: 150000,
    //   tokenName: 'Compound',
    //   tokenOut.symbol: 'COMP',
    //   tokenIcon: Compound,
    //   bids: [],
    // }
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
