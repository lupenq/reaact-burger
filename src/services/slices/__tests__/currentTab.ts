import reducer, { setCurrentTab } from '../currentTab'

const initialState = 'buns'

describe('ingridientModal', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('setCurrentTab', () => {
    const reduce = reducer(initialState, setCurrentTab('main'))

    expect(reduce).toEqual('main')
  })
})
