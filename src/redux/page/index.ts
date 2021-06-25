import { Action, Dispatch } from 'redux'
import { APP_NAME } from 'src/constants'

export enum ActionTypes {
  PAGE_SET_TITLE = 'page/title/set',
  PAGE_SET_PATH = 'page/path/set',
  PAGE_SET_SELECTED_SALE_STATUS = 'PAGE_SET_SELECTED_SALE_STATUS',
}

export enum SaleStatus {
  LIVE = 'Live',
  UPCOMING = 'upcoming',
  CLOSED = 'closed',
}

interface PageActionSetTitle extends Action<ActionTypes.PAGE_SET_TITLE> {
  payload: string
}

interface PageActionSetPath extends Action<ActionTypes.PAGE_SET_PATH> {
  payload: string
}
interface PageActionSetSelectedSaleStatus extends Action<ActionTypes.PAGE_SET_SELECTED_SALE_STATUS> {
  payload: SaleStatus
}

type PageAction = PageActionSetTitle | PageActionSetPath | PageActionSetSelectedSaleStatus

type PageState = {
  title: string
  path: string
  selectedSaleStatus: SaleStatus
}

export const setPagePath = (path: string): PageActionSetPath => ({
  type: ActionTypes.PAGE_SET_PATH,
  payload: path,
})

export const setPageTitle = (title: string) => (dispatch: Dispatch) => {
  const payload = `${title} | ${APP_NAME}`
  document.title = payload
  dispatch({
    type: ActionTypes.PAGE_SET_TITLE,
    payload,
  })
}

export const setSelectedSaleStatus = (payload: SaleStatus): PageActionSetSelectedSaleStatus => ({
  type: ActionTypes.PAGE_SET_SELECTED_SALE_STATUS,
  payload,
})

const initialState: PageState = {
  title: 'Home',
  path: '/',
  selectedSaleStatus: SaleStatus.LIVE,
}

export function reducer(state: PageState = initialState, action: PageAction) {
  switch (action.type) {
    case ActionTypes.PAGE_SET_TITLE:
      return { ...state, title: action.payload }
    case ActionTypes.PAGE_SET_PATH:
      return { ...state, path: action.payload }
    case ActionTypes.PAGE_SET_SELECTED_SALE_STATUS:
      return { ...state, selectedSaleStatus: action.payload }
    default:
      return state
  }
}
