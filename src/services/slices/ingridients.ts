import { createSlice } from '@reduxjs/toolkit'
import { IIngredient } from '../../interfaces'
import { BASE_API_URL } from '../../utils/constants'
import { AppDispatch, AppThunk } from '../store'

interface IIngredientsSliceState {
  items: IIngredient[]
  requestError: boolean
  requestSuccess: boolean
  ingridientsRequest: boolean
}

const initialState: IIngredientsSliceState = {
  items: [] as IIngredient[],
  requestError: false,
  requestSuccess: false,
  ingridientsRequest: false
}

export const ingridientsSlice = createSlice({
  name: 'ingridients',
  initialState,
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

export const getIngridients = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(ingridientsRequest())
  fetch(`${BASE_API_URL}/ingredients`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(({ data }) => {
      dispatch(ingridientsSuccess(data))
    })
    .catch(() => {
      dispatch(ingridientsError())
    })
}

export default ingridientsSlice.reducer
