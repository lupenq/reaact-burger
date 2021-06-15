import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import ingredientReducer from '../services/slices/ingridients'
import ingridientModalReducer from '../services/slices/ingridientModal'
import constructorSlice from './slices/burgerConstructor'
import orderSlice from '../services/slices/order'

const store = configureStore({
  reducer: {
    ingridients: ingredientReducer,
    ingridientModal: ingridientModalReducer,
    burgerConstructor: constructorSlice,
    order: orderSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
  devTools: true,
  enhancers: []
})

export default store
