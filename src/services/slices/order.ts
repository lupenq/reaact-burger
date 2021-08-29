import { createSlice } from '@reduxjs/toolkit'
import { clearConstructor, IConstructorSliceState } from './burgerConstructor'
import { getCookie } from '../utils'
import { IOrder } from '../../interfaces'
import { AppDispatch, AppThunk, RootState } from '../store'
import { BASE_API_URL } from '../../utils/constants'

interface orderSliceState {
  orderRequest: boolean,
  requestError: boolean,
  requestSuccess: boolean,
  name: string,
  order: IOrder | null
}

const initialState: orderSliceState = {
  orderRequest: false,
  requestError: false,
  requestSuccess: false,
  name: '',
  order: null
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderRequest: state => ({ ...state, orderRequest: true }),
    orderError: state => ({ ...state, orderRequest: false, requestError: true }),
    orderSuccess: (state, action) => ({
      name: action.payload.name,
      order: action.payload.order,
      requestSuccess: action.payload.success,
      orderRequest: false,
      requestError: false
    })
  }
})

export const { orderSuccess, orderError, orderRequest } = orderSlice.actions

const getIngridientsId = (burgerConstructor: IConstructorSliceState) => {
  const { bun, ingridients } = burgerConstructor
  if (!bun) return
  return [bun._id, bun._id, ...ingridients.map(item => item._id)]
}

export const postOrder = (): AppThunk => (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(orderRequest())
  fetch(`${BASE_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify({ ingredients: getIngridientsId(getState().burgerConstructor) })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then((data) => {
      dispatch(orderSuccess(data))
      dispatch(clearConstructor())
    })
    .catch(() => {
      dispatch(orderError())
    })
}

export default orderSlice.reducer
