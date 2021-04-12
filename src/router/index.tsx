// External
import { Route, Switch } from 'react-router-dom'
import React, { useContext } from 'react'

// Views
import { SimulationView } from 'src/views/Simulation'
import { AuctionView } from 'src/views/Auction'
import { AuctionsView } from 'src/views/Auctions'
import { FixedPriceAuctionView } from 'src/views/Auction/FixedPrice'
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
      <Route exact path="/" component={AuctionsView} />
      <Route exact path="/auctions" component={AuctionsView} />
      <Route exact path="/auctions/:auctionId" component={AuctionView} />
      <Route exact path="/auctions/demo" component={SimulationView} />
      <Route exact path="/auctions/fixed/:auctionId" component={FixedPriceAuctionView} />
      <Route exact path="/about" component={StaticView} />
      <Route exact path="/contact" component={AuctionsView} />
      <Route exact path="*" component={NotFoundView} />
    </Switch>
  )
}
