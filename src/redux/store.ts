import { combineReducers, createStore, applyMiddleware, Action } from 'redux'
import Thunk, { ThunkAction } from 'redux-thunk'

// Reducers
import page from './page'
import { BidReducer } from './BidData'

// Extend the RootState for useSelector
declare module 'react-redux' {
  // eslint-disable-next-line
  interface DefaultRootState extends RootState {}
}

const rootReducer = combineReducers({
  page,
  BidReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const store = createStore(rootReducer, applyMiddleware(Thunk))
