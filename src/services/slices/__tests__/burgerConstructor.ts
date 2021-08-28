import reducer, {
  addIngridient,
  removeIngridient,
  changeIndexes,
  clearConstructor
} from '../burgerConstructor'

const initialState = {
  ingridients: [],
  bun: null
}

const state = {
  bun: null,
  ingridients: [
    {
      _id: '60d3b41abdacab0026a733d0',
      name: 'Хрустящие минеральные кольца',
      type: 'main',
      proteins: 808,
      fat: 689,
      carbohydrates: 609,
      calories: 986,
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
      image_mobile:
        'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
      image_large:
        'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
      __v: 0
    },
    {
      _id: '60d3b41abdacab0026a733ce',
      name: 'Соус традиционный галактический',
      type: 'sauce',
      proteins: 42,
      fat: 24,
      carbohydrates: 42,
      calories: 99,
      price: 15,
      image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
      __v: 0
    }
  ]
}

const testIngregient = {
  _id: '60d3b41abdacab0026a733cc',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
  addedAt: Date.now()
}

const testBun = {
  _id: '60d3b41abdacab0026a733c6',
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

describe('burgerConstructorSlice', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('add ingredient', () => {
    const reduce = reducer(initialState, addIngridient(testIngregient))
    const result = {
      bun: initialState.bun,
      ingridients: [{ ...testIngregient, addedAt: Date.now() }]
    }
    expect(reduce).toEqual(result)
  })

  it('add bun', () => {
    const reduce = reducer(initialState, addIngridient(testBun))

    const result = {
      bun: testBun,
      ingridients: []
    }

    expect(reduce).toEqual(result)
  })

  it('removeIngridient', () => {
    const reduce = reducer(state, removeIngridient(1))

    const result = { ...state, ingridients: [{ ...state.ingridients[0] }] }

    expect(reduce).toEqual(result)
  })

  it('clearConstructor', () => {
    const reduce = reducer(state, clearConstructor())

    expect(reduce).toEqual(initialState)
  })

  it('changeIndexes', () => {
    const reduce = reducer(state, changeIndexes({ dragIndex: 0, hoverIndex: 1 }))

    const result = { ...state, ingridients: [state.ingridients[1], state.ingridients[0]] }

    expect(reduce).toEqual(result)
  })
})
