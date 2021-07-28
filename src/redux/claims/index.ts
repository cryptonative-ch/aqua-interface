// Interface
import { Action } from 'redux'

//Action

export enum ActionTypes {
  UNCLAIMED = 'UNCLAIMED',
  VERIFY = 'VERIFY',
  FAILED = 'FAILED',
  CLAIMED = 'CLAIMED',
}

export interface ClaimState {
  saleId: string
  ClaimToken: ActionTypes
}

interface UnclaimedAction extends Action<ActionTypes.UNCLAIMED> {
  payload: ClaimState
}

interface VerifyAction extends Action<ActionTypes.VERIFY> {
  payload: ClaimState
}

interface FailedAction extends Action<ActionTypes.FAILED> {
  payload: ClaimState
}

interface ClaimedAction extends Action<ActionTypes.CLAIMED> {
  payload: ClaimState
}

export type ClaimActionTypes = UnclaimedAction | VerifyAction | FailedAction | ClaimedAction

export const unclaimed = (payload: ClaimState) => ({
  payload,
  type: ActionTypes.UNCLAIMED,
})

export const verify = (payload: ClaimState) => ({
  payload,
  type: ActionTypes.VERIFY,
})

export const failed = (payload: ClaimState) => ({
  payload,
  type: ActionTypes.FAILED,
})

export const claimed = (payload: string) => ({
  payload,
  type: ActionTypes.CLAIMED,
})

export interface ClaimTokensState {
  claims: ClaimState[]
}

export const defaultState: ClaimTokensState = { claims: [] }

const eventExists = (events: ClaimState[], event: ClaimState) => {
  return events.some(e => e.saleId === event.saleId)
}

export function reducer(state: ClaimTokensState = defaultState, action: ClaimActionTypes): ClaimTokensState {
  switch (action.type) {
    case ActionTypes.UNCLAIMED:
      return {
        claims: [...state.claims, action.payload],
      }

    case ActionTypes.VERIFY:
      return {
        claims: eventExists(state.claims, action.payload)
          ? state.claims.map(element => {
              if (element.saleId === action.payload.saleId) {
                return {
                  ...element,
                  claimToken: action.payload.ClaimToken,
                }
              }
              return element
            })
          : [...state.claims, action.payload],
      }
    case ActionTypes.FAILED:
      return {
        claims: eventExists(state.claims, action.payload)
          ? state.claims.map(element => {
              if (element.saleId === action.payload.saleId) {
                return {
                  ...element,
                  claimToken: action.payload.ClaimToken,
                }
              }
              return element
            })
          : [...state.claims, action.payload],
      }
    case ActionTypes.CLAIMED:
      return {
        claims: eventExists(state.claims, action.payload)
          ? state.claims.map(element => {
              if (element.saleId === action.payload.saleId) {
                return {
                  ...element,
                  claimToken: action.payload.ClaimToken,
                }
              }
              return element
            })
          : [...state.claims, action.payload],
      }
    default:
      return state
  }
}
