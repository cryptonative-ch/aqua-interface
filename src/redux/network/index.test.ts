// Externals
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

// components
import { reducer, ActionTypes, NetworkAction, NetworkState } from 'src/redux/network/index'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({})

describe('Network Actions and Reducers', () => {
  const initialState: NetworkState = {
    validChainId: true,
  }

  afterEach(() => {
    store.clearActions()
  })

  test('reducer should handle NETWORK_SET_VALID_CHAIN_ID', () => {
    const startAction: NetworkAction = {
      type: ActionTypes.NETWORK_SET_VALID_CHAIN_ID,
    }
    expect(reducer(initialState, startAction)).toEqual({
      validChainId: true,
    })
  }),
    test('reducer should handle NETWORK_SET_INVALID_CHAIN_ID', () => {
      const startAction: NetworkAction = {
        type: ActionTypes.NETWORK_SET_INVALID_CHAIN_ID,
      }
      expect(reducer(initialState, startAction)).toEqual({
        validChainId: false,
      })
    })
})
