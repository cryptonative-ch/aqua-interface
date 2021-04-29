/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import { Action } from 'redux'
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
}

// indexable type
export interface BidsBySaleId {
  // "ox223123nlda": {"lastupdated", "bids: []"}
  [saleId: string]: {
    lastUpdated: number // UTC timestamp
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

export type BidActionTypes = InitialBidRequestAction | InitialBidSuccessAction | InitialBidFailureAction

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

export const fetchSaleBids = (id: string, saleType: saleType, saleBidsRequest: Promise<any>): AppThunk => {
  return async dispatch => {
    dispatch(initialBidRequest(true))
    try {
      dispatch(initialBidSuccess(await generateInitialSaleData(saleBidsRequest, saleType)))
    } catch (error) {
      console.log(error)
      dispatch(initialBidFailure(error))
    }
  }
}

//REDUCER

// page loads before the data fetches the api
// this occurs at every single sale switch
// clear out store before switching sales OR
// use Redux loading to wait before props are changed OR
// use Suspense to pause rendering of components
// fetch and refetch data based upon time updated

export function BidReducer(state: BidState = defaultState, action: BidActionTypes): BidState {
  switch (action.type) {
    case ActionTypes.INITIAL_BID_REQUEST:
      return {
        ...state,
        isLoading: action.payload,
      }
    case ActionTypes.INITIAL_BID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bidsBySaleId: { ...state.bidsBySaleId, ...action.payload },
      }
    case ActionTypes.INITIAL_BID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
