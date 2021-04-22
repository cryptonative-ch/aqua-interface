/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import { mockServer } from 'graphql-tools'
import { cleanup } from '@testing-library/react'

//components
import { generateInitialAuctionData, getAuctionsData, selectAuctiontype } from './index'
import { auctionBidsQuery } from 'src/subgraph/AuctionBids'
import { auctionsQuery } from 'src/subgraph/Auctions'

//mocks
import { schemaString, mocks, preserveResolvers } from './mock'

//clean up

afterEach(cleanup)

describe('testing subgraph integration', () => {
  let server: any
  let auctionsRequest: any
  beforeEach(async () => {
    server = mockServer(schemaString, mocks, preserveResolvers)
    auctionsRequest = await server.query(auctionsQuery)
  })
  test('should check if auctionsQuery object contains type fairSale', async () => {
    const test = await getAuctionsData(auctionsRequest.data)
    expect(test).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'fairSale',
        }),
      ])
    )
  }),
    test('should check if auctionsQuery object contains type fixedPriceSale', async () => {
      const test = await getAuctionsData(auctionsRequest.data)
      expect(test).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'fixedPriceSale',
          }),
        ])
      )
    }),
    test('should display correct auctionBids', async () => {
      const auction = await getAuctionsData(auctionsRequest.data)
      const id = auction[0].id //emulate params.id
      const auctionBidsRequest = await server.query(auctionBidsQuery(id, selectAuctiontype(id, auction)))
      const test = await generateInitialAuctionData(auctionBidsRequest.data, selectAuctiontype(id, auction))
      expect(test[0].tokenIn._isBigNumber).toBeTruthy
    })
})
