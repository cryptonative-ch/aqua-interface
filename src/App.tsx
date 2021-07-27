// External
import { Aqua, AquaConfigMap, RINKEBY_CONFIG, XDAI_CONFIG } from '@dxdao/aqua'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import React, { Suspense, useEffect, useState, useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { CookiesProvider } from 'react-cookie'
import Axios from 'axios'

// Providers
import { Web3ConnectionProvider } from 'src/providers/web3'

// Styles
import { GlobalStyle } from 'src/styles/Global'
import { theme } from 'src/styles/theme'
import 'react-toastify/dist/ReactToastify.css'

// Hooks
import { useCookieModal } from 'src/hooks/useCookieModal'
import { useWindowSize } from 'src/hooks/useWindowSize'

// App Router
import { AppRouter } from 'src/router'

// Constantsx
import { CHAIN_ID, SANCTION_LIST, SHOW_TERMS_AND_CONDITIONS, SUBGRAPH_ENDPOINT } from 'src/constants'

// Components
import { Modal } from 'src/components/Modal'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { FeedbackOverlay } from 'src/components/FeedbackOverlay'

// Layouts
import { Center } from 'src/layouts/Center'

// Contexts
import { SanctionContext } from 'src/contexts'
import { AquaContext } from 'src/aqua'

export const Container = styled.div`
  position: relative;
  min-height: 100vh;
`

export const App = () => {
  const { isMobile } = useWindowSize()
  const { isShown, toggle } = useCookieModal('termsofsale')
  const [sanction, setSanction] = useState<boolean>(false)
  const { library, chainId } = useWeb3React()
  // Default: XDAI
  let aquaConfig: AquaConfigMap = XDAI_CONFIG

  if (process.env.NODE_ENV === 'development') {
    aquaConfig = {
      ...RINKEBY_CONFIG,
      subgraph: SUBGRAPH_ENDPOINT,
    }
  }
  // Use Rinkeby
  if (chainId && chainId === CHAIN_ID.RINKEBY) {
    aquaConfig = RINKEBY_CONFIG
  }
  // Development

  // Start new Apollo Client
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: aquaConfig.subgraph,
  })

  // Construct the Mesa SDK
  const aqua = new Aqua(aquaConfig, library)
  const getGeoInfo = useCallback(() => {
    Axios.get('https://ipapi.co/json/').then(({ data }) => setSanction(SANCTION_LIST.includes(data.country_code)))
  }, [])

  useEffect(() => {
    getGeoInfo()
  }, [getGeoInfo])

  const content = (
    <>
      <div>You agree to the Terms and Conditions of sale by pressing the Continue</div>
    </>
  )

  return (
    <Web3ConnectionProvider>
      <CookiesProvider>
        <ApolloProvider client={apolloClient}>
          <AquaContext.Provider value={aqua}>
            <SanctionContext.Provider value={sanction}>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Suspense fallback={<Center minHeight="100vh">LOADING</Center>}>
                  <BrowserRouter>
                    <Container>
                      <Header />
                      <AppRouter />
                      <Modal
                        isShown={SHOW_TERMS_AND_CONDITIONS && isShown}
                        hide={toggle}
                        modalContent={content}
                        headerText="Confirmation"
                        onConfirm={() => toggle(true)}
                      />
                      {!isMobile && <Footer />}
                      <ToastContainer
                        position="bottom-right"
                        autoClose={10000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                      />
                      {!isMobile && <FeedbackOverlay />}
                    </Container>
                  </BrowserRouter>
                </Suspense>
              </ThemeProvider>
            </SanctionContext.Provider>
          </AquaContext.Provider>
        </ApolloProvider>
      </CookiesProvider>
    </Web3ConnectionProvider>
  )
}
