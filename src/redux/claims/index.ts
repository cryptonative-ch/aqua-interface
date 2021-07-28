// Interface
import { Action } from 'redux'

// interface
import { ClaimState } from 'src/hooks/useTokenClaim'

export enum ActionTypes {
  SET_CLAIM_STATUS = 'SET_CLAIM_STATUS',
}

export interface ClaimStatePerSale {
  saleId: string
  ClaimToken: ClaimState
}

interface ClaimAction extends Action<ActionTypes.SET_CLAIM_STATUS> {
  payload: ClaimStatePerSale
}

export type ClaimActionTypes = ClaimAction

export interface ClaimTokensState {
  claims: ClaimStatePerSale[]
}

export const setClaimStatus = (payload: ClaimStatePerSale): ClaimAction => ({
  type: ActionTypes.SET_CLAIM_STATUS,
  payload,
})

export const defaultState: ClaimTokensState = { claims: [] }

const eventExists = (events: ClaimStatePerSale[], event: ClaimStatePerSale) => {
  return events.some(e => e.saleId === event.saleId)
}

export function reducer(state: ClaimTokensState = defaultState, action: ClaimActionTypes): ClaimTokensState {
  switch (action.type) {
    case ActionTypes.SET_CLAIM_STATUS:
      return {
        claims: eventExists(state.claims, action.payload)
          ? state.claims.map((element: ClaimStatePerSale) => {
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
