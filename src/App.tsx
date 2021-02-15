// External
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import React, { Suspense, Fragment } from 'react'
import { UseWalletProvider } from 'use-wallet'
import { CookiesProvider } from 'react-cookie'

// Styles
import { GlobalStyle } from './styles/Global'
import { theme } from './styles/theme'

// App Router
import { AppRouter } from './router'
import { useModal } from 'src/hooks/useModal'
import { Modal } from 'src/components/Modal'
import { ConfirmButton } from 'src/components/ConfirmButton'

export const App = () => {
  const { isShown, toggle } = useModal()

  const content = <Fragment>
    <div>You agree to the Terms and Conditions of sale by pressing the Continue</div>
    <ConfirmButton onClick={() => toggle(true)}>Continue</ConfirmButton>
  </Fragment>

  return (
    <CookiesProvider>
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
              <Modal isShown={isShown} hide={toggle} modalContent={content} headerText="Confirmation" />
            </UseWalletProvider>
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </CookiesProvider>
  )
}
