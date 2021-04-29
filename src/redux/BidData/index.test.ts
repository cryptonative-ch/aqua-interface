// Externals
import configureMockStore from 'redux-mock-store'
import { mockServer } from 'graphql-tools'
import thunk from 'redux-thunk'

// mocks
import { schemaString, mocks, preserveResolvers } from 'src/subgraph/mock'

// Mesa Utils
import { salesQuery } from 'src/subgraph/Sales'

// components
import { ActionTypes, BidActionTypes, BidReducer, fetchSaleBids } from './index'
import { getSalesData, selectSaletype } from 'src/subgraph'
import { saleBidsQuery } from 'src/subgraph/SaleBids'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({})

describe('Async Bid Data Actions and Reducers', () => {
  let server: any
  let salesRequest: any
  beforeEach(async () => {
    server = mockServer(schemaString, mocks, preserveResolvers)
    salesRequest = await server.query(salesQuery)
  })
  afterEach(() => {
    store.clearActions()
  })

  test('should create INITIAL_BID_SUCCESS when fetching bid data is complete', async () => {
    const sale = await getSalesData(salesRequest.data)
    const id = sale[0].id //emulate params.id
    const saleBidsRequest = await server.query(saleBidsQuery(id, selectSaletype(id, sale)))
    const expectedActions = [
      {
        payload: true,
        type: ActionTypes.INITIAL_BID_REQUEST,
      },
      {
        type: ActionTypes.INITIAL_BID_SUCCESS,
        payload: expect.objectContaining({}),
      },
    ]

    return store.dispatch(fetchSaleBids(id, selectSaletype(id, sale), saleBidsRequest.data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  }),
    test('reducer should handle INITIAL_BID_REQUEST', () => {
      const startAction: BidActionTypes = {
        type: ActionTypes.INITIAL_BID_REQUEST,
        payload: true,
      }
      expect(BidReducer({ isLoading: false, bidsBySaleId: {}, error: null }, startAction)).toEqual({
        bidsBySaleId: {},
        isLoading: true,
        error: null,
      })
    }),
    test('reducer should handle INITIAL_BID_SUCCESS', async () => {
      const sale = await getSalesData(salesRequest.data)
      const id = sale[0].id //emulate params.id
      const saleBidsRequest = await server.query(saleBidsQuery(id, selectSaletype(id, sale)))
      const expectedActions: BidActionTypes = {
        type: ActionTypes.INITIAL_BID_SUCCESS,
        payload: saleBidsRequest.data,
      }
      expect(BidReducer({ isLoading: false, bidsBySaleId: {}, error: null }, expectedActions)).toEqual({
        bidsBySaleId: expect.objectContaining({
          fairSale: expect.objectContaining({
            bids: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
              }),
            ]),
          }),
        }),
        isLoading: false,
        error: null,
      })
    }),
    test('reducer should handle INITIAL_BID_FAILURE', () => {
      const startActions: BidActionTypes = {
        type: ActionTypes.INITIAL_BID_FAILURE,
        payload: expect.any(Error),
      }
      expect(BidReducer({ isLoading: false, bidsBySaleId: {}, error: null }, startActions)).toEqual({
        bidsBySaleId: {},
        error: expect.any(Error),
        isLoading: false,
      })
    })
})

/**
 * @todo test action creators
 * @todo test async action creators
 * @todo test reducers
 * @todo components that use redux
 */
