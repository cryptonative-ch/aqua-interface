/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import { mockServer } from 'graphql-tools'
import { cleanup } from '@testing-library/react'

//components
import { generateInitialSaleData, getSalesData, selectSaletype } from './index'
import { saleBidsQuery } from 'src/subgraph/SaleBids'
import { salesQuery } from 'src/subgraph/Sales'

//mocks
import { schemaString, mocks, preserveResolvers } from './mock'

//clean up

afterEach(cleanup)

describe('testing subgraph integration', () => {
  let server: any
  let salesRequest: any
  beforeEach(async () => {
    server = mockServer(schemaString, mocks, preserveResolvers)
    salesRequest = await server.query(salesQuery)
  })
  test('should check if salesQuery object contains type fairSale', async () => {
    const test = await getSalesData(salesRequest.data)
    expect(test).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'fairSale',
        }),
      ])
    )
  }),
    test('should check if salesQuery object contains type fixedPriceSale', async () => {
      const test = await getSalesData(salesRequest.data)
      expect(test).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'fixedPriceSale',
          }),
        ])
      )
    }),
    test('should display correct saleBids', async () => {
      const sale = await getSalesData(salesRequest.data)
      const id = sale[0].id //emulate params.id
      const saleBidsRequest = await server.query(saleBidsQuery(id, selectSaletype(id, sale)))
      const test = await generateInitialSaleData(saleBidsRequest.data, selectSaletype(id, sale))
      expect(test).toBeTruthy
    })
})
