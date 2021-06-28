// Externals
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

// General Components
import { ErrorMessage } from 'src/components/ErrorMessage'

// Redux Actions
import { setPageTitle } from 'src/redux/page'

// Layouts
import { Center } from 'src/layouts/Center'

// Hooks
import { useSaleQuery } from 'src/hooks/useSaleQuery'

// Views
import { NotFoundView } from 'src/views/NotFound'
// Sub Views
import { FixedPriceSaleView } from 'src/views/Sale/FixedPrice'
import { FairSaleView } from 'src/views/Sale/FairSale'

interface SaleViewParams {
  saleId: string
}

export function SaleView() {
  const dispatch = useDispatch()
  const params = useParams<SaleViewParams>()
  // Fetch the sale from the subgraph, and use the appropriate view
  const { loading, sale, error } = useSaleQuery(params.saleId)

  useEffect(() => {
    dispatch(setPageTitle(`${sale?.tokenOut.name} – ${sale?.tokenOut.symbol}` || 'Sale'))
  }, [sale])

  if (loading) {
    return <Center minHeight="100vh">Loading</Center>
  }
  // Error
  if (error) {
    return (
      <Center>
        <ErrorMessage error={error} />
      </Center>
    )
  }
  // Sale not found
  if (!sale) {
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
