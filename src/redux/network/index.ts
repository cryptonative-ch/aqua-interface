import { Action } from 'redux'

export enum ActionTypes {
  NETWORK_SET_VALID_CHAIN_ID = 'NETWORK_SET_VALID_CHAIN_ID',
  NETWORK_SET_INVALID_CHAIN_ID = 'NETWORK_SET_INVALID_CHAIN_ID',
}

interface NetworkActionSetValidChainId extends Action<ActionTypes.NETWORK_SET_VALID_CHAIN_ID> {
  payload: number
}

interface NetworkActionSetInvalidChainId extends Action<ActionTypes.NETWORK_SET_INVALID_CHAIN_ID> {
  payload: number
}

export type NetworkAction = NetworkActionSetValidChainId | NetworkActionSetInvalidChainId

export type NetworkState = {
  validChainId: number | null
  invalidChainId: number | null
}

export const setValidChainId = (chainId: number): NetworkActionSetValidChainId => ({
  type: ActionTypes.NETWORK_SET_VALID_CHAIN_ID,
  payload: chainId,
})

export const setInvalidChainId = (chainId: number): NetworkActionSetInvalidChainId => ({
  type: ActionTypes.NETWORK_SET_INVALID_CHAIN_ID,
  payload: chainId,
})

export const initialState: NetworkState = {
  validChainId: null,
  invalidChainId: null,
}

export function reducer(state: NetworkState = initialState, action: NetworkAction) {
  switch (action.type) {
    case ActionTypes.NETWORK_SET_VALID_CHAIN_ID:
      return { ...state, validChainId: action.payload, invalidChainId: null }
    case ActionTypes.NETWORK_SET_INVALID_CHAIN_ID:
      return { ...state, invalidChainId: action.payload, validChainId: null }
    default:
      return state
  }
}
