import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ingridients: [],
  bun: {},
  counts: {}
}

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngridient: (state, action) => ({
      ...state,
      ...(action.payload.type === 'bun'
        ? {
            bun: action.payload
          }
        : {
            ingridients: [...state.ingridients, { ...action.payload, addedAt: Date.now() }]
          })
    }),
    clearConstructor: () => ({ ...initialState }),
    removeIngridient: (state, action) => ({
      ...state,
      ingridients: [...state.ingridients.filter((_, index) => index !== action.payload)]
    }),
    changeIndexes: (state, action) => {
      const temp = state.ingridients.slice()
      temp[action.payload.dragIndex] = temp.splice(action.payload.hoverIndex, 1, temp[action.payload.dragIndex])[0]
      return {
        ...state,
        ingridients: [...temp]
      }
    }
  }
})

export const { addIngridient, removeIngridient, changeIndexes, clearConstructor } = constructorSlice.actions

export default constructorSlice.reducer
