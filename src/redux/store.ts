import { combineReducers, createStore, applyMiddleware, Action } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import Thunk, { ThunkAction } from 'redux-thunk'

// Reducers
import { reducer as sales } from 'src/redux/sales'
import { reducer as bids } from 'src/redux/bids'
import { reducer as page } from 'src/redux/page'
import { reducer as network } from 'src/redux/network'
import { reducer as claims } from 'src/redux/claims'

// Extend the RootState for useSelector
declare module 'react-redux' {
  // eslint-disable-next-line
  interface DefaultRootState extends RootState {}
}

const rootReducer = combineReducers({
  page,
  bids,
  sales,
  network,
  claims,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const store =
  process.env.NODE_ENV === 'development'
    ? createStore(rootReducer, composeWithDevTools(applyMiddleware(Thunk)))
    : createStore(rootReducer, applyMiddleware(Thunk))
