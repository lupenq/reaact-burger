import { createSlice } from '@reduxjs/toolkit'
import { clearConstructor } from './burgerConstructor'

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderRequest: false,
    requestError: false,
    requestSuccess: false,
    name: '',
    order: {}
  },
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

const getIngridientsId = ({ burgerConstructor }) => {
  const { bun, ingridients } = burgerConstructor
  if (!bun._id) return
  return [bun._id, bun._id, ...ingridients.map(item => item._id)]
}

export const postOrder = () => (dispatch, getState) => {
  dispatch(orderRequest())
  fetch('https://norma.nomoreparties.space/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: getIngridientsId(getState()) })
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
