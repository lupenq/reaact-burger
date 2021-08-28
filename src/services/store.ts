import { configureStore, combineReducers } from '@reduxjs/toolkit'
import ingredientReducer from './slices/ingridients'
import ingridientModalReducer from './slices/ingridientModal'
import constructorSlice from './slices/burgerConstructor'
import orderSlice from './slices/order'
import currentTabSlice from './slices/currentTab'
import userSlice from './slices/user'
import feedSlice from './slices/feed'
import currentOrderSlice from './slices/currentOrder'
import wsMiddleware from './middlewares/socketMw'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const middlewares = [wsMiddleware()]

const rootReducer = combineReducers({
  ingridients: ingredientReducer,
  ingridientModal: ingridientModalReducer,
  burgerConstructor: constructorSlice,
  order: orderSlice,
  currentTab: currentTabSlice,
  user: userSlice,
  feed: feedSlice,
  currentOrder: currentOrderSlice
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares),
  devTools: true
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
