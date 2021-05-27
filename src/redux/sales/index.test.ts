// Externals
import configureMockStore from 'redux-mock-store'
import { mockServer } from 'graphql-tools'
import thunk from 'redux-thunk'

//mocks
import { schemaString, mocks, preserveResolvers } from 'src/subgraph/mock'

// Components
import { salesQuery } from 'src/subgraph/Sales'

// components
import { thunks, reducer, ActionTypes, SaleActionTypes, SalesState } from './index'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({})

describe('async Sale Actions and Reducers', () => {
  let server: any
  let salesRequest: any

  const initialState: SalesState = {
    updatedAt: 0,
    isLoading: false,
    sales: [],
    error: null,
  }

  beforeEach(async () => {
    server = mockServer(schemaString, mocks, preserveResolvers)
    salesRequest = await server.query(salesQuery)
  })
  afterEach(() => {
    store.clearActions()
  })

  test.skip('should create GENERATE_AUCTIONS_SUCCESS when fetching sales is complete', async () => {
    const expectedActions = [
      {
        payload: true,
        type: ActionTypes.SALES_FETCH_REQUEST,
      },
      {
        type: ActionTypes.SALES_FETCH_SUCCESS,
        payload: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
      },
    ]
    return store.dispatch(thunks.fetchSales(salesRequest.data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  }),
    test('reducer should handle GENERATE_AUCTIONS_REQUEST', () => {
      const startAction: SaleActionTypes = {
        type: ActionTypes.SALES_FETCH_REQUEST,
        payload: true,
      }
      expect(reducer(initialState, startAction)).toEqual({
        sales: [],
        isLoading: true,
        error: null,
        updatedAt: 0,
      })
    }),
    test('reducer should handle GENERATE_AUCTIONS_SUCCESS', () => {
      const startActions: SaleActionTypes = {
        type: ActionTypes.SALES_FETCH_SUCCESS,
        payload: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
      }
      expect(reducer(initialState, startActions)).toEqual({
        sales: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
        isLoading: false,
        error: null,
        updatedAt: 0,
      })
    }),
    test('reducer should handle GENERATE_AUCTIONS_FAILURE', () => {
      const startActions: SaleActionTypes = {
        type: ActionTypes.SALES_FETCH_ERROR,
        payload: expect.any(Error),
      }
      expect(reducer(initialState, startActions)).toEqual({
        sales: [],
        error: expect.any(Error),
        isLoading: false,
        updatedAt: 0,
      })
    })
})
