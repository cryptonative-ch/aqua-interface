import { Action, Dispatch } from 'redux'
import { APP_NAME } from 'src/constants'

export enum ActionTypes {
  PAGE_SET_TITLE = 'page/title/set',
  PAGE_SET_PATH = 'page/path/set',
}

interface PageActionSetTitle extends Action<ActionTypes.PAGE_SET_TITLE> {
  payload: string
}

interface PageActionSetPath extends Action<ActionTypes.PAGE_SET_PATH> {
  payload: string
}

type PageAction = PageActionSetTitle | PageActionSetPath

type PageState = {
  title: string
  path: string
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

const inititalState: PageState = {
  title: 'Home',
  path: '/',
}

export default function reducer(state: PageState = inititalState, action: PageAction) {
  switch (action.type) {
    case ActionTypes.PAGE_SET_TITLE:
      return { ...state, title: action.payload }
    case ActionTypes.PAGE_SET_PATH:
      return { ...state, path: action.payload }
    default:
      return state
  }
}
