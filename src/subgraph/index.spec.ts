// Externals
import { mockServer } from 'graphql-tools'
import { cleanup } from '@testing-library/react'

//components
import { generateInitialAuctionData, getAuctionsData, selectAuctiontype } from './index'
import { auctionBidsQuery } from 'src/subgraph/AuctionBids'

//mocks
import { schemaString, queryAuctions, mocks, preserveResolvers } from './mock'

//clean up

afterEach(cleanup)

describe('testing subgraph integration', () => {
  let server: any
  let auctionsRequest: any
  beforeEach(async () => {
    server = mockServer(schemaString, mocks, preserveResolvers)
    auctionsRequest = await server.query(queryAuctions)
  })
  test('should check if queryAuctions object contains type easyAuction', async () => {
    const test = await getAuctionsData(auctionsRequest.data)
    expect(test).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'easyAuction',
        }),
      ])
    )
  }),
    test('should check if queryAuctions object contains type fixedPriceAuction', async () => {
      const test = await getAuctionsData(auctionsRequest.data)
      expect(test).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'fixedPriceAuction',
          }),
        ])
      )
    }),
    test('should display correct auctionBids', async () => {
      const auction = await getAuctionsData(auctionsRequest.data)
      const id = auction[0].id //emulate params.id
      const auctionBidsRequest = await server.query(auctionBidsQuery(id, selectAuctiontype(id, auction)))
      const test = await generateInitialAuctionData(auctionBidsRequest, selectAuctiontype(id, auction))
      expect(test).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            tokenInAmount: {
              type: 'BigNumber',
            },
            tokenOutAmount: {
              type: 'BigNumber',
            },
          }),
        ])
      )
    })
})
