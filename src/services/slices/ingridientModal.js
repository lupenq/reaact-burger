import { createSlice } from '@reduxjs/toolkit'

export const ingridientModalSlice = createSlice({
  name: 'ingridientModal',
  initialState: {},
  reducers: {
    ingridientModalAdd: (_, action) => ({ ...action.payload }),
    ingridientModalRemove: () => ({ })
  }
})

export const { ingridientModalAdd, ingridientModalRemove } = ingridientModalSlice.actions

export default ingridientModalSlice.reducer
