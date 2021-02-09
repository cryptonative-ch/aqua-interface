// External
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import React, { Suspense } from 'react'
import { UseWalletProvider } from 'use-wallet'

// Styles
import { GlobalStyle } from './styles/Global'
import { theme } from './styles/theme'

// App Router
import { AppRouter } from './router'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Suspense fallback={<>loading</>}>
        <BrowserRouter>
          <UseWalletProvider
            chainId={42}
            connectors={{
              walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
              walletlink: {
                url: "https://mainnet.eth.aragon.network/",
                appName: "Coinbase Wallet",
                appLogoUrl: "",
              },
            }}
          >
            <AppRouter />
          </UseWalletProvider>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  )
}
