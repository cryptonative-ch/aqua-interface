/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import { Action } from 'redux'
import { AppThunk } from '../store'

// interfaces
import { Auction } from 'src/interfaces/Auction'

// subgraph
import { getAuctionsData } from 'src/subgraph'

// ACTION
export enum ActionTypes {
  GENERATE_AUCTIONS_REQUEST = 'GENERATE_AUCTIONS_REQUEST',
  GENERATE_AUCTIONS_SUCCESS = 'GENERATE_AUCTIONS_SUCCESS',
  GENERATE_AUCTIONS_FAILURE = 'GENERATE_AUCTIONS_FAILURE',
}

interface GenerateRequestAction extends Action<ActionTypes.GENERATE_AUCTIONS_REQUEST> {
  payload: boolean
}

interface GenerateSucessAction extends Action<ActionTypes.GENERATE_AUCTIONS_SUCCESS> {
  payload: Auction[]
}

interface GenerateFailureAction extends Action<ActionTypes.GENERATE_AUCTIONS_FAILURE> {
  payload: Error
}

export type AuctionActionTypes = GenerateRequestAction | GenerateSucessAction | GenerateFailureAction

export const generateAuctionsRequest = (payload: boolean) => ({
  payload,
  type: ActionTypes.GENERATE_AUCTIONS_REQUEST,
})

export const generateAuctionsSuccess = (payload: Auction[]) => ({
  payload,
  type: ActionTypes.GENERATE_AUCTIONS_SUCCESS,
})

export const generateAuctionsFailure = (payload: Error) => ({
  payload,
  type: ActionTypes.GENERATE_AUCTIONS_FAILURE,
})

// fetch data
// eslint-disable-next-line
export const fetchAuctions = (auctionsRequest: Promise<any>): AppThunk => {
  return async dispatch => {
    dispatch(generateAuctionsRequest(true))
    try {
      dispatch(generateAuctionsSuccess(await getAuctionsData(auctionsRequest)))
    } catch (error) {
      console.log(error)
      dispatch(generateAuctionsFailure(error))
    }
  }
}

// STATE

interface AuctionState {
  isLoading: boolean
  auctions: Auction[]
  error: Error | null
}

const defaultState: AuctionState = {
  isLoading: true,
  auctions: [],
  error: null,
}

//REDUCER

export function AuctionReducer(state: AuctionState = defaultState, action: AuctionActionTypes): AuctionState {
  switch (action.type) {
    case ActionTypes.GENERATE_AUCTIONS_REQUEST:
      return {
        ...state,
        isLoading: action.payload,
      }
    case ActionTypes.GENERATE_AUCTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        auctions: action.payload,
      }
    case ActionTypes.GENERATE_AUCTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        auctions: [],
      }
    default:
      return state
  }
}
