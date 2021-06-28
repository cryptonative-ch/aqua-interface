// External
import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { Provider as StoreProvider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'
import { render } from 'react-dom'
import React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import durationTime from 'dayjs/plugin/duration'
import DayjsRelativeTime from 'dayjs/plugin/relativeTime'

// Redux store
import { store } from 'src/redux/store'

// App tree
import { App } from 'src/App'

// i18n
import 'src/i18n'

// Extends dayjs
dayjs.extend(DayjsRelativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)
dayjs.extend(relativeTime)
dayjs.extend(durationTime)

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
