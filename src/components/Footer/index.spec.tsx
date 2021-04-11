// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import '../../i18n'

// Component
import { Footer } from './index'

import i18n from 'i18next'

describe('About', () => {
  test('should display the about text in the link', () => {
    i18n.init({
      fallbackLng: 'en',
      react: {
        useSuspense: false,
      },
    })
    const { getByText, getByTestId } = render(
        <Router>
          <Footer />
        </Router>
    )
    expect(getByText('navTitles.about')).toBeInTheDocument()
    expect((getByTestId('about-ref') as HTMLLinkElement).href).toContain('/about')
    expect(getByText('navTitles.contact')).toBeInTheDocument()
    expect((getByTestId('contact-ref') as HTMLLinkElement).href).toContain('/contact')
  })
})