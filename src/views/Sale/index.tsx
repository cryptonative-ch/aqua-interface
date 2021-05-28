// Externals
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

// General Components
import { ErrorMesssage } from 'src/components/ErrorMessage'

// Layouts
import { Center } from 'src/layouts/Center'

// Hooks
import { useSaleQuery } from 'src/hooks/useSaleQuery'

// Views
import { NotFoundView } from '../NotFound'
// Sub Views
import { FixedPriceSaleView } from './FixedPrice'
import { FairSaleView } from './FairSale'

interface SaleViewParams {
  saleId: string
}

export function SaleView() {
  const dispatch = useDispatch()
  const params = useParams<SaleViewParams>()
  // Fetch the sale from the subgraph, and use the appropriate view
  const { loading, sale, error } = useSaleQuery(params.saleId)

  useEffect(() => {
    dispatch(setPageTitle(sale?.tokenIn.name || 'Sale'))
  }, [sale])

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
  if (sale.__typename === 'FixedPriceSale') {
    return <FixedPriceSaleView />
  }
  if (sale.__typename === 'FairSale') {
    return <FairSaleView />
  }
  // Sale not found
  return <NotFoundView />
}
