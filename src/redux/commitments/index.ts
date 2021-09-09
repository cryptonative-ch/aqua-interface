// Externals
import { Action } from 'redux'
import dayjs from 'dayjs'

// interface
import { GetAllBidsBySaleId_fixedPriceSale_commitments } from 'src/subgraph/__generated__/GetAllBidsBySaleId'

// ACTION
export enum ActionTypes {
  INITIAL_COMMITMENT_REQUEST = 'INITIAL_COMMITMENT_REQUEST',
  INITIAL_COMMITMENT_SUCCESS = 'INITIAL_COMMITMENT_SUCCESS',
  INITIAL_COMMITMENT_FAILURE = 'INITIAL_COMMITMENT_FAILURE',
  UPDATE_COMMITMENT_REQUEST = 'UPDATE_COMMITMENT_REQUEST',
  UPDATE_COMMITMENT_SUCCESS = 'UPDATE_COMMITMENT_SUCCESS',
  UPDATE_COMMITMENT_FAILURE = 'UPDATE_COMMITMENT_FAILURE',
}

// indexable type
export interface CommitmentsBySaleId {
  // "ox223123nlda": {"lastupdated", "bids: []"}
  [saleId: string]: {
    updatedAt: number // UTC timestamp
    bids: GetAllBidsBySaleId_fixedPriceSale_commitments[] // bids
  }
}

export interface InitialCommitmentRequestAction extends Action<ActionTypes.INITIAL_COMMITMENT_REQUEST> {
  payload: boolean
}

export interface InitialCommitmentSuccessAction extends Action<ActionTypes.INITIAL_COMMITMENT_SUCCESS> {
  payload: CommitmentsBySaleId
}

export interface InitialCommitmentFailureAction extends Action<ActionTypes.INITIAL_COMMITMENT_FAILURE> {
  payload: Error
}

export interface UpdateCommitmentRequestAction extends Action<ActionTypes.UPDATE_COMMITMENT_REQUEST> {
  payload: boolean
}

export interface UpdateCommitmentSuccessAction extends Action<ActionTypes.UPDATE_COMMITMENT_SUCCESS> {
  payload: GetAllBidsBySaleId_fixedPriceSale_commitments
}

export interface UpdateCommitmentFailureAction extends Action<ActionTypes.UPDATE_COMMITMENT_FAILURE> {
  payload: Error
}

export type CommitmentActionTypes =
  | InitialCommitmentRequestAction
  | InitialCommitmentSuccessAction
  | InitialCommitmentFailureAction
  | UpdateCommitmentRequestAction
  | UpdateCommitmentSuccessAction
  | UpdateCommitmentFailureAction

// initial fetch data from subgraph
export const initialCommitmentRequest = (payload: boolean) => ({
  payload,
  type: ActionTypes.INITIAL_COMMITMENT_REQUEST,
})

export const initialCommitmentSuccess = (payload: CommitmentsBySaleId) => ({
  payload,
  type: ActionTypes.INITIAL_COMMITMENT_SUCCESS,
})

export const initialCommitmentFailure = (payload: Error) => ({
  payload,
  type: ActionTypes.INITIAL_COMMITMENT_FAILURE,
})

// fetch data from chain
export const updateCommitmentRequest = (payload: boolean) => ({
  payload,
  type: ActionTypes.UPDATE_COMMITMENT_REQUEST,
})

export const updateCommitmentSuccess = (payload: GetAllBidsBySaleId_fixedPriceSale_commitments) => ({
  payload,
  type: ActionTypes.UPDATE_COMMITMENT_SUCCESS,
})

export const updateCommitmentFailure = (payload: Error) => ({
  payload,
  type: ActionTypes.UPDATE_COMMITMENT_FAILURE,
})

// State
export interface CommitmentsState {
  isLoading: boolean
  error: Error | null
  bidsBySaleId: CommitmentsBySaleId
}

export const defaultState: CommitmentsState = {
  isLoading: true,
  error: null,
  bidsBySaleId: {},
}

const keyFinder = (object: CommitmentsBySaleId) => {
  return String(Object.getOwnPropertyNames(object)[0])
}

const eventExists = (
  events: GetAllBidsBySaleId_fixedPriceSale_commitments[],
  event: GetAllBidsBySaleId_fixedPriceSale_commitments[]
) => {
  return events.some(e => e.id === event[0].id)
}

/**
 * Reducer
 * @param state
 * @param action @returns
 */
export function reducer(state: CommitmentsState = defaultState, action: CommitmentActionTypes): CommitmentsState {
  switch (action.type) {
    case ActionTypes.INITIAL_COMMITMENT_REQUEST:
      return {
        ...state,
        isLoading: action.payload,
      }
    case ActionTypes.INITIAL_COMMITMENT_SUCCESS: {
      // Extract the saleid

      // get bidsBySaleId from previous state
      const { bidsBySaleId } = state
      const id = keyFinder(action.payload)

      // create a cache timestamp
      const updatedAt = dayjs.utc().unix()
      return {
        ...state,
        isLoading: false,
        bidsBySaleId:
          id === 'undefined'
            ? action.payload
            : {
                ...bidsBySaleId,
                [id]: bidsBySaleId[id]
                  ? eventExists(bidsBySaleId[id].bids, action.payload[id].bids)
                    ? {
                        updatedAt: bidsBySaleId[id].updatedAt,
                        bids: bidsBySaleId[id].bids,
                      }
                    : {
                        updatedAt: updatedAt,
                        bids: [...bidsBySaleId[id].bids, ...action.payload[id].bids],
                      }
                  : {
                      updatedAt: updatedAt,
                      bids: action.payload[id].bids,
                    },
              },
      }
    }

    case ActionTypes.INITIAL_COMMITMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case ActionTypes.UPDATE_COMMITMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.UPDATE_COMMITMENT_SUCCESS: {
      // create a cache timestamp
      const updatedAt = dayjs.utc().unix()
      // get bidsBySaleId from previous state
      const { bidsBySaleId } = state
      // get saleId from payload
      const {
        sale: { id },
      } = action.payload
      return {
        ...state,
        isLoading: false,
        bidsBySaleId: {
          ...bidsBySaleId,
          [id]: bidsBySaleId[id]
            ? eventExists(bidsBySaleId[id]?.bids, [action.payload])
              ? {
                  updatedAt: bidsBySaleId[id].updatedAt,
                  bids: bidsBySaleId[id].bids,
                }
              : {
                  updatedAt: updatedAt,
                  bids: [...bidsBySaleId[id].bids, action.payload],
                }
            : {
                updatedAt: updatedAt,
                bids: [action.payload],
              },
        },
      }
    }

    case ActionTypes.UPDATE_COMMITMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
