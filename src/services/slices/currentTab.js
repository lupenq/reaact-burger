import { createSlice } from '@reduxjs/toolkit'

export const currentTabSlice = createSlice({
  name: 'currentTab',
  initialState: 'buns',
  reducers: {
    setCurrentTab: (_, action) => action.payload
  }
})

export const { setCurrentTab } = currentTabSlice.actions

export default currentTabSlice.reducer
