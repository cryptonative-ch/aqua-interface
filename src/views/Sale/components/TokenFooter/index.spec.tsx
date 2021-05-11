// Externals
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { TokenFooter } from './index'

// default
import { getSaleDefault } from 'src/utils/Defaults'

describe('TokenFooter', () => {
  test('should display multiple texts on Footer component', () => {
    const sale = getSaleDefault({ name: 'Compound' })

    const { getByText } = render(<TokenFooter sale={sale} />)
    expect(getByText('About Compound')).toBeInTheDocument()
    expect(getByText('Website')).toBeInTheDocument()
    expect(getByText('Socials')).toBeInTheDocument()
  })
})
