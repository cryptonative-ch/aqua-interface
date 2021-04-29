// External
import { Route, Switch } from 'react-router-dom'
import React, { useContext } from 'react'

// Views
import { SaleView } from 'src/views/Sale'
import { SalesView } from 'src/views/Sales'
import { FixedPriceSaleView } from 'src/views/Sale/FixedPrice'
import { StaticView } from 'src/views/Static'
import { SanctionContext } from 'src/contexts'
import { NotFoundView } from 'src/views/NotFound'

export const AppRouter = () => {
  const sanctionValue = useContext(SanctionContext)

  if (sanctionValue === 'true') {
    return (
      <Switch>
        <Route exact path="*" component={NotFoundView} />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path="/" component={SalesView} />
      <Route exact path="/sales" component={SalesView} />
      <Route exact path="/sales/:saleId" component={SaleView} />
      <Route exact path="/sales/fixed/:saleId" component={FixedPriceSaleView} />
      <Route exact path="/about" component={StaticView} />
      <Route exact path="/contact" component={SalesView} />
      <Route exact path="*" component={NotFoundView} />
    </Switch>
  )
}
