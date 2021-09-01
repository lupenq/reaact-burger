import reducer, { orderSuccess, orderError, orderRequest } from '../order'

const initialState = {
  orderRequest: false,
  requestError: false,
  requestSuccess: false,
  name: '',
  order: null
}

const RESULT = {
  name: 'Био-марсианский space флюоресцентный бургер',
  order: {
    createdAt: '2021-08-28T10:53:34.160Z',
    ingredients: [
      {
        calories: 14,
        carbohydrates: 11,
        fat: 22,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        name: 'Соус фирменный Space Sauce',
        price: 80,
        proteins: 50,
        type: 'sauce',
        __v: 0,
        _id: '60d3b41abdacab0026a733cd'
      },
      {
        calories: 4242,
        carbohydrates: 242,
        fat: 142,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        name: 'Биокотлета из марсианской Магнолии',
        price: 424,
        proteins: 420,
        type: 'main',
        __v: 0,
        _id: '60d3b41abdacab0026a733cb'
      },
      {
        calories: 643,
        carbohydrates: 85,
        fat: 26,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        name: 'Флюоресцентная булка R2-D3',
        price: 988,
        proteins: 44,
        type: 'bun',
        __v: 0,
        _id: '60d3b41abdacab0026a733c7'
      }
    ],
    name: 'Био-марсианский space флюоресцентный бургер',
    number: 2334,
    owner: {
      createdAt: '2021-08-02T20:51:16.899Z',
      email: 'test5555555@test.test',
      name: 'name123',
      updatedAt: '2021-08-03T18:52:01.731Z'
    },
    price: 1492,
    status: 'done',
    updatedAt: '2021-08-28T10:53:34.281Z',
    _id: '612a15ae15024d001b9d0e52'
  },
  success: true
}

describe('order', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('orderSuccess', () => {
    const reduce = reducer(initialState, orderSuccess(RESULT))

    const result = {
      ...initialState,
      name: RESULT.name,
      order: RESULT.order,
      requestSuccess: RESULT.success,
      orderRequest: false,
      requestError: false
    }

    expect(reduce).toEqual(result)
  })

  it('orderRequest', () => {
    const reduce = reducer(initialState, orderRequest())

    const result = {
      ...initialState,
      orderRequest: true,
      requestError: false,
      requestSuccess: false,
      name: '',
      order: null
    }

    expect(reduce).toEqual(result)
  })

  it('orderError', () => {
    const reduce = reducer(initialState, orderError())

    const result = {
      ...initialState,
      orderRequest: false,
      requestError: true,
      requestSuccess: false
    }

    expect(reduce).toEqual(result)
  })
})
