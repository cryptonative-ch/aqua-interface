// Externals
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { StaticContent } from './index'

describe('StaticContent', () => {
  test('should display multiple texts on Content component', () => {
    const { getByText } = render(<StaticContent />)
    expect(getByText('What is Mesa?')).toBeInTheDocument()
    expect(getByText('Website')).toBeInTheDocument()
    expect(getByText('Socials')).toBeInTheDocument()
  })
})
