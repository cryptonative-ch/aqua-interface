// Externals
import { Action } from 'redux'

// interface
import { AuctionBid } from 'src/interfaces/Auction'

// ACTION
enum ActionTypes {
  GENERATE_BID = 'GENERATE_BID',
  REMOVE_BID = 'REMOVE_BID',
  INITIAL_BID_SEED = 'INITIAL_BID_SEED',
}

interface BidState {
  bids: AuctionBid[]
}

interface generateBidAction extends Action<ActionTypes.GENERATE_BID> {
  payload: AuctionBid
}

interface removeBidAction extends Action<ActionTypes.REMOVE_BID> {
  payload: AuctionBid
}

interface InitialBidSeedAction extends Action<ActionTypes.INITIAL_BID_SEED> {
  payload: AuctionBid[]
}

type BidActionTypes = generateBidAction | removeBidAction | InitialBidSeedAction

export const generateBid = (payload: AuctionBid) => ({
  payload,
  type: ActionTypes.GENERATE_BID,
})

export const removeBid = (payload: AuctionBid) => ({
  payload,
  type: ActionTypes.REMOVE_BID,
})

export const startBid = (payload: AuctionBid[]) => ({
  payload,
  type: ActionTypes.INITIAL_BID_SEED,
})

const defaultState: BidState = {
  bids: [],
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
    case ActionTypes.INITIAL_BID_SEED:
      return {
        ...state,
        bids: action.payload,
      }
    default:
      return state
  }
}
