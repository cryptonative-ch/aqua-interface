// Externals
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { TokenFooter } from 'src/views/Sale/components/TokenFooter/index'

// default
import { getSaleDefault, getSaleDetailsDefault } from 'src/utils'

describe('TokenFooter', () => {
  test('should display multiple texts on Footer component', () => {
    const sale = getSaleDefault({ name: 'Compound' })
    const saleDetails = getSaleDetailsDefault()

    const { getByText } = render(<TokenFooter sale={sale} saleDetails={saleDetails} />)
    expect(getByText('About Compound')).toBeInTheDocument()
    expect(getByText('Website')).toBeInTheDocument()
    expect(getByText('Socials')).toBeInTheDocument()
  }),
    test('should display sale details correctly on Footer component', () => {
      const sale = getSaleDefault()
      const saleDetails = getSaleDetailsDefault()

      const { getByTestId } = render(<TokenFooter sale={sale} saleDetails={saleDetails} />)
      expect((getByTestId('info-description') as HTMLDivElement).childElementCount).toBe(
        saleDetails.description?.length
      )
      expect((getByTestId('info-website') as HTMLLinkElement).href).toContain(saleDetails.website?.url)
      expect((getByTestId('info-socials') as HTMLDivElement).childElementCount).toBe(saleDetails.socials?.length)
    })
})
