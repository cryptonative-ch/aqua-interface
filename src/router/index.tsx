// External
import { Route, Switch } from 'react-router-dom'
import React from 'react'

// Views
import { SimulationView } from 'src/views/Simulation'
import { AuctionsView } from 'src/views/Auctions'
import { NotFoundView } from 'src/views/NotFound'
import { AuctionView } from 'src/views/Auction'

export const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={AuctionsView} />
      <Route exact path="/auctions/simulation" component={SimulationView} />
      <Route exact path="/auctions/:auctionId" component={AuctionView} />
      <Route exact path="/auctions" component={AuctionsView} />
      <Route exact path="*" component={NotFoundView} />
    </Switch>
  )
}
