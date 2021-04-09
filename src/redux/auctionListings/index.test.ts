// Externals
import configureMockStore from 'redux-mock-store'
import { mockServer } from 'graphql-tools'
import thunk from 'redux-thunk'

//mocks
import { schemaString, queryAuctions, mocks, preserveResolvers } from 'src/subgraph/mock'

// components
import { fetchAuctions, AuctionReducer, ActionTypes, AuctionActionTypes } from './index'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({})

describe('async Auction Actions and Reducers', () => {
  let server: any
  let auctionsRequest: any
  beforeEach(async () => {
    server = mockServer(schemaString, mocks, preserveResolvers)
    auctionsRequest = await server.query(queryAuctions)
  })
  afterEach(() => {
    store.clearActions()
  })

  test('should create GENERATE_AUCTIONS_SUCCESS when fetching auctions is complete', async () => {
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
    return store.dispatch(fetchAuctions(auctionsRequest.data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  }),
    test('reducer should handle GENERATE_AUCTIONS_REQUEST', () => {
      const startAction: AuctionActionTypes = {
        type: ActionTypes.GENERATE_AUCTIONS_REQUEST,
        payload: true,
      }
      expect(AuctionReducer({ isLoading: false, auctions: [], error: null }, startAction)).toEqual({
        auctions: [],
        isLoading: true,
        error: null,
      })
    }),
    test('reducer should handle GENERATE_AUCTIONS_SUCCESS', () => {
      const startActions: AuctionActionTypes = {
        type: ActionTypes.GENERATE_AUCTIONS_SUCCESS,
        payload: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
      }
      expect(AuctionReducer({ isLoading: false, auctions: [], error: null }, startActions)).toEqual({
        auctions: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
        isLoading: false,
        error: null,
      })
    }),
    test('reducer should handle GENERATE_AUCTIONS_FAILURE', () => {
      const startActions: AuctionActionTypes = {
        type: ActionTypes.GENERATE_AUCTIONS_FAILURE,
        payload: expect.any(Error),
      }
      expect(AuctionReducer({ isLoading: false, auctions: [], error: null }, startActions)).toEqual({
        auctions: [],
        error: expect.any(Error),
        isLoading: false,
      })
    })
})
