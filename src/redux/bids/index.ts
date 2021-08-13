// Externals
import { Action } from 'redux'
import dayjs from 'dayjs'

// interface
import { GetAllBidsBySaleId_fixedPriceSale_commitments } from 'src/subgraph/__generated__/GetAllBidsBySaleId'

// ACTION
export enum ActionTypes {
  INITIAL_BID_REQUEST = 'INITIAL_BID_REQUEST',
  INITIAL_BID_SUCCESS = 'INITIAL_BID_SUCCESS',
  INITIAL_BID_FAILURE = 'INITIAL_BID_FAILURE',
  UPDATE_BID_REQUEST = 'UPDATE_BID_REQUEST',
  UPDATE_BID_SUCCESS = 'UPDATE_BID_SUCCESS',
  UPDATE_BID_FAILURE = 'UPDATE_BID_FAILURE',
}

// indexable type
export interface BidsBySaleId {
  // "ox223123nlda": {"lastupdated", "bids: []"}
  [saleId: string]: {
    updatedAt: number // UTC timestamp
    bids: GetAllBidsBySaleId_fixedPriceSale_commitments[] // bids
  }
}

export interface InitialBidRequestAction extends Action<ActionTypes.INITIAL_BID_REQUEST> {
  payload: boolean
}

export interface InitialBidSuccessAction extends Action<ActionTypes.INITIAL_BID_SUCCESS> {
  payload: BidsBySaleId
}

export interface InitialBidFailureAction extends Action<ActionTypes.INITIAL_BID_FAILURE> {
  payload: Error
}

export interface UpdateBidRequestAction extends Action<ActionTypes.UPDATE_BID_REQUEST> {
  payload: boolean
}

export interface UpdateBidSuccessAction extends Action<ActionTypes.UPDATE_BID_SUCCESS> {
  payload: GetAllBidsBySaleId_fixedPriceSale_commitments
}

export interface UpdateBidFailureAction extends Action<ActionTypes.UPDATE_BID_FAILURE> {
  payload: Error
}

export type BidActionTypes =
  | InitialBidRequestAction
  | InitialBidSuccessAction
  | InitialBidFailureAction
  | UpdateBidRequestAction
  | UpdateBidSuccessAction
  | UpdateBidFailureAction

// initial fetch data from subgraph
export const initialBidRequest = (payload: boolean) => ({
  payload,
  type: ActionTypes.INITIAL_BID_REQUEST,
})

export const initialBidSuccess = (payload: BidsBySaleId) => ({
  payload,
  type: ActionTypes.INITIAL_BID_SUCCESS,
})

export const initialBidFailure = (payload: Error) => ({
  payload,
  type: ActionTypes.INITIAL_BID_FAILURE,
})

// fetch data from chain
export const updateBidRequest = (payload: boolean) => ({
  payload,
  type: ActionTypes.UPDATE_BID_REQUEST,
})

export const updateBidSuccess = (payload: GetAllBidsBySaleId_fixedPriceSale_commitments) => ({
  payload,
  type: ActionTypes.UPDATE_BID_SUCCESS,
})

export const updateBidFailure = (payload: Error) => ({
  payload,
  type: ActionTypes.UPDATE_BID_FAILURE,
})

// State
export interface BidsState {
  isLoading: boolean
  error: Error | null
  bidsBySaleId: BidsBySaleId
}

export const defaultState: BidsState = {
  isLoading: true,
  error: null,
  bidsBySaleId: {},
}

const keyFinder = (object: BidsBySaleId) => {
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
export function reducer(state: BidsState = defaultState, action: BidActionTypes): BidsState {
  switch (action.type) {
    case ActionTypes.INITIAL_BID_REQUEST:
      return {
        ...state,
        isLoading: action.payload,
      }
    case ActionTypes.INITIAL_BID_SUCCESS: {
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

    case ActionTypes.INITIAL_BID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case ActionTypes.UPDATE_BID_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.UPDATE_BID_SUCCESS: {
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

    case ActionTypes.UPDATE_BID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
