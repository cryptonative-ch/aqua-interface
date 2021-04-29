// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import '../../i18n'

import i18n from 'i18next'
// Component
import { BackButton } from './index'

describe('BackButton', () => {
  test('should display the backToSales text in the button', () => {
    i18n.init({
      fallbackLng: 'en',
      react: {
        useSuspense: false,
      },
    })
    const { getByText, getByTestId } = render(
      <Router>
        <BackButton />
      </Router>
    )
    expect(getByText('buttons.backToSales')).toBeInTheDocument()
    expect((getByTestId('back-ref') as HTMLLinkElement).href).toContain('/sales')
  })
})
