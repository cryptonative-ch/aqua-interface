// Externals
import { Action } from 'redux'
import { AppThunk } from './store'

// interface
import { AuctionBid } from 'src/interfaces/Auction'

// subgraph
import { FAKER, generateInitialAuctionData, selectAuctiontype } from 'src/subgraph'
import request from 'graphql-request'
import { auctionBidsQuery } from 'src/subgraph/AuctionBids'

// interface
import { auctionType } from 'src/interfaces/Auction'

//check if removebid is still needed

// ACTION
enum ActionTypes {
  REMOVE_BID = 'REMOVE_BID',
  INITIAL_BID_REQUEST = 'INITIAL_BID_REQUEST',
  INITIAL_BID_SUCCESS = 'INITIAL_BID_SUCCESS',
  INITIAL_BID_FAILURE = 'INITIAL_BID_FAILURE',
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

type BidActionTypes = removeBidAction | InitialBidRequestAction | InitialBidSuccessAction | InitialBidFailureAction

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
export const fetchAuctionBids = (id: string, auctionType: auctionType): AppThunk => {
  return async dispatch => {
    dispatch(initialBidRequest(true))
    try {
      const auctionBidsRequest = request(FAKER, auctionBidsQuery(id, auctionType))
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
