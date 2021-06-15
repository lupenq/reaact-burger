import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    ingridients: [],
    status: '',
    createdAt: '',
    id: 1
  },
  reducers: {
    createOrder: (state, action) => ({
      ingridients: action.payload,
      status: 'cooking',
      createdAt: Date.now(),
      id: state.id + 1
    })
  }
})

export const { createOrder } = orderSlice.actions

export default orderSlice.reducer
