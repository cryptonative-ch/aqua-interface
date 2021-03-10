// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { TokenFooter } from './index'

describe('TokenFooter', () => {
  test('should display multiple texts on Footer component', () => {
    const { getByText } = render(<TokenFooter />)
    expect(getByText('Learn more about XYZ')).toBeInTheDocument()
    expect(getByText('Website')).toBeInTheDocument()
    expect(getByText('Whitepaper')).toBeInTheDocument()
    expect(getByText('Twitter')).toBeInTheDocument()
    expect(getByText('Discord')).toBeInTheDocument()
    expect(getByText('Etherscan')).toBeInTheDocument()
  })
})
