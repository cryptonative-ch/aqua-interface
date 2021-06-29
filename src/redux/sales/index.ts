/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import { Action } from 'redux'

// interfaces
import { Sale } from 'src/interfaces/Sale'
import { AppThunk } from 'src/redux/store'

// subgraph
import dayjs from 'dayjs'

// ACTION
export enum ActionTypes {
  SALES_FETCH_REQUEST = 'sales/fetch/request',
  SALES_FETCH_SUCCESS = 'sales/fetch/success',
  SALES_FETCH_COMPLETE = 'sales/fetch/complete',
  SALES_FETCH_ERROR = 'sales/fetch/error',
}

export interface SalesFetchRequestAction extends Action<ActionTypes.SALES_FETCH_REQUEST> {
  payload: boolean
}
export interface SalesFetchSucessAction extends Action<ActionTypes.SALES_FETCH_SUCCESS> {
  payload: Sale[]
}
export type SalesFetchCompleteAction = Action<ActionTypes.SALES_FETCH_COMPLETE>
export interface SalesFetchErrorAction extends Action<ActionTypes.SALES_FETCH_ERROR> {
  payload: Error
}

export type SaleActionTypes =
  | SalesFetchRequestAction
  | SalesFetchSucessAction
  | SalesFetchCompleteAction
  | SalesFetchErrorAction

export const fetchSalesRequest = () => ({
  type: ActionTypes.SALES_FETCH_REQUEST,
})

export const fetchSalesSuccess = (payload: Sale[]) => ({
  payload,
  type: ActionTypes.SALES_FETCH_SUCCESS,
})

export const fetchSalesError = (payload: Error) => ({
  payload,
  type: ActionTypes.SALES_FETCH_ERROR,
})

export const fetchSalesComplete = () => ({
  type: ActionTypes.SALES_FETCH_ERROR,
})

/**
 * Fetches all Sales from the Mesa's Subgraph
 * @returns
 */
export const fetchSales = (): AppThunk => {
  return async (dispatch, getState) => {
    const { sales } = getState()
    // Cache
    const timeNow = dayjs.utc().unix()
    // Request new bids if the delta between Date.now and updatedAt is more than 30 seconds
    const { updatedAt } = sales || timeNow
    const delta = Math.abs(updatedAt - timeNow)
    // should only be called once
    if (delta <= 3000000) {
      return
    }

    try {
      dispatch(fetchSalesSuccess([]))
    } catch (error) {
      console.error(error)
      dispatch(fetchSalesError(error))
    }
  }
}

// State
export interface SalesState {
  isLoading: boolean // indictor
  sales: Sale[] // List of sales
  updatedAt: number // UNIX timestamp for caching
  error: Error | null
}

const defaultState: SalesState = {
  isLoading: false,
  updatedAt: 0,
  sales: [],
  error: null,
}

/**
 * Reducer
 * @param state
 * @param action
 * @returns
 */
export function reducer(state: SalesState = defaultState, action: SaleActionTypes): SalesState {
  switch (action.type) {
    case ActionTypes.SALES_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.SALES_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sales: action.payload,
      }
    case ActionTypes.SALES_FETCH_ERROR:
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
