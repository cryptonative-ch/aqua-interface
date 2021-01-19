// External
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import React, { Suspense } from 'react'

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
          <AppRouter />
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  )
}
