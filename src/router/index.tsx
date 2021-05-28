// External
import { Route, Switch } from 'react-router-dom'
import React, { useContext } from 'react'

// Views
import { NotFoundView } from 'src/views/NotFound'
import { StaticView } from 'src/views/Static'
import { SalesView } from 'src/views/Sales'
import { SaleView } from 'src/views/Sale'
import { TokenView } from 'src/views/Token'

// Contexts
import { SanctionContext } from 'src/contexts'

export const AppRouter = () => {
  const sanctionValue = useContext(SanctionContext)

  if (sanctionValue) {
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
      <Route exact path="/about" component={StaticView} />
      <Route exact path="/contact" component={SalesView} />
      <Route exact path="/tokens" component={TokenView} />
      <Route exact path="*" component={NotFoundView} />
    </Switch>
  )
}
