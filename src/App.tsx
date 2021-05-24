// External
import { Mesa, MesaConfigMap, RINKEBY_CONFIG, XDAI_CONFIG } from '@dxdao/mesa'
import React, { Suspense, useEffect, useState, useCallback } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { CookiesProvider } from 'react-cookie'
import Axios from 'axios'

// Styles
import { GlobalStyle } from './styles/Global'
import { theme } from './styles/theme'

// Hooks
import { useModal } from 'src/hooks/useModal'
// App Router
import { AppRouter } from './router'

// Constantsx
import { CHAIN_ID, SANCTION_LIST } from 'src/constants'

// Components
import { ConfirmButton } from 'src/components/Buttons/ConfirmButton'
import { Modal } from 'src/components/Modal'

// Layouts
import { Center } from './layouts/Center'

// Contexts
import { SanctionContext } from 'src/contexts'
import { MesaContext } from 'src/mesa'
import { ENDPOINT } from './subgraph'

export const App = () => {
  const { isShown, toggle } = useModal()
  const [sanction, setSanction] = useState<boolean>(false)
  const { library, chainId } = useWeb3React()
  // Default: XDAI
  let mesaConfig: MesaConfigMap = XDAI_CONFIG
  // Use Rinkeby
  if (chainId && chainId === CHAIN_ID.RINKEBY) {
    mesaConfig = RINKEBY_CONFIG
  }
  // Development
  if (process.env.NODE_ENV === 'development') {
    mesaConfig = {
      ...RINKEBY_CONFIG,
      subgraph: ENDPOINT,
    }
  }
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
      <ConfirmButton onClick={() => toggle(true)}>Continue</ConfirmButton>
    </>
  )

  return (
    <CookiesProvider>
      <MesaContext.Provider value={mesa}>
        <SanctionContext.Provider value={sanction}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Suspense fallback={<Center minHeight="100%">LOADING</Center>}>
              <BrowserRouter>
                <AppRouter />
                <Modal isShown={isShown} hide={toggle} modalContent={content} headerText="Confirmation" />
              </BrowserRouter>
            </Suspense>
          </ThemeProvider>
        </SanctionContext.Provider>
      </MesaContext.Provider>
    </CookiesProvider>
  )
}
