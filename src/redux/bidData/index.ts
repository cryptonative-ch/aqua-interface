// Externals
import { Action } from 'redux'
import { AppThunk } from '../store'

// interface
import { AuctionBid } from 'src/interfaces/Auction'

// subgraph
import { generateInitialAuctionData } from 'src/subgraph'

// interface
import { auctionType } from 'src/interfaces/Auction'

// ACTION
export enum ActionTypes {
  INITIAL_BID_REQUEST = 'INITIAL_BID_REQUEST',
  INITIAL_BID_SUCCESS = 'INITIAL_BID_SUCCESS',
  INITIAL_BID_FAILURE = 'INITIAL_BID_FAILURE',
}

interface InitialBidRequestAction extends Action<ActionTypes.INITIAL_BID_REQUEST> {
  payload: boolean
}

interface InitialBidSuccessAction extends Action<ActionTypes.INITIAL_BID_SUCCESS> {
  payload: AuctionBid[]
}

interface InitialBidFailureAction extends Action<ActionTypes.INITIAL_BID_FAILURE> {
  payload: Error
}

export type BidActionTypes = InitialBidRequestAction | InitialBidSuccessAction | InitialBidFailureAction

export const initialBidRequest = (payload: boolean) => ({
  payload,
  type: ActionTypes.INITIAL_BID_REQUEST,
})

export const initialBidSuccess = (payload: AuctionBid[]) => ({
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
  bids: AuctionBid[]
  error: Error | null
}

const defaultState: BidState = {
  isLoading: true,
  bids: [],
  error: null,
}

// fetch Data
// eslint-disable-next-line
export const fetchAuctionBids = (id: string, auctionType: auctionType, auctionBidsRequest: Promise<any>): AppThunk => {
  return async dispatch => {
    dispatch(initialBidRequest(true))
    try {
      dispatch(initialBidSuccess(await generateInitialAuctionData(auctionBidsRequest, auctionType)))
    } catch (error) {
      console.log(error)
      dispatch(initialBidFailure(error))
    }
  }
}

//REDUCER

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
        bids: action.payload,
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
