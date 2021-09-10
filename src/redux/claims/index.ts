// External
import { BigNumberish } from 'ethers'

// redux
import { Action } from 'redux'

// interface
import { ClaimState } from 'src/hooks/useTokenClaim'
import { GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale } from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'
import { TransactionResult } from 'src/hooks/useCPK'

export enum ActionTypes {
  SET_CLAIM_STATUS = 'SET_CLAIM_STATUS',
}

export interface ClaimStatePerSale {
  sale: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments_sale
  claimToken: ClaimState
  transaction: TransactionResult | null
  error: Error | null
  amount: BigNumberish | null
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
  return events.some(e => e.sale.id === event.sale.id)
}

export function reducer(state: ClaimTokensState = defaultState, action: ClaimActionTypes): ClaimTokensState {
  switch (action.type) {
    case ActionTypes.SET_CLAIM_STATUS:
      return {
        claims: eventExists(state.claims, action.payload)
          ? state.claims.map((element: ClaimStatePerSale) => {
              if (element.sale.id === action.payload.sale.id) {
                if (
                  (element.claimToken === ClaimState.CLAIMED && action.payload.claimToken === ClaimState.UNCLAIMED) ||
                  (element.claimToken === ClaimState.FAILED && action.payload.claimToken === ClaimState.UNCLAIMED)
                ) {
                  return element
                }
                return {
                  ...element,
                  claimToken: action.payload.claimToken,
                  transaction: action.payload.transaction,
                  error: action.payload.error,
                  amount: action.payload.amount,
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
