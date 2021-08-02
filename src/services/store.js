import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import ingredientReducer from '../services/slices/ingridients'
import ingridientModalReducer from '../services/slices/ingridientModal'
import constructorSlice from './slices/burgerConstructor'
import orderSlice from '../services/slices/order'
import currentTabSlice from '../services/slices/currentTab'
import userSlice from '../services/slices/user'

const store = configureStore({
  reducer: {
    ingridients: ingredientReducer,
    ingridientModal: ingridientModalReducer,
    burgerConstructor: constructorSlice,
    order: orderSlice,
    currentTab: currentTabSlice,
    user: userSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
  devTools: true,
  enhancers: []
})

export default store
