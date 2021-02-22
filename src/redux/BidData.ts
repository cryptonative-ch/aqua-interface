// interface
import { AuctionBid } from 'src/interfaces/Auction'

// ACTION

const GENERATE_BID = 'GENERATE_BID'
const REMOVE_BID = 'REMOVE_BID'
const INITIAL_BID_SEED = 'INITIAL_BID_SEED'

export interface BidState {
  bids: AuctionBid[]
}

interface GenerateBidAction {
  type: typeof GENERATE_BID
  payload: AuctionBid
}

interface RemoveBidAction {
  type: typeof REMOVE_BID
  payload: AuctionBid
}

interface InitialBidSeedAction {
  type: typeof INITIAL_BID_SEED
  payload: AuctionBid[]
}

type BidActionTypes = GenerateBidAction | RemoveBidAction | InitialBidSeedAction

export const GenerateBid = (payload: AuctionBid) => ({
  payload,
  type: GENERATE_BID,
})

export const RemoveBid = (payload: AuctionBid) => ({
  payload,
  type: REMOVE_BID,
})

export const StartBid = (payload: AuctionBid[]) => ({
  payload,
  type: INITIAL_BID_SEED,
})

const defaultState: BidState = {
  bids: [],
}

//REDUCER

export function BidReducer(state: BidState = defaultState, action: BidActionTypes): BidState {
  switch (action.type) {
    case GENERATE_BID:
      return {
        ...state,
        bids: [...state.bids, action.payload],
      }
    case REMOVE_BID:
      return {
        ...state,
        bids: state.bids.filter(
          bid =>
            bid.address !== action.payload.address &&
            bid.sellAmount !== action.payload.sellAmount &&
            bid.buyAmount !== action.payload.buyAmount
        ),
      }
    case INITIAL_BID_SEED:
      return {
        ...state,
        bids: action.payload,
      }
    default:
      return state
  }
}
