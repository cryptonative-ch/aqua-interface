import { Action } from 'redux'

export enum ActionTypes {
  NETWORK_SET_VALID_CHAIN_ID = 'NETWORK_SET_VALID_CHAIN_ID',
  NETWORK_SET_INVALID_CHAIN_ID = 'NETWORK_SET_INVALID_CHAIN_ID',
}

export type NetworkAction =
  | Action<ActionTypes.NETWORK_SET_VALID_CHAIN_ID>
  | Action<ActionTypes.NETWORK_SET_INVALID_CHAIN_ID>

export type NetworkState = {
  validChainId: boolean
}

export const setValidChainId = (): Action<ActionTypes.NETWORK_SET_VALID_CHAIN_ID> => ({
  type: ActionTypes.NETWORK_SET_VALID_CHAIN_ID,
})

export const setInvalidChainId = (): Action<ActionTypes.NETWORK_SET_INVALID_CHAIN_ID> => ({
  type: ActionTypes.NETWORK_SET_INVALID_CHAIN_ID,
})

// Initial validChainId state set to true to avoid initial render of warning
export const initialState: NetworkState = {
  validChainId: true,
}

export function reducer(state: NetworkState = initialState, action: NetworkAction) {
  switch (action.type) {
    case ActionTypes.NETWORK_SET_VALID_CHAIN_ID:
      return { ...state, validChainId: true }
    case ActionTypes.NETWORK_SET_INVALID_CHAIN_ID:
      return { ...state, validChainId: false }
    default:
      return state
  }
}
