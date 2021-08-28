import { IIngredient } from '../../../interfaces'
import reducer, {
  ingridientsRequest,
  ingridientsSuccess,
  ingridientsError
} from '../ingridients'

const initialState = {
  items: [] as IIngredient[],
  requestError: false,
  requestSuccess: false,
  ingridientsRequest: false
}

const INGRIDIENTS = [
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

describe('ingridients', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('ingridientsSuccess', () => {
    const reduce = reducer(initialState, ingridientsSuccess(INGRIDIENTS))

    const result = {
      items: INGRIDIENTS,
      ingridientsRequest: false,
      requestSuccess: true,
      requestError: false
    }

    expect(reduce).toEqual(result)
  })

  it('ingridientsRequest', () => {
    const reduce = reducer(initialState, ingridientsRequest())

    const result = {
      items: [],
      ingridientsRequest: true,
      requestSuccess: false,
      requestError: false
    }

    expect(reduce).toEqual(result)
  })

  it('ingridientsError', () => {
    const reduce = reducer(initialState, ingridientsError())

    const result = {
      items: [],
      ingridientsRequest: false,
      requestSuccess: false,
      requestError: true
    }

    expect(reduce).toEqual(result)
  })
})
