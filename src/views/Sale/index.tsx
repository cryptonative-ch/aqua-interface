// Externals
import { useParams } from 'react-router-dom'
import React from 'react'

// General Components
import { ErrorMesssage } from 'src/components/ErrorMessage'

// Layouts
import { Center } from 'src/layouts/Center'

// Hooks
import { useSale } from 'src/hooks/useSale'

// Views
import { NotFoundView } from '../NotFound'
// Sub Views
import { FixedPriceSaleView } from './FixedPrice'
import { FairSaleView } from './FairSale'

interface SaleViewParams {
  saleId: string
}

export function SaleView() {
  const params = useParams<SaleViewParams>()
  const { loading, sale, error } = useSale(params.saleId)

  if (loading) {
    return <Center>Loading</Center>
  }
  // Error
  if (error) {
    return (
      <Center>
        <ErrorMesssage error={error} />
      </Center>
    )
  }

  if (!sale) {
    // Sale not found
    return <NotFoundView />
  }

  // Pass the sale down to the appropriate
  if (sale.type === 'FixedPriceSale') {
    // Fetch the sale from the subgraph, and use the appropriate view
    return <FixedPriceSaleView />
  }
  if (sale.type === 'FairSale') {
    return <FairSaleView />
  }
  // Sale not found
  return <NotFoundView />
}
