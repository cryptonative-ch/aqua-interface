// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { StaticHeader } from './index'

// Utils

describe('StaticHeader', () => {
  test('it should render the correct static header', async () => {
    const { getByText } = render(<StaticHeader />)
    expect(getByText('About Mesa')).toBeInTheDocument()
  })
})
