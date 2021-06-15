import { createSlice } from '@reduxjs/toolkit'

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    ingridients: [{
      _id: '60c1226586769e0026ffd074',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    },
    {
      _id: '60c1226586769e0026ffd076',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    },
    {
      _id: '60c1226586769e0026ffd075',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0
    },
    {
      _id: '60c1226586769e0026ffd077',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      __v: 0
    }],
    bun: {
      _id: '60c1226586769e0026ffd074',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    }
  },
  reducers: {
    addIngridient: (state, action) => ({
      ...state,
      ...(action.payload.type === 'bun'
        ? {
            bun: action.payload
          }
        : {
            ingridients: [...state.ingridients, action.payload]
          })
    }),
    removeIngridient: (state, action) => ({
      ...state,
      ingridients: [...state.ingridients.filter((_, index) => index !== action.payload)]
    }),
    changeIndexes: (state, action) => {
      const temp = state.ingridients.slice()
      temp[action.payload.dragIndex] = temp.splice(action.payload.hoverIndex, 1, temp[action.payload.dragIndex])[0]
      console.log(action)
      return {
        ...state,
        ingridients: [...temp]
      }
    }
  }
})

export const { addIngridient, removeIngridient, changeIndexes } = constructorSlice.actions

export default constructorSlice.reducer
