// Externals

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { StaticHeader } from 'src/views/Static/components/StaticHeader/index'

// Utils

describe('StaticHeader', () => {
  test('it should render the correct static header', async () => {
    const { getByText } = render(<StaticHeader />)
    expect(getByText('About Aqua')).toBeInTheDocument()
  })
})
