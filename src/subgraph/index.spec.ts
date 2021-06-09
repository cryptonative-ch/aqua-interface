/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import { mockServer } from 'graphql-tools'
import { cleanup } from '@testing-library/react'

//components
import { getSalesData } from './index'
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
  test('should check if salesQuery object contains type fixedPriceSale', async () => {
    const test = await getSalesData(salesRequest.data)
    expect(test).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'FixedPriceSale',
        }),
      ])
    )
  })
})
