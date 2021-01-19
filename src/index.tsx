// External
import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { Provider as StoreProvider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'
import { render } from 'react-dom'
import React from 'react'

// Redux store
import { store } from 'src/redux/store'

// App tree
import { App } from './App'

// i18n
import './i18n'

function getLibrary(provider: ExternalProvider) {
  const library = new Web3Provider(provider)
  return library
}

render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
