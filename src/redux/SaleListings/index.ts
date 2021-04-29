/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import { Action } from 'redux'
import { AppThunk } from '../store'

// interfaces
import { Sale } from 'src/interfaces/Sale'

// subgraph
import { getSalesData } from 'src/subgraph'

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
  payload: Sale[]
}

interface GenerateFailureAction extends Action<ActionTypes.GENERATE_AUCTIONS_FAILURE> {
  payload: Error
}

export type SaleActionTypes = GenerateRequestAction | GenerateSucessAction | GenerateFailureAction

export const generateSalesRequest = (payload: boolean) => ({
  payload,
  type: ActionTypes.GENERATE_AUCTIONS_REQUEST,
})

export const generateSalesSuccess = (payload: Sale[]) => ({
  payload,
  type: ActionTypes.GENERATE_AUCTIONS_SUCCESS,
})

export const generateSalesFailure = (payload: Error) => ({
  payload,
  type: ActionTypes.GENERATE_AUCTIONS_FAILURE,
})

// fetch data
export const fetchSales = (salesRequest: Promise<any>): AppThunk => {
  return async dispatch => {
    dispatch(generateSalesRequest(true))
    try {
      dispatch(generateSalesSuccess(await getSalesData(salesRequest)))
    } catch (error) {
      console.log(error)
      dispatch(generateSalesFailure(error))
    }
  }
}

// STATE

interface SaleState {
  isLoading: boolean
  sales: Sale[]
  error: Error | null
}

const defaultState: SaleState = {
  isLoading: false,
  sales: [],
  error: null,
}

//REDUCER

export function SaleReducer(state: SaleState = defaultState, action: SaleActionTypes): SaleState {
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
        sales: action.payload,
      }
    case ActionTypes.GENERATE_AUCTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        sales: [],
      }
    default:
      return state
  }
}
