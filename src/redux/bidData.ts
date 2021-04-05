// Externals
import { Action } from 'redux'
import { AppThunk } from './store'

// interface
import { Auction, AuctionBid } from 'src/interfaces/Auction'

// subgraph
import { generateInitialAuctionData, selectAuctiontype } from 'src/subgraph'

// ACTION
enum ActionTypes {
  GENERATE_BID = 'GENERATE_BID',
  REMOVE_BID = 'REMOVE_BID',
  INITIAL_BID_REQUEST = 'INITIAL_BID_REQUEST',
  INITIAL_BID_SUCCESS = 'INITIAL_BID_SUCCESS',
  INITIAL_BID_FAILURE = 'INITIAL_BID_FAILURE',
}

interface generateBidAction extends Action<ActionTypes.GENERATE_BID> {
  payload: AuctionBid
}

interface removeBidAction extends Action<ActionTypes.REMOVE_BID> {
  payload: AuctionBid
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

type BidActionTypes =
  | generateBidAction
  | removeBidAction
  | InitialBidRequestAction
  | InitialBidSuccessAction
  | InitialBidFailureAction

export const generateBid = (payload: AuctionBid) => ({
  payload,
  type: ActionTypes.GENERATE_BID,
})

export const removeBid = (payload: AuctionBid) => ({
  payload,
  type: ActionTypes.REMOVE_BID,
})

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
  isLoading: false,
  bids: [],
  error: null,
}

// fetch Data
export const fetchAuctionBids = (id: string, auctions: Auction[]): AppThunk => {
  return async dispatch => {
    dispatch(initialBidRequest(true))
    try {
      dispatch(initialBidSuccess(await generateInitialAuctionData(id, selectAuctiontype(id, auctions))))
    } catch (error) {
      console.log(error)
      dispatch(initialBidFailure(error))
    }
  }
}

//REDUCER

export function BidReducer(state: BidState = defaultState, action: BidActionTypes): BidState {
  switch (action.type) {
    case ActionTypes.GENERATE_BID:
      return {
        ...state,
        bids: [...state.bids, action.payload],
      }
    case ActionTypes.REMOVE_BID:
      return {
        ...state,
        bids: state.bids.filter(
          bid =>
            bid.address !== action.payload.address &&
            bid.tokenInAmount !== action.payload.tokenInAmount &&
            bid.tokenOutAmount !== action.payload.tokenOutAmount
        ),
      }
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
        bids: [],
        error: action.payload,
      }

    default:
      return state
  }
}
