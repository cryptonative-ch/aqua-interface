// External
import { Mesa, MesaConfigMap, RINKEBY_CONFIG, XDAI_CONFIG } from '@dxdao/mesa'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import React, { Suspense, useEffect, useState, useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { CookiesProvider } from 'react-cookie'
import Axios from 'axios'

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

// Layouts
import { Center } from 'src/layouts/Center'

// Contexts
import { SanctionContext } from 'src/contexts'
import { MesaContext } from 'src/mesa'

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
  let mesaConfig: MesaConfigMap = XDAI_CONFIG

  if (process.env.NODE_ENV === 'development') {
    mesaConfig = {
      ...RINKEBY_CONFIG,
      subgraph: SUBGRAPH_ENDPOINT,
    }
  }
  // Use Rinkeby
  if (chainId && chainId === CHAIN_ID.RINKEBY) {
    mesaConfig = RINKEBY_CONFIG
  }
  // Development

  // Start new Apollo Client
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: mesaConfig.subgraph,
  })

  // Construct the Mesa SDK
  const mesa = new Mesa(mesaConfig, library)
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
    <CookiesProvider>
      <ApolloProvider client={apolloClient}>
        <MesaContext.Provider value={mesa}>
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
                  </Container>
                </BrowserRouter>
              </Suspense>
            </ThemeProvider>
          </SanctionContext.Provider>
        </MesaContext.Provider>
      </ApolloProvider>
    </CookiesProvider>
  )
}
