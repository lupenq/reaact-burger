import { IIngredient } from '../../../interfaces'
import reducer, { ingridientModalAdd, ingridientModalRemove } from '../ingridientModal'

const initialState = {}

const INGRIDIENT = {
  _id: 'string',
  calories: 1,
  carbohydrates: 1,
  fat: 1,
  image: 'string',
  image_large: 'string',
  image_mobile: 'string',
  name: 'string',
  price: 1,
  proteins: 1,
  type: 'string',
  uniqId: 'string',
  addedAt: 'string'
}

describe('ingridientModal', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('ingridientModalAdd', () => {
    const reduce = reducer(initialState as IIngredient, ingridientModalAdd(INGRIDIENT))

    expect(reduce).toEqual(INGRIDIENT)
  })

  it('ingridientModalRemove', () => {
    const reduce = reducer(initialState as IIngredient, ingridientModalRemove())

    expect(reduce).toEqual({})
  })
})
