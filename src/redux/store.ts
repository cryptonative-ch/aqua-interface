import { combineReducers, createStore, applyMiddleware, Action } from 'redux'
import Thunk, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import page from './page'
import { BidReducer } from './bidData'
import { AuctionReducer } from './auctionListings'

// interface
import { Auction } from 'src/interfaces/Auction'

// Extend the RootState for useSelector
declare module 'react-redux' {
  // eslint-disable-next-line
  interface DefaultRootState extends RootState {}
}

const rootReducer = combineReducers({
  page,
  BidReducer,
  AuctionReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(Thunk)))
