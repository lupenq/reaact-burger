import { createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../../utils/constants'

export const ingridientsSlice = createSlice({
  name: 'ingridients',
  initialState: {
    items: [],
    requestError: false,
    requestSuccess: false,
    ingridientsRequest: false
  },
  reducers: {
    ingridientsRequest: state => ({ ...state, ingridientsRequest: true }),
    ingridientsSuccess: (state, action) => ({
      ...state,
      items: action.payload,
      ingridientsRequest: false,
      requestSuccess: true,
      requestError: false
    }),
    ingridientsError: state => ({ ...state, ingridientsRequest: false, requestError: true })
  }
})

export const { ingridientsRequest, ingridientsSuccess, ingridientsError } = ingridientsSlice.actions

export const getIngridients = () => (dispatch) => {
  dispatch(ingridientsRequest())
  fetch(API_URL)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(({ data }) => {
      dispatch(ingridientsSuccess(data))
    })
    .catch(() => {
      dispatch(ingridientsError())
    })
}

export default ingridientsSlice.reducer
