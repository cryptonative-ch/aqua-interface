/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import { Action } from 'redux'
import dayjs from 'dayjs'

// redux

import { AppThunk } from '../store'

// interface
import { SaleBid } from 'src/interfaces/Sale'

// subgraph
import { generateInitialSaleData } from 'src/subgraph'

// interface
import { saleType } from 'src/interfaces/Sale'

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
    bids: SaleBid[] // bids
  }
}

interface InitialBidRequestAction extends Action<ActionTypes.INITIAL_BID_REQUEST> {
  payload: boolean
}

interface InitialBidSuccessAction extends Action<ActionTypes.INITIAL_BID_SUCCESS> {
  payload: BidsBySaleId
}

interface InitialBidFailureAction extends Action<ActionTypes.INITIAL_BID_FAILURE> {
  payload: Error
}

interface UpdateBidRequest extends Action<ActionTypes.UPDATE_BID_REQUEST> {
  payload: boolean
}

interface UpdateBidSuccess extends Action<ActionTypes.UPDATE_BID_SUCCESS> {
  payload: SaleBid
}

interface UpdateBidFailure extends Action<ActionTypes.UPDATE_BID_FAILURE> {
  payload: Error
}

export type BidActionTypes =
  | InitialBidRequestAction
  | InitialBidSuccessAction
  | InitialBidFailureAction
  | UpdateBidRequest
  | UpdateBidSuccess
  | UpdateBidFailure

export const initialBidRequest = (payload: boolean) => ({
  payload,
  type: ActionTypes.INITIAL_BID_REQUEST,
})

// initial fetch data from api
export const initialBidSuccess = (payload: BidsBySaleId) => ({
  payload,
  type: ActionTypes.INITIAL_BID_SUCCESS,
})

export const initialBidFailure = (payload: Error) => ({
  payload,
  type: ActionTypes.INITIAL_BID_FAILURE,
})

export const updateBidRequest = (payload: boolean) => ({
  payload,
  type: ActionTypes.UPDATE_BID_REQUEST,
})

export const updateBidSuccess = (payload: SaleBid) => ({
  payload,
  type: ActionTypes.UPDATE_BID_SUCCESS,
})

export const updateBidFailure = (payload: Error) => ({
  payload,
  type: ActionTypes.UPDATE_BID_FAILURE,
})

// State
interface BidState {
  isLoading: boolean
  error: Error | null
  bidsBySaleId: BidsBySaleId
}

const defaultState: BidState = {
  isLoading: true,
  error: null,
  bidsBySaleId: {},
}

// fetch Data

export const fetchSaleBids = (saleId: string, saleType: saleType, saleBidsRequest: Promise<any>): AppThunk => {
  return async (dispatch, getState) => {
    // Current time
    const timeNow = dayjs.utc().unix()
    // only request new bids if the delta between Date.now and saleId.updatedAt is more than 30 seconds
    const { updatedAt } = getState().bidReducer.bidsBySaleId[saleId] || timeNow
    const delta = Math.abs(updatedAt - timeNow)
    // exit
    // should only be called once
    if (delta <= 3000000) {
      return
    }
    // fetch new (fresh) data

    dispatch(initialBidRequest(true))
    try {
      dispatch(initialBidSuccess(await generateInitialSaleData(saleBidsRequest, saleType)))
    } catch (error) {
      console.log(error)
      dispatch(initialBidFailure(error))
    }
  }
}

export const fetchBidsFromChain = (bids: SaleBid): any => {
  return async (dispatch: any) => {
    dispatch(updateBidRequest(true))
    try {
      dispatch(updateBidSuccess(bids))
    } catch (error) {
      console.log(error)
      dispatch(updateBidFailure(error))
    }
  }
}

const keyFinder = (object: BidsBySaleId) => {
  return String(Object.getOwnPropertyNames(object)[0])
}

//REDUCER

export function bidReducer(state: BidState = defaultState, action: BidActionTypes): BidState {
  switch (action.type) {
    case ActionTypes.INITIAL_BID_REQUEST:
      return {
        ...state,
        isLoading: action.payload,
      }
    case ActionTypes.INITIAL_BID_SUCCESS: {
      // Extract the saleid

      const id = keyFinder(action.payload)

      // create a cache timestamp
      const updatedAt = dayjs.utc().unix()

      return {
        ...state,
        isLoading: false,
        bidsBySaleId: {
          ...state.bidsBySaleId,
          [id]: state.bidsBySaleId[id]
            ? {
                updatedAt: updatedAt,
                bids: [...state.bidsBySaleId[id].bids, ...action.payload[id].bids],
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
        baseSale: { id },
      } = action.payload
      return {
        ...state,
        bidsBySaleId: {
          ...bidsBySaleId,
          [id]: {
            updatedAt: updatedAt,
            bids: [...bidsBySaleId[id].bids, action.payload],
          },
        },
      }
    }

    case ActionTypes.UPDATE_BID_FAILURE:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}
