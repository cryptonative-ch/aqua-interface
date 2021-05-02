// Externals
import configureMockStore from 'redux-mock-store'
import { mockServer } from 'graphql-tools'
import thunk from 'redux-thunk'

//mocks
import { schemaString, mocks, preserveResolvers } from 'src/subgraph/mock'

// Components
import { salesQuery } from 'src/subgraph/Sales'

// components
import { fetchSales, SaleReducer, ActionTypes, SaleActionTypes } from './index'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({})

describe('async Sale Actions and Reducers', () => {
  let server: any
  let salesRequest: any
  beforeEach(async () => {
    server = mockServer(schemaString, mocks, preserveResolvers)
    salesRequest = await server.query(salesQuery)
  })
  afterEach(() => {
    store.clearActions()
  })

  test('should create GENERATE_AUCTIONS_SUCCESS when fetching sales is complete', async () => {
    const expectedActions = [
      {
        payload: true,
        type: ActionTypes.GENERATE_AUCTIONS_REQUEST,
      },
      {
        type: ActionTypes.GENERATE_AUCTIONS_SUCCESS,
        payload: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
      },
    ]
    return store.dispatch(fetchSales(salesRequest.data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  }),
    test('reducer should handle GENERATE_AUCTIONS_REQUEST', () => {
      const startAction: SaleActionTypes = {
        type: ActionTypes.GENERATE_AUCTIONS_REQUEST,
        payload: true,
      }
      expect(SaleReducer({ isLoading: false, sales: [], error: null }, startAction)).toEqual({
        sales: [],
        isLoading: true,
        error: null,
      })
    }),
    test('reducer should handle GENERATE_AUCTIONS_SUCCESS', () => {
      const startActions: SaleActionTypes = {
        type: ActionTypes.GENERATE_AUCTIONS_SUCCESS,
        payload: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
      }
      expect(SaleReducer({ isLoading: false, sales: [], error: null }, startActions)).toEqual({
        sales: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
        isLoading: false,
        error: null,
      })
    }),
    test('reducer should handle GENERATE_AUCTIONS_FAILURE', () => {
      const startActions: SaleActionTypes = {
        type: ActionTypes.GENERATE_AUCTIONS_FAILURE,
        payload: expect.any(Error),
      }
      expect(SaleReducer({ isLoading: false, sales: [], error: null }, startActions)).toEqual({
        sales: [],
        error: expect.any(Error),
        isLoading: false,
      })
    })
})
