// Externals
import configureMockStore from 'redux-mock-store'
import { mockServer } from 'graphql-tools'
import thunk from 'redux-thunk'

// mocks
import { schemaString, queryAuctions, mocks, preserveResolvers } from 'src/subgraph/mock'

// components
import { ActionTypes, BidActionTypes, BidReducer, fetchAuctionBids } from './index'
import { getAuctionsData, selectAuctiontype } from 'src/subgraph'
import { auctionBidsQuery } from 'src/subgraph/AuctionBids'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({})

describe('Async Bid Data Actions and Reducers', () => {
  let server: any
  let auctionsRequest: any
  beforeEach(async () => {
    server = mockServer(schemaString, mocks, preserveResolvers)
    auctionsRequest = await server.query(queryAuctions)
  })
  afterEach(() => {
    store.clearActions()
  })

  test('should create INITIAL_BID_SUCCESS when fetching bid data is complete', async () => {
    const auction = await getAuctionsData(auctionsRequest.data)
    const id = auction[0].id //emulate params.id
    const auctionBidsRequest = await server.query(auctionBidsQuery(id, selectAuctiontype(id, auction)))
    const expectedActions = [
      {
        payload: true,
        type: ActionTypes.INITIAL_BID_REQUEST,
      },
      {
        type: ActionTypes.INITIAL_BID_SUCCESS,
        payload: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
      },
    ]
    return store.dispatch(fetchAuctionBids(id, selectAuctiontype(id, auction), auctionBidsRequest.data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  }),
    test('reducer should handle INITIAL_BID_REQUEST', () => {
      const startAction: BidActionTypes = {
        type: ActionTypes.INITIAL_BID_REQUEST,
        payload: true,
      }
      expect(BidReducer({ isLoading: false, bids: [], error: null }, startAction)).toEqual({
        bids: [],
        isLoading: true,
        error: null,
      })
    }),
    test('reducer should handle INITIAL_BID_SUCCESS', async () => {
      const auction = await getAuctionsData(auctionsRequest.data)
      const id = auction[0].id //emulate params.id
      const auctionBidsRequest = await server.query(auctionBidsQuery(id, selectAuctiontype(id, auction)))
      const expectedActions: BidActionTypes = {
        type: ActionTypes.INITIAL_BID_SUCCESS,
        payload: auctionBidsRequest.data,
      }
      expect(BidReducer({ isLoading: false, bids: [], error: null }, expectedActions)).toEqual({
        bids: expect.objectContaining({
          easyAuction: expect.objectContaining({
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
      expect(BidReducer({ isLoading: false, bids: [], error: null }, startActions)).toEqual({
        bids: [],
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
