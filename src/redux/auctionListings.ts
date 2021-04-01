// Externals
import { Action } from 'redux'

// interfaces
import { Auction } from 'src/interfaces/Auction'

// ACTION
enum ActionTypes {
  GENERATE_AUCTIONS = 'GENERATE_AUCTION_PAGE',
  UPDATE_AUCTIONS = 'UPDATE_AUCTION_PAGE',
}

interface GenerateAuctionAction extends Action<ActionTypes.GENERATE_AUCTIONS> {
  payload: Auction[]
}

interface UpdateAuctionsAction extends Action<ActionTypes.UPDATE_AUCTIONS> {
  payload: Auction[]
}

type AuctionActionTypes = GenerateAuctionAction | UpdateAuctionsAction

export const generateAuctions = (payload: Auction[]) => ({
  payload,
  type: ActionTypes.GENERATE_AUCTIONS,
})

export const updateAuctions = (payload: Auction[]) => ({
  payload,
  type: ActionTypes.UPDATE_AUCTIONS,
})

// STATE

interface AuctionState {
  auctions: Auction[]
}

const defaultState: AuctionState = {
  auctions: [],
}

//REDUCER

export function AuctionReducer(state: AuctionState = defaultState, action: AuctionActionTypes): AuctionState {
  switch (action.type) {
    case ActionTypes.GENERATE_AUCTIONS:
      return {
        auctions: action.payload,
      }
    case ActionTypes.UPDATE_AUCTIONS:
      return {
        auctions: [...state.auctions, ...action.payload],
      }
    default:
      return state
  }
}
