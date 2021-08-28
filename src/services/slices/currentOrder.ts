import { createSlice } from '@reduxjs/toolkit'
import { IFeedOrder } from '../../interfaces'

const initialState: IFeedOrder = {} as IFeedOrder

const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState,
  reducers: {
    setCurrentOrder: (_, action) => action.payload,
    removeCurrentOrder: () => ({} as IFeedOrder)
  }
})

export const { setCurrentOrder, removeCurrentOrder } = currentOrderSlice.actions

export default currentOrderSlice.reducer
