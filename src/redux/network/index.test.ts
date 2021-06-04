// Externals
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

// components
import { reducer, ActionTypes, NetworkAction, NetworkState } from './index'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({})

describe('Network Actions and Reducers', () => {
  const initialState: NetworkState = {
    validChainId: null,
    invalidChainId: null,
  }

  afterEach(() => {
    store.clearActions()
  })

  test('reducer should handle NETWORK_SET_VALID_CHAIN_ID', () => {
    const startAction: NetworkAction = {
      type: ActionTypes.NETWORK_SET_VALID_CHAIN_ID,
      payload: 100,
    }
    expect(reducer(initialState, startAction)).toEqual({
      validChainId: 100,
      invalidChainId: null,
    })
  }),
    test('reducer should handle NETWORK_SET_INVALID_CHAIN_ID', () => {
      const startAction: NetworkAction = {
        type: ActionTypes.NETWORK_SET_INVALID_CHAIN_ID,
        payload: 1,
      }
      expect(reducer(initialState, startAction)).toEqual({
        validChainId: null,
        invalidChainId: 1,
      })
    })
})
